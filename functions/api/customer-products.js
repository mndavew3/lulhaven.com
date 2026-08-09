// GET /api/customer-products — the dashboard list: every router this signed-
// in customer has ever registered, with its current (derived) status. Feeds
// the TracFone-style "your products, each with a Renew button" screen.
import { readSession } from "../_lib/auth.js";
import { isTestRequest, headerTestKey } from "../_lib/testmode.js";
import { findCustomerByEmail, listRegisteredProducts, currentTransaction, isCurrentlyActive } from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Haven-Test-Key" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestGet({ request, env }) {
  const email = await readSession(env, "customer", request.headers.get("Cookie"));
  if (!email) return json({ error: "not signed in" }, 401);

  const customer = await findCustomerByEmail(env, email);
  if (!customer) return json({ error: "account not found" }, 404);

  // A dashboard visit carries no serial of its own — only the test_key path
  // of testmode.js applies here. Defaults to the real lane, same as every
  // other endpoint: a tester must explicitly opt in to see is_test rows.
  const url = new URL(request.url);
  const testKey = url.searchParams.get("test_key") || headerTestKey(request);
  const { isTest } = isTestRequest(env, null, testKey);

  const products = await listRegisteredProducts(env, customer.id, isTest);
  const withStatus = await Promise.all(products.map(async (p) => {
    const tx = await currentTransaction(env, p.id);
    return {
      id: p.id, serial: p.serial, flavor: p.flavor, is_founder: !!p.is_founder,
      registered_datetime: p.registered_datetime,
      status: tx ? (isCurrentlyActive(tx) ? "active" : "lapsed") : "unpaid",
      billing_cadence: tx?.billing_cadence || null,
      rate_cents_per_month: tx?.rate_cents_per_month ?? null,
      current_period_end: tx?.term_end || null,
    };
  }));

  return json({ ok: true, email, products: withStatus });
}
