# Haven VPN Network — Design Notes

## Concept summary

Every Haven router is a potential VPN exit node. Subscribers who opt in to share their bandwidth get an 80% subscription discount ($2/month instead of $10/month). The VPN network is built into the firmware from day one but stays dormant until the subscriber base is large enough to run it without degrading quality for any individual router.

**The VPN product itself** (selling VPN access to end users) is a separate future offering at ~$5/month. It is not launched until the network is large enough to support it with good quality — estimated 3 years out / ~10,000 routers.

The 80% discount is the hook: subscribers sign up for $2/month knowing they'll eventually get a VPN network in return. Most will never notice when it quietly turns on. Those who don't opt in pay $10/month — but the $10 price was never intended to be paid; it exists only as a motivator to push people toward opting in.

---

## Business model

| Tier | Monthly | Notes |
|---|---|---|
| Haven subscription (opt-in) | $2/month | Shares bandwidth as VPN node |
| Haven subscription (opt-out) | $10/month | Motivator only — not expected to be common |
| VPN service (future product) | ~$5/month | Sold separately, launched at ~10K routers |

**Gillette model:** give away the razor (or sell it near cost), sell the blades cheap enough that nobody resists. Hardware sold at or near cost; recurring subscription is the revenue. Subscriptions at $2 are money for essentially nothing during the dormant phase — and once the VPN fires up, existing subscribers won't even feel it.

**B2B residential IP angle:** residential IP addresses command a premium in the data broker / market research world ($10–$40/month equivalent on platforms like Bright Data). The Haven network is a residential IP pool by nature. This is a potential secondary revenue stream (selling bandwidth wholesale to B2B customers), independent of the consumer VPN product.

---

## Network architecture

### Routing goal
Match VPN traffic to geographically close exit nodes. If traffic is destined for a server in Atlanta, find a Haven router in or near Atlanta as the exit node. Geographic proximity reduces latency and keeps traffic "local."

### Node registry (coordination server)
Each opted-in router registers with the coordination server at startup and periodically updates:
- Geographic region (derived from IP geolocation at registration)
- Available bandwidth (upstream, measured or reported)
- Current load

The coordination server maintains this as a live registry and uses it for endpoint selection.

### Bandwidth cap
Never use more than **25% of a node's available upstream bandwidth** for VPN traffic. This keeps the router owner's experience unaffected. The coordination server enforces this cap when assigning traffic.

### Rotation / session hopping
- Even during a single extended session with one destination, rotate through multiple exit nodes
- Target: never stay on the same exit node for more than ~1 hour
- Goal: keep any single router's VPN load low and spread traffic across the pool

### QoS scoring
Track per-node quality signals:
- Packet loss rate
- Latency variance
- Available bandwidth trends

The coordination server uses these scores to prefer healthy nodes and deprioritize degraded ones without removing them entirely.

---

## Traffic volume estimates (100K subscribers, peak Saturday)

Assumptions:
- ~20% of subscribers active at peak = 20,000 concurrent users
- Mix: ~60% video streaming (~5 Mbps each), ~40% general browsing (~1 Mbps each)
- Estimated peak aggregate: ~70–80 Gbps across the network

Per-node math (assuming ~60–70K opted-in routers at 100K subscribers):
- At 25% cap on a typical home upload of ~50 Mbps → ~12.5 Mbps available per node
- 70 Gbps / 12.5 Mbps = ~5,600 nodes needed at peak
- With 60–70K opted-in nodes, that's less than 10% of nodes active at any moment — plenty of headroom

**Conclusion:** The math works comfortably at 100K subscribers. The constraint is geographic distribution, not aggregate bandwidth.

---

## Common QoS failure modes to plan for

**Customer-side (Haven router owner):**
- Degraded home wiring (coax → router creating a bottleneck)
- ISP throttling upstream traffic
- Router placed in poor WiFi position (affecting local network, not VPN directly)
- Shared upload with household members streaming simultaneously

**Exit-node-side:**
- Same issues as above — the node is someone's home router
- ISP CG-NAT making the node unreachable as an exit (requires traversal solution)
- Dynamic IP changes breaking registered endpoint

**Mitigation:** QoS scoring catches these automatically over time. Nodes that consistently underperform get deprioritized without manual intervention.

---

## Liability question (unresolved, pre-launch decision required)

Before activating the VPN network, need to determine exit node liability posture: if a subscriber's router is used as a VPN exit node and someone routes illegal traffic through it, what is the router owner's exposure? Options:

1. Legal language in ToS shifting liability to Haven (we're the operator)
2. Traffic filtering at the exit node (block known-bad categories even in VPN mode)
3. Only use Haven routers as middle nodes, not exit nodes (traffic exits through a small number of Haven-owned datacenter nodes)
4. Some combination of the above

**Not decided yet.** This is the first design question to resolve before architecture implementation begins.

---

## Implementation timeline

- **Now – Year 3:** Build subscriber base. VPN baked into firmware but dormant. Subscribers pay $2/month and get their discount. Nothing else happens.
- **~Year 3 / ~10,000 routers:** Evaluate network size. If geographic distribution is adequate, fire up coordination server and begin routing traffic.
- **Concurrent with launch:** Release VPN consumer product at ~$5/month.

---

## What is NOT the VPN

"VPN & Privacy Tools" in the Haven category list refers to **filtering** services like NordVPN, ExpressVPN, Mullvad, etc. — meaning Haven can block users from accessing commercial VPN services (useful in school/workplace deployments where bypassing filters is a concern). This is unrelated to Haven's own VPN network.

---

*Last updated: 2026-04-30*
