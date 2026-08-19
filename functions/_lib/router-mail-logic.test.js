// Node test for router-mail-logic.js — run: node functions/_lib/router-mail-logic.test.js
// Verifies the event allowlist, recipient/content validation + control-strip,
// and that hashRecipient matches a standard sha256 of the lowercased address.
import { validateMail, hashRecipient, EVENT_TYPES, LIMITS } from "./router-mail-logic.js";
import { execSync } from "node:child_process";

let pass = 0, fail = 0;
const ok = (n, cond) => { cond ? pass++ : (fail++, console.log(`FAIL ${n}`)); };
const eq = (n, g, w) => { g === w ? pass++ : (fail++, console.log(`FAIL ${n}: got ${JSON.stringify(g)} want ${JSON.stringify(w)}`)); };

const good = { to: "owner@example.com", subject: "Your Haven code", body: "Code: 123456", event_type: "recovery" };

// 1. a well-formed recovery mail passes and normalizes
const v = validateMail(good);
ok("valid-recovery", v.ok === true);
eq("valid-to", v.clean && v.clean.to, "owner@example.com");

// 2. every allowlisted event is accepted; anything else is refused
for (const et of Object.keys(EVENT_TYPES)) ok(`allow-${et}`, validateMail({ ...good, event_type: et }).ok);
eq("reject-unknown-event", validateMail({ ...good, event_type: "spam_blast" }).error, "bad_event_type");
eq("reject-missing-event", validateMail({ ...good, event_type: undefined }).error, "bad_event_type");

// 3. recipient validation
eq("reject-bad-recipient", validateMail({ ...good, to: "not-an-email" }).error, "bad_recipient");
eq("reject-empty-recipient", validateMail({ ...good, to: "" }).error, "bad_recipient");

// 4. subject/body presence
eq("reject-empty-subject", validateMail({ ...good, subject: "   " }).error, "bad_subject");
eq("reject-empty-body", validateMail({ ...good, body: "" }).error, "bad_body");

// 5. control chars are stripped (subject keeps no newlines; body keeps them)
const ctl = validateMail({ ...good, subject: "hi\x00\x07there", body: "line1\nline2\x00end" });
ok("subject-ctl-stripped", ctl.ok && ctl.clean.subject === "hithere");
ok("body-keeps-newline", ctl.ok && ctl.clean.body === "line1\nline2end");

// 6. body cap enforced
const big = validateMail({ ...good, body: "x".repeat(LIMITS.body + 500) });
ok("body-capped", big.ok && big.clean.body.length === LIMITS.body);

// 7. hashRecipient: 64-hex, case-insensitive, and == standard sha256(lowercased)
const h1 = await hashRecipient("Owner@Example.com");
const h2 = await hashRecipient("owner@example.com");
ok("hash-len", h1.length === 64 && /^[0-9a-f]+$/.test(h1));
eq("hash-case-insensitive", h1, h2);
const shaRef = execSync(`printf '%s' "owner@example.com" | sha256sum`).toString().trim().split(/\s+/)[0];
eq("hash-matches-sha256", h1, shaRef);

console.log(`\n${pass} pass, ${fail} fail`);
if (fail) process.exit(1);
