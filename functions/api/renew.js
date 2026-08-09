// POST /api/renew — the customer-facing renewal action (TracFone-style: log
// in, see your registered products, press Renew). Requires a valid customer
// session. The product's test/real lane was fixed at registration
// (registered_products.is_test) and is simply inherited here — a session-
// based renewal has no serial/test_key of its own to check.
//
// Body: { registered_product_id, billing_cadence, sync_choice? }
import { readSession } from "../_lib/auth.js";
import { findCustomerByEmail, purchase, PricingError } from "../_lib/pricing.js";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
const CADENCES = new Set(["annual", "monthly"]);

export async function onRequestOptions() { return new Response(null, { status: 204, headers: CORS }); }

export async function onRequestPost({ request, env }) {
  const email = await readSession(env, "customer", request.headers.get("Cookie"));
  if (!email) return json({ error: "not signed in" }, 401);

  let b; try { b = await request.json(); } catch { return json({ error: "invalid request" }, 400); }
  const registeredProductId = Number(b.registered_product_id);
  const billingCadence = (b.billing_cadence || "").trim();
  const syncChoice = b.sync_choice || null;
  if (!Number.isInteger(registeredProductId)) return json({ error: "registered_product_id is required" }, 400);
  if (!CADENCES.has(billingCadence)) return json({ error: "billing_cadence must be annual or monthly" }, 400);

  const customer = await findCustomerByEmail(env, email);
  if (!customer) return json({ error: "account not found" }, 404);

  const product = await env.haven_builds.prepare(
    "SELECT id, serial, flavor, customer_id, is_founder, is_test FROM registered_products WHERE id=?"
  ).bind(registeredProductId).first();
  if (!product || product.customer_id !== customer.id) return json({ error: "product not found" }, 404);

  try {
    const result = await purchase(env, {
      serial: product.serial, email, flavor: product.flavor, wantsFounder: false,
      billingCadence, syncChoice, isTest: !!product.is_test, kind: "renewal",
    });
    return json({
      ok: true, tier: result.tier, is_founder: result.is_founder,
      rate_cents_per_month: result.rate_cents_per_month, current_period_end: result.term_end,
    });
  } catch (e) {
    if (e instanceof PricingError) return json({ error: e.message }, 409);
    return json({ error: "server error" }, 500);
  }
}
