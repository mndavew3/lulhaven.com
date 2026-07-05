// Emit insert.sql seeding DB_IDENT for the adq-ident integration test.
import { submitterToken, verifyKey } from "../lib/adqmac.js";
import { writeFileSync } from "node:fs";

const EPOCH = "2026Q3";
const SALT = "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1";

const t1 = await submitterToken("TESTSECRET_ROUTER_0001", EPOCH);
const k1 = await verifyKey("TESTSECRET_ROUTER_0001", EPOCH);
const t2 = await submitterToken("REVOKED_SECRET", EPOCH);
const k2 = await verifyKey("REVOKED_SECRET", EPOCH);

const sql = `
DELETE FROM adq_quarter_salt; DELETE FROM adq_verify_key; DELETE FROM adq_serial_trust; DELETE FROM adq_revoked_serial;
INSERT INTO adq_quarter_salt (salt_epoch, salt) VALUES ('${EPOCH}', '${SALT}');
INSERT INTO adq_verify_key (submitter_token, serial, salt_epoch, verify_key) VALUES ('${t1}', 'TESTSERIAL01', '${EPOCH}', '${k1}');
INSERT INTO adq_serial_trust (serial, trust_tier) VALUES ('TESTSERIAL01', 'established');
INSERT INTO adq_verify_key (submitter_token, serial, salt_epoch, verify_key) VALUES ('${t2}', 'REVOKEDSER02', '${EPOCH}', '${k2}');
INSERT INTO adq_revoked_serial (serial, reason) VALUES ('REVOKEDSER02', 'test');
`;
writeFileSync(new URL("./insert.sql", import.meta.url), sql);
console.log("wrote insert.sql (valid token", t1.slice(0, 12) + "…, revoked", t2.slice(0, 12) + "…)");
