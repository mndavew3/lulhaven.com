// Node unit tests for _lib/redeem-logic.js — run: node redeem-logic.test.js
import { evaluateRedemption, MAX_REDEEMS, REDEEM_WINDOW_DAYS } from "./redeem-logic.js";

const FIRMWARE = {
    navy: { version: "0.1.76", url: "https://x/navy.bin", sha256: "aa", size: 1 },
    olive: { version: "0.1.76", url: "https://x/olive.itb", sha256: "bb", size: 2 },
};
const NOW = Date.parse("2026-08-17 12:00:00Z");
const day = 86400000;
let pass = 0, fail = 0;
function t(name, got, want) {
    const ok = got === want;
    ok ? pass++ : fail++;
    if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`);
}

// bad checksum never reaches the DB path
t("bad_code", evaluateRedemption({ parse: { valid: false }, row: null, firmware: FIRMWARE, nowMs: NOW }).status, "bad_code");
// valid parse, no row
t("unknown", evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: null, firmware: FIRMWARE, nowMs: NOW }).status, "unknown_code");
// known code, flavor not in manifest (issued ahead of support)
t("pending", evaluateRedemption({ parse: { valid: true, flavor: "pi", body: "B" }, row: { redeem_count: 0 }, firmware: FIRMWARE, nowMs: NOW }).status, "not_yet_available");
// fresh redemption
const ok1 = evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: { redeem_count: 0, first_redeemed_at: null }, firmware: FIRMWARE, nowMs: NOW });
t("ok_first", ok1.status, "ok");
t("ok_url", ok1.url, "https://x/navy.bin");
// re-download inside window and under count
t("ok_again", evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: { redeem_count: 2, first_redeemed_at: "2026-08-10 00:00:00" }, firmware: FIRMWARE, nowMs: NOW }).status, "ok");
// over count
t("count_gate", evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: { redeem_count: MAX_REDEEMS, first_redeemed_at: "2026-08-10 00:00:00" }, firmware: FIRMWARE, nowMs: NOW }).status, "exhausted");
// over window
t("window_gate", evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: { redeem_count: 1, first_redeemed_at: "2026-06-01 00:00:00" }, firmware: FIRMWARE, nowMs: NOW }).status, "exhausted");
// window boundary: day 29 still ok
t("window_edge", evaluateRedemption({ parse: { valid: true, flavor: "navy", body: "B" }, row: { redeem_count: 1, first_redeemed_at: new Date(NOW - 29 * day).toISOString().replace("T", " ").slice(0, 19) }, firmware: FIRMWARE, nowMs: NOW }).status, "ok");

console.log(`${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
