// Node test for haven-identity.js — run: node functions/_lib/haven-identity.test.js
// Verifies the Ed25519 router-identity signature gate: verifySignature against a
// real fixture signed on hardware (bench Olive, OpenSSL 3.5.7, 2026-08-25), the
// buildMessage wire format, a fresh-keypair round trip via node:crypto, the full
// verifyRouterIdentity gate (headers -> shape -> skew -> pubkey lookup -> verify),
// and bindIdentity's first-claim-then-immutable store semantics.
import {
  SKEW_SECONDS, spkiFromRaw, sha256hex, buildMessage, verifySignature,
  extractIdentityHeaders, verifyRouterIdentity, bindIdentity,
} from "./haven-identity.js";
import crypto from "node:crypto";

let pass = 0, fail = 0;
const ok = (n, cond) => { cond ? pass++ : (fail++, console.log(`FAIL ${n}`)); };
const eq = (n, g, w) => { g === w ? pass++ : (fail++, console.log(`FAIL ${n}: got ${JSON.stringify(g)} want ${JSON.stringify(w)}`)); };

// A real signature produced by the router itself — the most valuable case here:
// it proves device-to-server compatibility, not just that our own code agrees
// with itself.
const FIX = {
  pubkeyB64: "RKWgA9sTfHd+HA3Necm3CRCuxaDP4ghsp8sCpl9fz9A=",
  serial: "H1-20260731-G-E84-1002-US-0000011-Z",
  ts: "1787699746",
  sigB64: "ki58VLj2YN0E5n/vBUi1+vmwYXgniUZ5wCnjUlg6Db3iZ+p6IGsERR23LtVAN+4SK/Ty0JWVBIYjQBQQHFkgBw==",
  bodyText: '{"event_type":"recovery","to":"a@b.com"}',
  bodySha256: "7b25ee82820910511f00d7391ead35c9c52d9771eebcf8292cedabb727bc5647",
};

// A second, freshly-generated keypair — used both as a "wrong key" negative
// control below and for the round-trip section further down.
const { publicKey: freshPub, privateKey: freshPriv } = crypto.generateKeyPairSync("ed25519");
const freshRawPub = freshPub.export({ type: "spki", format: "der" }).subarray(-32);
const freshPubB64 = Buffer.from(freshRawPub).toString("base64");

// 1. Fixture: verifySignature against a real router-produced signature ------
ok("fixture-verifies", await verifySignature(FIX.pubkeyB64, FIX.serial, FIX.ts, FIX.bodyText, FIX.sigB64));
ok("fixture-tampered-body-fails", !(await verifySignature(FIX.pubkeyB64, FIX.serial, FIX.ts, FIX.bodyText + "x", FIX.sigB64)));
ok("fixture-wrong-serial-fails", !(await verifySignature(FIX.pubkeyB64, FIX.serial + "X", FIX.ts, FIX.bodyText, FIX.sigB64)));
ok("fixture-ts-plus-1-fails", !(await verifySignature(FIX.pubkeyB64, FIX.serial, String(Number(FIX.ts) + 1), FIX.bodyText, FIX.sigB64)));
ok("fixture-truncated-sig-fails", !(await verifySignature(FIX.pubkeyB64, FIX.serial, FIX.ts, FIX.bodyText, FIX.sigB64.slice(0, -4))));
ok("fixture-garbage-sig-fails", !(await verifySignature(FIX.pubkeyB64, FIX.serial, FIX.ts, FIX.bodyText, "not-valid-base64-!!!")));
ok("fixture-wrong-pubkey-fails", !(await verifySignature(freshPubB64, FIX.serial, FIX.ts, FIX.bodyText, FIX.sigB64)));

// 2. sha256hex + buildMessage wire format -----------------------------------
eq("sha256hex-matches-fixture", await sha256hex(FIX.bodyText), FIX.bodySha256);
eq("buildMessage-empty-body-line3-empty", (await buildMessage("S1", "100", "")).split("\n")[2], "");
eq("buildMessage-null-body-line3-empty", (await buildMessage("S1", "100", null)).split("\n")[2], "");
eq("buildMessage-with-body-full-string", await buildMessage(FIX.serial, FIX.ts, FIX.bodyText), `${FIX.serial}\n${FIX.ts}\n${FIX.bodySha256}\n`);

// 3. Fresh keypair round trip via node:crypto --------------------------------
// spkiFromRaw must reproduce byte-for-byte the same DER node itself exports —
// this is the cross-check that the hand-built 12-byte SPKI header is correct.
const derFromLib = Buffer.from(spkiFromRaw(new Uint8Array(freshRawPub)));
const derFromNode = freshPub.export({ type: "spki", format: "der" });
ok("spkiFromRaw-matches-node-der", derFromLib.equals(derFromNode));

const serial2 = "TEST-SERIAL-0001", ts2 = "1700000000", body2 = '{"a":1}';
const msg2 = Buffer.from(await buildMessage(serial2, ts2, body2));
const sig2B64 = Buffer.from(crypto.sign(null, msg2, freshPriv)).toString("base64");
ok("fresh-keypair-round-trip-verifies", await verifySignature(freshPubB64, serial2, ts2, body2, sig2B64));

// bodyless (GET-style): sign the empty-body message, verify with "" and null
const msgEmpty = Buffer.from(await buildMessage(serial2, ts2, ""));
const sigEmptyB64 = Buffer.from(crypto.sign(null, msgEmpty, freshPriv)).toString("base64");
ok("bodyless-verifies-empty-string", await verifySignature(freshPubB64, serial2, ts2, "", sigEmptyB64));
ok("bodyless-verifies-null", await verifySignature(freshPubB64, serial2, ts2, null, sigEmptyB64));

// 4. extractIdentityHeaders ---------------------------------------------------
function makeReq(headers) { return new Request("https://x/", { headers }); }

{
  const h = extractIdentityHeaders(makeReq({ "X-Haven-Serial": "S1", "X-Haven-Timestamp": "100", "X-Haven-Signature": "sig==" }));
  ok("extract-full-shape", !!h && h.serial === "S1" && h.ts === "100" && h.sig === "sig==");
}
eq("extract-null-when-missing", extractIdentityHeaders(makeReq({ "X-Haven-Serial": "S1", "X-Haven-Timestamp": "100" })), null);

// 5. verifyRouterIdentity: the full gate --------------------------------------
// Stub env: a plain object map stands in for the unit_identities table.
// store.__throw = true makes both first() and run() throw, for server_error.
function makeEnv(store) {
  return {
    haven_builds: {
      prepare: (_q) => ({
        bind: (...args) => ({
          first: async () => {
            if (store.__throw) throw new Error("db down");
            const row = store[args[0]];
            return row ? { pubkey: row.pubkey } : null;
          },
          run: async () => {
            if (store.__throw) throw new Error("db down");
            const [serial, pubkey] = args;
            if (!store[serial]) store[serial] = { pubkey };
            return {};
          },
        }),
      }),
    },
  };
}

const NOW = Number(FIX.ts);
const fixHeaders = () => ({ "X-Haven-Serial": FIX.serial, "X-Haven-Timestamp": FIX.ts, "X-Haven-Signature": FIX.sigB64 });
const knownEnv = () => makeEnv({ [FIX.serial]: { pubkey: FIX.pubkeyB64 } });

{
  const r = await verifyRouterIdentity(knownEnv(), makeReq(fixHeaders()), FIX.bodyText, NOW);
  ok("vri-happy-ok", r.ok === true);
  eq("vri-happy-serial", r.serial, FIX.serial);
}

for (const missing of ["X-Haven-Serial", "X-Haven-Timestamp", "X-Haven-Signature"]) {
  const h = fixHeaders(); delete h[missing];
  const r = await verifyRouterIdentity(knownEnv(), makeReq(h), FIX.bodyText, NOW);
  eq(`vri-missing-${missing}`, r.reason, "no_identity_headers");
}

{
  const h = { ...fixHeaders(), "X-Haven-Serial": "BAD_SERIAL_FORMAT" }; // underscores not allowed
  const r = await verifyRouterIdentity(knownEnv(), makeReq(h), FIX.bodyText, NOW);
  eq("vri-bad-serial", r.reason, "bad_serial");
}

{
  const h = { ...fixHeaders(), "X-Haven-Timestamp": "not-a-number" };
  const r = await verifyRouterIdentity(knownEnv(), makeReq(h), FIX.bodyText, NOW);
  eq("vri-bad-timestamp", r.reason, "bad_timestamp");
}

{
  const h = { ...fixHeaders(), "X-Haven-Serial": "UNKNOWN-SERIAL-0000000-Z" };
  const r = await verifyRouterIdentity(knownEnv(), makeReq(h), FIX.bodyText, NOW);
  eq("vri-unknown-unit", r.reason, "unknown_unit");
}

{
  const r = await verifyRouterIdentity(makeEnv({ __throw: true }), makeReq(fixHeaders()), FIX.bodyText, NOW);
  eq("vri-server-error", r.reason, "server_error");
}

{
  // valid everything but the store holds a different (still well-formed) key
  const wrongKeyEnv = makeEnv({ [FIX.serial]: { pubkey: freshPubB64 } });
  const r = await verifyRouterIdentity(wrongKeyEnv, makeReq(fixHeaders()), FIX.bodyText, NOW);
  eq("vri-bad-signature", r.reason, "bad_signature");
}

// Skew boundary — header ts (and hence the signature) stays fixed at FIX.ts;
// only the injected "now" moves, isolating the skew check from signing.
{
  const r = await verifyRouterIdentity(knownEnv(), makeReq(fixHeaders()), FIX.bodyText, NOW + SKEW_SECONDS);
  ok("vri-skew-exactly-900-future-ok", r.ok === true);
}
{
  const r = await verifyRouterIdentity(knownEnv(), makeReq(fixHeaders()), FIX.bodyText, NOW - SKEW_SECONDS);
  ok("vri-skew-exactly-900-past-ok", r.ok === true);
}
{
  const r = await verifyRouterIdentity(knownEnv(), makeReq(fixHeaders()), FIX.bodyText, NOW + SKEW_SECONDS + 1);
  eq("vri-skew-901-future-stale", r.reason, "stale_timestamp");
}
{
  const r = await verifyRouterIdentity(knownEnv(), makeReq(fixHeaders()), FIX.bodyText, NOW - SKEW_SECONDS - 1);
  eq("vri-skew-901-past-stale", r.reason, "stale_timestamp");
}

// 6. bindIdentity: first-claim-then-immutable ---------------------------------
{
  const env = makeEnv({});
  const r1 = await bindIdentity(env, "BIND-SERIAL-0000001-Z", freshPubB64, "register");
  ok("bind-new-ok", r1.ok === true);
  eq("bind-new-bound", r1.bound, "new");

  const r2 = await bindIdentity(env, "BIND-SERIAL-0000001-Z", freshPubB64, "register");
  ok("bind-already-ok", r2.ok === true);
  eq("bind-already-bound", r2.bound, "already");

  const { publicKey: otherPub } = crypto.generateKeyPairSync("ed25519");
  const otherPubB64 = Buffer.from(otherPub.export({ type: "spki", format: "der" }).subarray(-32)).toString("base64");
  const r3 = await bindIdentity(env, "BIND-SERIAL-0000001-Z", otherPubB64, "register");
  ok("bind-mismatch-not-ok", r3.ok === false);
  eq("bind-mismatch-reason", r3.reason, "identity_mismatch");
}

{
  const env = makeEnv({});
  const shortKeyB64 = Buffer.alloc(10, 1).toString("base64"); // valid base64, wrong length
  const r = await bindIdentity(env, "BIND-SERIAL-0000002-Z", shortKeyB64, "register");
  ok("bind-bad-identity-wrong-length-not-ok", r.ok === false);
  eq("bind-bad-identity-wrong-length-reason", r.reason, "bad_identity");
}

{
  const env = makeEnv({});
  const r = await bindIdentity(env, "BIND-SERIAL-0000003-Z", "!!!not-base64-at-all!!!", "register");
  ok("bind-bad-identity-not-base64-not-ok", r.ok === false);
  eq("bind-bad-identity-not-base64-reason", r.reason, "bad_identity");
}

{
  const env = makeEnv({ __throw: true });
  const r = await bindIdentity(env, "BIND-SERIAL-0000004-Z", freshPubB64, "register");
  ok("bind-server-error-not-ok", r.ok === false);
  eq("bind-server-error-reason", r.reason, "server_error");
}

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
