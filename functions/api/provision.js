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

    // Idempotency: already minted for this nonce? return it.
    const existing = await db.prepare("SELECT serial FROM provisioned_units WHERE unit_nonce = ?").bind(nonce).first();
    if (existing && existing.serial) return json({ ok: true, serial: existing.serial, reused: true });

    // Reserve a row (sequence = its rowid). UNIQUE(unit_nonce) makes a racing dup fail.
    let seq;
    try {
        const res = await db.prepare(
            "INSERT INTO provisioned_units (unit_nonce, channel, hardware, build, region, minted_datetime) " +
            "VALUES (?, ?, ?, ?, ?, datetime('now'))"
        ).bind(nonce, channel, hardware, build, region).run();
        seq = res.meta.last_row_id;
    } catch (e) {
        // Lost a race on UNIQUE(unit_nonce) — the other request won; return its serial.
        const row = await db.prepare("SELECT serial FROM provisioned_units WHERE unit_nonce = ?").bind(nonce).first();
        if (row && row.serial) return json({ ok: true, serial: row.serial, reused: true });
        return json({ ok: false, error: "mint failed" }, 500);
    }

    const serial = buildSerial(seq, channel, hardware, build, region);
    await db.prepare("UPDATE provisioned_units SET serial = ? WHERE id = ?").bind(serial, seq).run();

    return json({ ok: true, serial });
}
