// Node unit tests for _lib/redeem-logic.js — run: node redeem-logic.test.js
// Contract per design A (Dave 2026-09-07): the code is a data carrier — the
// only decisions are checksum-valid? and image-published? Nothing is issued,
// counted, or expired.
import { evaluateRedemption } from "./redeem-logic.js";

const FIRMWARE = {
    navy: { version: "0.1.76", url: "https://x/navy.bin", sha256: "aa", size: 1 },
    olive: { version: "0.1.76", url: "https://x/olive.itb", sha256: "bb", size: 2 },
};
let pass = 0, fail = 0;
function t(name, got, want) {
    const ok = got === want;
    ok ? pass++ : fail++;
    if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`);
}

// bad checksum fails loudly and consults nothing else
t("bad_code", evaluateRedemption({ parse: { valid: false }, firmware: FIRMWARE }).status, "bad_code");
t("bad_code_http", evaluateRedemption({ parse: { valid: false }, firmware: FIRMWARE }).http, 400);
// valid code, flavor not in manifest (detected ahead of support — the
// resolve-at-redemption promise: same code starts working when the image ships)
t("pending", evaluateRedemption({ parse: { valid: true, flavor: "pi" }, firmware: FIRMWARE }).status, "not_yet_available");
// manifest unreachable reads as not-yet-available (honest, retryable)
t("no_manifest", evaluateRedemption({ parse: { valid: true, flavor: "navy" }, firmware: null }).status, "not_yet_available");
// valid code with a published image resolves to the CURRENT manifest entry
const ok1 = evaluateRedemption({ parse: { valid: true, flavor: "navy" }, firmware: FIRMWARE });
t("ok", ok1.status, "ok");
t("ok_url", ok1.url, "https://x/navy.bin");
t("ok_sha", ok1.sha256, "aa");
t("ok_version", ok1.version, "0.1.76");
// a second, tenth, or hundredth redemption is identical — nothing is counted
const ok2 = evaluateRedemption({ parse: { valid: true, flavor: "navy" }, firmware: FIRMWARE });
t("ok_repeat", ok2.status, "ok");
t("ok_repeat_url", ok2.url, ok1.url);

console.log(`${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
