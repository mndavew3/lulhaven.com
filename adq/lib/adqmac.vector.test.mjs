// Cross-impl parity test: the JS adq primitive MUST equal the router's
// haven-pairing-crypto.sh byte-for-byte, or every honest upload 401s.
// Run: node adqmac.vector.test.mjs   (also shells to the router helper on host)
import { execFileSync } from "node:child_process";
import { adqMac, sessKey, bodyHash, submitterToken, verifyKey, canonical, macEqual } from "./adqmac.js";

const HELP = process.env.HAVEN_CRYPTO ||
  "/home/dave/haven/router/package/luci-app-haven/root/usr/share/haven/haven-pairing-crypto.sh";

// checked-in fixed vectors (regression anchor even without the sh helper present)
const FIXED = {
  seed: "adqsecret_test_0001",
  msg: "POST\n/api/adq/votes\n1782880000\ne3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  tok: "f44daa73bd97a376",
  app: "phoneA",
  epoch: "2026Q3",
};

function sh(sub, env) {
  return execFileSync("sh", [HELP, sub], { env: { ...process.env, ...env } }).toString().trim();
}
function shHash(str) { // direct printf|sha256sum, as the router derives sub/key tokens
  return execFileSync("sh", ["-c", `printf '%s' "$S" | sha256sum | cut -c1-64`],
    { env: { ...process.env, S: str } }).toString().trim();
}

let fail = 0;
const check = async (name, got, want) => {
  const g = await got;
  const w = await want;
  if (g !== w) { fail++; console.log(`FAIL ${name}\n  js=${g}\n  sh=${w}`); }
  else console.log(`ok   ${name}  ${g.slice(0, 16)}…`);
};

let haveHelper = true;
try { sh("token", {}); } catch { haveHelper = false; console.log("(router helper not present — sh parity skipped, fixed vectors still checked)"); }

// 1. the request-signing MAC — the load-bearing one
if (haveHelper) {
  await check("adqMac == sh mac", adqMac(FIXED.seed, FIXED.msg), sh("mac", { HV_KEY: FIXED.seed, HV_MSG: FIXED.msg }));
  await check("sessKey == sh sesskey", sessKey(FIXED.tok, FIXED.app), sh("sesskey", { HV_ROOT: FIXED.tok, HV_APP: FIXED.app }));
  await check("bodyHash == sh hashmsg", bodyHash("the body"), sh("hashmsg", { HV_MSG: "the body" }));
  await check("submitterToken == sh sha256", submitterToken(FIXED.seed, FIXED.epoch), shHash(`${FIXED.seed}:adq-sub:${FIXED.epoch}`));
  await check("verifyKey == sh sha256", verifyKey(FIXED.seed, FIXED.epoch), shHash(`${FIXED.seed}:adq-key:${FIXED.epoch}`));
}

// 2. fixed regression vectors (independent of the helper) — anchors the wire format
await check("fixed adqMac(k,m)", adqMac("k", "m"),
  Promise.resolve("d476ffc1b7da154731b5bd45e493867167592ee5cbb5358c7db91fb108cf7b82"));

// 3. canonical shape + macEqual
const c = canonical("POST", "/api/adq/votes", "1782880000", "e3b0c442");
if (c !== "POST\n/api/adq/votes\n1782880000\ne3b0c442") { fail++; console.log("FAIL canonical shape:", JSON.stringify(c)); } else console.log("ok   canonical shape");
if (!macEqual("abcd", "abcd") || macEqual("abcd", "abce") || macEqual("abc", "abcd")) { fail++; console.log("FAIL macEqual"); } else console.log("ok   macEqual");

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
