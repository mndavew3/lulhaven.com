// Node test for offnet-claim-logic.js — run: node offnet-claim-logic.test.js
// Verifies the bearer derivation matches the shell poller's construction and
// that verifyRouterBearer is fail-closed + timing-safe-ish.
import { deriveBearer, verifyRouterBearer, timingSafeEqual } from "./offnet-claim-logic.js";
import { execSync } from "node:child_process";

let pass = 0, fail = 0;
const t = (n, g, w) => { g === w ? pass++ : (fail++, console.log(`FAIL ${n}: got ${g}, want ${w}`)); };

const SECRET = "test-enroll-secret-abc123";
const SERIAL = "NAV0009";

// 1. JS bearer derivation is deterministic
const bearer = await deriveBearer(SECRET, SERIAL);
t("bearer-len", bearer.length, 64);

// 2. it matches the exact openssl construction the shell poller uses
const shellBearer = execSync(
    `printf '%s' "${SERIAL}" | openssl dgst -sha256 -hmac "${SECRET}" | sed 's/^.*= //'`
).toString().trim();
t("js-matches-shell", bearer, shellBearer);

// 3. verifyRouterBearer: correct bearer passes, wrong fails, missing fails-closed
const fakeEnv = {
    haven_builds: {
        prepare: (_sql) => ({
            bind: (s) => ({
                first: async () => (s === SERIAL ? { bearer } : null),
            }),
        }),
    },
};
t("verify-correct", await verifyRouterBearer(fakeEnv, SERIAL, bearer), true);
t("verify-wrong", await verifyRouterBearer(fakeEnv, SERIAL, "deadbeef"), false);
t("verify-unknown-serial", await verifyRouterBearer(fakeEnv, "NAV9999", bearer), false);
t("verify-empty", await verifyRouterBearer(fakeEnv, SERIAL, ""), false);

// 4. timingSafeEqual basics
t("tse-equal", timingSafeEqual("abc", "abc"), true);
t("tse-diff", timingSafeEqual("abc", "abd"), false);
t("tse-len", timingSafeEqual("abc", "abcd"), false);

console.log(`${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
