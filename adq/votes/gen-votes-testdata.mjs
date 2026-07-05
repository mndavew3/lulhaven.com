// Emit DB_IDENT insert.sql for N simulated routers (pre-written verify_key rows,
// the burn-pipeline's job) + the quarter salt.
import { submitterToken, verifyKey } from "../lib/adqmac.js";
import { writeFileSync } from "node:fs";

export const EPOCH = "2026Q3";
export const SALT = "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1";
export const N = 30;

let rows = [`DELETE FROM adq_quarter_salt; DELETE FROM adq_verify_key; DELETE FROM adq_serial_trust; DELETE FROM adq_revoked_serial;`,
  `INSERT INTO adq_quarter_salt (salt_epoch, salt) VALUES ('${EPOCH}', '${SALT}');`];
for (let i = 0; i < N; i++) {
  const seed = `RTR_${i}`;
  const tok = await submitterToken(seed, EPOCH);
  const key = await verifyKey(seed, EPOCH);
  rows.push(`INSERT INTO adq_verify_key (submitter_token, serial, salt_epoch, verify_key) VALUES ('${tok}', 'SER_${i}', '${EPOCH}', '${key}');`);
}
writeFileSync(new URL("./ident-insert.sql", import.meta.url), rows.join("\n") + "\n");
console.log(`wrote ident-insert.sql for ${N} routers`);
