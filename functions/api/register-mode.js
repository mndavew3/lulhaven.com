// GET /api/register-mode — tells register.html whether THIS visit is test mode
// or a real production visit. Pricing spec §1: "nothing above is public yet"
// — the live page must keep showing "pricing to be announced" / disabled
// checkout for everyone until Dave decides to publish. Test mode is the one
// sanctioned way to exercise the real flow before then: gated on the
// TEST_MODE_ACTIVE flag (a flip-off kills every test path at once, per
// functions/_lib/testmode.js) plus either a tester-channel serial or the
// TEST_MODE_KEY. Never returns real pricing to a request that fails both.
import { isTestRequest } from "../_lib/testmode.js";
import { RATE_CENTS_PER_MONTH, FOUNDER_COHORT_SIZE } from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Haven-Test-Key" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const serial = url.searchParams.get("serial") || "";
  const testKey = url.searchParams.get("test_key") || request.headers.get("X-Haven-Test-Key") || "";
  const { isTest, reason } = isTestRequest(env, serial, testKey);
  if (!isTest) return json({ test: false });
  return json({ test: true, reason, rates: RATE_CENTS_PER_MONTH, founder_cohort_size: FOUNDER_COHORT_SIZE });
}
