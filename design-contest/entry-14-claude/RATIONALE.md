# Entry #14 — Rationale

**Point of view: "warm paper, hard proof."** Haven is not a Silicon Valley SaaS — it is a
hand-built, trust-first product with a storybook mascot and a combative streak. All 13 prior
entries dressed it in the same cool-toned Inter-on-white startup uniform; this entry commits
the other way. The system is warm cream paper (`#faf7f1`) with deep green-ink dark bands, the
site's existing teal (`#1f6b5a`) as the single accent, gold reserved for proof moments (the
bypass demo), and red reserved exclusively for the Challenge. The display face is Fraunces, a
contemporary editorial serif that matches the painterly gnome art and the "hand-built by the
founder" story; Inter Tight (already the site's font) does UI and body. No other entry used a
serif — it is the single loudest differentiator, and it is doing brand work, not decoration.

**Trend vocabulary used, and where:** announcement pill above the H1 (the Challenge, its one
home — the nav is now logo + five plain links + ONE CTA); soft radial aura behind the hero
type (teal + gold, very quiet); typography-led multi-line headline as the hero itself; a
3-tile value grid replacing the dense "why not all three" paragraph; pill/chip selectors in
the bypass demo; one dark band for emphasis (the demo — proof belongs in the spotlight) plus
a closing ink block (quote + footer); an elevated white card floating on the teal field
(Founders); and color-blocked band rhythm down the page (cream / white / cream / ink / white
/ teal / cream / ink).

**The deliberate calls.** (1) The gnome portraits are KEPT at full size — the brief flagged
this as a real tradeoff, and the character art is the most ownable visual asset Haven has;
shrinking it into utility cards would sand off the one thing competitors can't copy. (2) A
new "One page. One click per category." panel turns the product's core principle — every
category ships OFF — into an interactive moment: six category pills start off, and flipping
one updates a live status line ("2 categories blocked — for every device on your network").
No other entry surfaced opt-in-by-default as an experience. (3) The bypass demo is
reproduced with feature parity to the live site (all four workarounds, verdict labels on
their own line — the two execution bugs the critique found are specifically avoided). (4) A
scroll-reveal system was built, then deliberately removed after testing: it left whole
sections at `opacity:0` in full-page rendering — the exact "CSS silently fails" failure mode
one of the 13 shipped. Motion is now a CSS-only hero entrance plus hover micro-interactions;
no content is ever gated behind JavaScript.

**Mechanics.** Self-contained single file, no framework, no build step. All images are the
site's real assets referenced relatively (`../../assets/…`), so the page renders where it
sits, offline and deployed; if promoted to the site root, those prefixes drop. The notify
form posts to the real `/api/notify` with the live site's source-attribution behavior; the
hero phrase rotation and countdown are functional; reduced-motion is respected; skip link,
`aria-pressed` toggles, and live regions included. Verified in-browser: all sections render,
all four demo chips exercised, toggles exercised, mobile (390px) checked, zero console
errors.
