// /api/provision — first-boot serial minting for self-flashed (Gold) Haven units.
// A router with no serial POSTs {unit_nonce, hardware, build, channel?}; we mint a
// fresh, information-dense serial, record it, and return it. Idempotent on
// unit_nonce: a retry (flaky WAN, double-fired hotplug) gets the SAME serial back.
// Mirrors the /api/notify, /api/challenge pattern (same D1 binding: haven_builds).
//
// Serial scheme v1 (immutable birth certificate — mutable state lives in the row):
//   H1-YYYYMMDD-C-HHH-BBBB-RR-NNNNNNN-K
//   H1=scheme ver · date · channel · hardware · birth-build · region · sequence · checksum

const CORS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};
const json = (b, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });

const CHANNELS = new Set(["R", "G", "T", "I", "D"]);   // retail/gold/tester/influencer/dev
const B36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// One check character over the separator-free body — catches a transcribed-wrong serial.
function checkChar(body) {
    let s = 0;
    for (let i = 0; i < body.length; i++) s = (s * 31 + body.charCodeAt(i)) % 36;
    return B36[s];
}

function buildSerial(seq, channel, hardware, build, region) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");   // YYYYMMDD (UTC)
    const seqs = String(seq).padStart(7, "0");
    const body = `H1${date}${channel}${hardware}${build}${region}${seqs}`;
    const k = checkChar(body);
    return `H1-${date}-${channel}-${hardware}-${build}-${region}-${seqs}-${k}`;
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid body" }, 400); }

    // unit_nonce — stable per-unit id the router mints once; required, drives idempotency.
    const nonce = String(body.unit_nonce || "").trim();
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(nonce)) return json({ ok: false, error: "bad unit_nonce" }, 400);

    // Sanitize the encoded fields to fixed widths.
    const hardware = (String(body.hardware || "UNK").toUpperCase().replace(/[^A-Z0-9]/g, "") + "XXX").slice(0, 3);
    const build    = (String(body.build || "").replace(/[^0-9]/g, "") || "0").padStart(4, "0").slice(-4);
    let channel    = String(body.channel || "G").toUpperCase().slice(0, 1);
    if (!CHANNELS.has(channel)) channel = "G";
    const region   = ((request.cf && request.cf.country) || "XX").toUpperCase().replace(/[^A-Z]/g, "X").padEnd(2, "X").slice(0, 2);
    // Privacy root-fix (adq design #9): do NOT persist the router's WAN IP. The
    // region char is derived from it above, but source_ip itself is never stored —
    // it was the root of a token->serial->WAN-IP linkage.

    const db = env.haven_builds;

    // Device registry (contest_claims.sql: issued_serials, serial -> unit_nonce),
    // the fail-closed authenticity check contest-attest.js and claim-intake.js
    // both query against — was defined at contest launch but never populated
    // anywhere (confirmed by full-codebase sweep, 2026-08-08). provision.js is
    // the one place a serial and its unit_nonce are both known and trustworthy
    // at the moment of birth, so it's the natural (and now the only) place this
    // registry gets filled. INSERT OR IGNORE: idempotent across every retry/
    // resume/race path below, and never overwrites an existing enrollment.
    async function enroll(serial) {
        await db.prepare(
            "INSERT OR IGNORE INTO issued_serials (serial, unit_nonce, enrolled_datetime) VALUES (?, ?, datetime('now'))"
        ).bind(serial, nonce).run();
    }

    // Resume a half-minted row (whetstone #65): the reserve INSERT landed but the
    // serial UPDATE failed/crashed, leaving serial NULL. Before the fix that row
    // both failed the idempotency read AND blocked re-insert (UNIQUE unit_nonce)
    // — the unit could never get its serial without DB surgery. Resume finishes
    // the mint from the STORED reservation (the authoritative birth record).
    async function resumeMint(row) {
        const serial = buildSerial(row.id, row.channel, row.hardware, row.build, row.region);
        await db.prepare("UPDATE provisioned_units SET serial = ? WHERE id = ? AND serial IS NULL")
                .bind(serial, row.id).run();
        // Re-read rather than trust our UPDATE: a racing resume may have won.
        const done = await db.prepare("SELECT serial FROM provisioned_units WHERE id = ?").bind(row.id).first();
        if (done && done.serial) await enroll(done.serial);
        return done && done.serial;
    }

    // Idempotency: already minted for this nonce? return it. NULL serial = resume.
    const existing = await db.prepare(
        "SELECT id, serial, channel, hardware, build, region FROM provisioned_units WHERE unit_nonce = ?"
    ).bind(nonce).first();
    if (existing && existing.serial) { await enroll(existing.serial); return json({ ok: true, serial: existing.serial, reused: true }); }
    if (existing) {
        const s = await resumeMint(existing);
        if (s) return json({ ok: true, serial: s, reused: true, resumed: true });
        return json({ ok: false, error: "mint failed" }, 500);
    }

    // Reserve a row (sequence = its rowid). UNIQUE(unit_nonce) makes a racing dup fail.
    let seq;
    try {
        const res = await db.prepare(
            "INSERT INTO provisioned_units (unit_nonce, channel, hardware, build, region, minted_datetime) " +
            "VALUES (?, ?, ?, ?, ?, datetime('now'))"
        ).bind(nonce, channel, hardware, build, region).run();
        seq = res.meta.last_row_id;
    } catch (e) {
        // Lost a race on UNIQUE(unit_nonce) — the other request won; return its
        // serial, or finish its half-minted row (same resume as above).
        const row = await db.prepare(
            "SELECT id, serial, channel, hardware, build, region FROM provisioned_units WHERE unit_nonce = ?"
        ).bind(nonce).first();
        if (row && row.serial) { await enroll(row.serial); return json({ ok: true, serial: row.serial, reused: true }); }
        if (row) {
            const s = await resumeMint(row);
            if (s) return json({ ok: true, serial: s, reused: true, resumed: true });
        }
        return json({ ok: false, error: "mint failed" }, 500);
    }

    const serial = buildSerial(seq, channel, hardware, build, region);
    await db.prepare("UPDATE provisioned_units SET serial = ? WHERE id = ?").bind(serial, seq).run();
    await enroll(serial);

    return json({ ok: true, serial });
}
