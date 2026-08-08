// Test-mode resolution — shared by /api/register, /api/checkout, /api/register-mode.
//
// Two independent ways a request can be test-mode, either is sufficient:
//   1. Tester-channel serial. provision.js already mints serials with a channel
//      character (H1-YYYYMMDD-C-HHH-BBBB-RR-NNNNNNN-K); channel 'T' = tester,
//      baked into the unit's birth certificate at mint time. A bench/QA unit
//      provisioned with channel=T is automatically test-mode everywhere it
//      touches registration — no separate flag to remember to set.
//   2. Explicit test key. For testing register.html without a real tester-
//      channel router (e.g. driving the page directly), a caller can supply
//      TEST_MODE_KEY as either the `test_key` query/body param or the
//      `X-Haven-Test-Key` header. Checked server-side only — never trust a
//      client-asserted "I am a test" boolean, or anyone could tag a real
//      purchase as test and dodge the Founder cohort cap / real billing.
//
// Master kill switch: TEST_MODE_ACTIVE must be "1" or NEITHER path works, even
// with a correct key or a tester serial — mirrors CONTEST_ACTIVE in
// contest-attest.js. This is what makes "gated on a flag, not available for
// any other purpose" literally true: flip the env var off and test mode is
// gone everywhere, without touching a single serial or key.
//
// is_test rows this produces must be excluded from every customer-facing
// count (Founder cohort, real revenue, ranking) — that filtering lives at the
// query site (pricing.js), not here; this module only decides the boolean.

export function serialChannel(serial) {
  if (typeof serial !== "string") return null;
  const parts = serial.split("-");
  // H1-YYYYMMDD-C-HHH-BBBB-RR-NNNNNNN-K -- channel is field index 2.
  if (parts.length < 8 || parts[0] !== "H1") return null;
  return parts[2] || null;
}

// Pure decision, no Request object needed — callers pull testKey from wherever
// it lives for their method (GET: URL query or header; POST: JSON body or
// header), so the same function works everywhere without re-reading a
// once-only-readable request stream.
export function isTestRequest(env, serial, testKey) {
  if (env.TEST_MODE_ACTIVE !== "1") return { isTest: false, reason: null };
  if (serialChannel(serial) === "T") return { isTest: true, reason: "tester-channel" };
  if (env.TEST_MODE_KEY && testKey && testKey === env.TEST_MODE_KEY) return { isTest: true, reason: "test-key" };
  return { isTest: false, reason: null };
}

// Header check is identical for GET and POST — factor it out so every caller
// honors X-Haven-Test-Key without re-deriving it.
export function headerTestKey(request) {
  return request.headers.get("X-Haven-Test-Key") || null;
}
