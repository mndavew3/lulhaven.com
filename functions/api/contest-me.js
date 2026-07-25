// GET /api/contest-me — returns { username } if a valid session cookie is present,
// else { username: null }. Lets the claim page show the right panel on load.
import { readSession } from "../_lib/account.js";

export async function onRequestGet({ request, env }) {
  let username = null;
  try { username = await readSession(env, request.headers.get("Cookie")); } catch { username = null; }
  return new Response(JSON.stringify({ username }), {
    status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
