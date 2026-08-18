// code-scheme.js — Haven download redemption codes (challenge #71).
//
// A code is issued when someone requests Haven for a router that isn't attached
// right now: they get a code, and later — router connected — they redeem it and
// the correct firmware is derived FROM THE CODE. So the code must (a) carry the
// flavor, (b) reject a typo before we ever hit the database, and (c) be readable
// aloud / retypeable without ambiguous glyphs.
//
// Format:  HVN-FFNN-NNNC
//   HVN     literal prefix (brand + a cheap early reject)
//   F F     2 chars of flavor tag (navy/olive/pi/vm -> NV/OL/PI/VM)
//   N...    5 chars of random payload from a 30-char unambiguous alphabet
//   C       1 Damm check char over the FFNNNNN body
//
// The Damm algorithm catches ALL single-char errors and ALL adjacent
// transpositions — the two mistakes humans actually make retyping a code — with
// one trailing char and no check-digit-position math. We run Damm over the
// standard, well-tested base-10 table, feeding it the decimal digits of each
// symbol's index; the resulting check digit (0..9) is stored as the alphabet's
// first ten symbols so the whole code stays in one alphabet. Alphabet excludes
// 0/O/1/I/L/U to kill the classic misreads.
//
// Pure and dependency-free — identical in Node (the Pages Function) and any
// other JS runtime. No secrets: a valid checksum only proves "well-formed", not
// "issued" — the redemption endpoint still confirms the code exists.

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";   // 30 chars, no 0O1ILU
const BASE = ALPHABET.length;                         // 30

// Tags MUST be drawn from ALPHABET (no O/L/I/U), so the checksum can process
// them. Mnemonic where the alphabet allows: NV=navy, VE=oliVE, PY=Pi, VM=vm.
const FLAVOR_TAG = { navy: "NV", olive: "VE", pi: "PY", vm: "VM" };
const TAG_FLAVOR = { NV: "navy", VE: "olive", PY: "pi", VM: "vm" };

// Standard Damm order-10 quasigroup (weakly totally anti-symmetric, zero
// diagonal) — the canonical table from the literature.
const DAMM10 = [
    [0,3,1,7,5,9,8,6,4,2],
    [7,0,9,2,1,5,4,8,6,3],
    [4,2,0,6,8,7,1,3,5,9],
    [1,7,5,0,9,8,3,4,2,6],
    [6,1,2,3,0,4,5,9,7,8],
    [3,6,7,4,2,0,9,5,8,1],
    [5,8,6,9,7,2,0,1,3,4],
    [8,9,4,5,3,6,2,0,1,7],
    [9,4,3,8,6,1,7,2,0,5],
    [2,5,8,1,4,3,6,7,9,0],
];

function dammDigit(digits) {
    let interim = 0;
    for (const d of digits) interim = DAMM10[interim][d];
    return interim; // 0 iff the digit stream (incl. its check digit) is valid
}

function idx(ch) { return ALPHABET.indexOf(ch); }

// Each symbol index (0..29) contributes its two decimal digits to the stream.
function bodyToDigits(body) {
    const digits = [];
    for (const ch of body) {
        const i = idx(ch);
        digits.push(Math.floor(i / 10), i % 10);
    }
    return digits;
}

function checksumChar(body) {
    return ALPHABET[dammDigit(bodyToDigits(body))]; // 0..9 -> ALPHABET[0..9]
}

// The nonce is not a security control, so Math.random is fine by default; a
// caller in a secure context can inject its own source.
function randBody(n, rnd) {
    let s = "";
    for (let i = 0; i < n; i++) s += ALPHABET[Math.floor(rnd() * BASE)];
    return s;
}

// ---- public API ----

// makeCode(flavor, rnd?) -> "HVN-FFNN-NNNC"
function makeCode(flavor, rnd) {
    const tag = FLAVOR_TAG[flavor];
    if (!tag) throw new Error("unknown flavor: " + flavor);
    const body = tag + randBody(5, rnd || Math.random);   // 7 chars
    const raw = body + checksumChar(body);                // 8 chars
    return "HVN-" + raw.slice(0, 4) + "-" + raw.slice(4);
}

// parseCode(str) -> { valid, flavor, body, reason }
// Rejects typos (bad checksum) WITHOUT any database lookup.
function parseCode(str) {
    if (typeof str !== "string") return { valid: false, reason: "empty" };
    const raw = str.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!raw.startsWith("HVN")) return { valid: false, reason: "prefix" };
    const core = raw.slice(3);                // FFNNNNNC
    if (core.length !== 8) return { valid: false, reason: "length" };
    for (const ch of core) {
        if (idx(ch) < 0) return { valid: false, reason: "alphabet" };
    }
    const body = core.slice(0, 7);
    if (checksumChar(body) !== core[7]) return { valid: false, reason: "checksum" };
    const flavor = TAG_FLAVOR[body.slice(0, 2)];
    if (!flavor) return { valid: false, reason: "flavor" };
    return { valid: true, flavor, body };
}

const _api = { makeCode, parseCode, ALPHABET, FLAVOR_TAG, TAG_FLAVOR, checksumChar };
if (typeof module !== "undefined" && module.exports) module.exports = _api;
if (typeof globalThis !== "undefined") globalThis.HavenCodeScheme = _api;

// ESM exports for Pages Functions (source of truth + tests live in
// haven-station/tools/download-flow/; keep this copy byte-identical above this line).
export { makeCode, parseCode };
