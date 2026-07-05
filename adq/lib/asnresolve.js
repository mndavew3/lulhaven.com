// asnresolve.js — server-side IP -> ASN resolution. The CLIENT-reported ASN is
// never trusted; this is the authoritative classifier for risk_class/denylist/
// adnet/single-ASN-guard. Production loads the full IPtoASN dataset (open q #2)
// into Workers KV; this module does longest-prefix match over a table. The seed
// TABLE below is a small starter covering the test ranges — replace/augment from
// KV in prod (resolveAsnKV).

function ipToInt(ip) {
  const p = ip.split(".");
  if (p.length !== 4) return null;
  let n = 0;
  for (const o of p) {
    const x = Number(o);
    if (!Number.isInteger(x) || x < 0 || x > 255) return null;
    n = n * 256 + x;
  }
  return n >>> 0;
}

// dotted-quad, public only (mirrors the router pre-transmit drop / belt #2)
export function isPublicV4(ip) {
  const n = ipToInt(ip);
  if (n === null) return false;
  const a = (n >>> 24) & 255, b = (n >>> 16) & 255;
  if (a === 10) return false;                       // 10/8
  if (a === 127) return false;                      // loopback
  if (a === 0) return false;                        // this-network
  if (a === 169 && b === 254) return false;         // link-local
  if (a === 172 && b >= 16 && b <= 31) return false; // 172.16/12
  if (a === 192 && b === 168) return false;         // 192.168/16
  if (a === 100 && b >= 64 && b <= 127) return false; // 100.64/10 CGNAT
  if (a >= 224) return false;                        // multicast/reserved
  return true;
}

// [prefixInt, maskBits, asn] longest-prefix table. Starter seed.
const TABLE = [
  [ipToInt("203.0.113.0"), 24, 394699], // adnet (applovin) — TEST-NET-3
  [ipToInt("198.51.100.0"), 24, 12345], // generic cloud — TEST-NET-2
  [ipToInt("52.0.0.0"), 8, 16509],      // aws (denylisted)
  [ipToInt("13.32.0.0"), 12, 16509],    // aws
  [ipToInt("104.16.0.0"), 12, 13335],   // cloudflare (denylisted)
];

export function resolveAsn(ip) {
  const n = ipToInt(ip);
  if (n === null) return null;
  let bestBits = -1, asn = null;
  for (const [pfx, bits, a] of TABLE) {
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
    if ((n & mask) === (pfx & mask) && bits > bestBits) { bestBits = bits; asn = a; }
  }
  return asn; // null = unresolved -> risk_class 'unknown'
}
