// _lib/redeem-logic.js — pure decision core for /api/redeem (challenge #71b,
// task_ladder #113; realigned to design A, Dave 2026-09-07). No I/O here: the
// Pages Function feeds it the parse result and update.json's firmware block;
// it returns exactly what to say. Unit-tested in Node (redeem-logic.test.js).
//
// Design A (Dave, 2026-09-07, reaffirming the locked 2026-07-29 record): the
// software is free and the code is a DATA CARRIER, not an auth token — it
// exists so a detection made on an offline PC can be typed into a connected
// one. Forgery has no harm model, so there is no issuance table, no redeem
// count, no expiry window. The only failure the code guards against is a
// TYPO silently resolving to a different router's image — that is the
// checksum's job, and a bad checksum must fail loudly.
//
//   - a code whose flavor has no current image stays valid and says so
//     plainly ("check back"), so a capable-but-unbuilt detection starts
//     succeeding the day that image ships (resolve-at-redemption, locked).

export function evaluateRedemption({ parse, firmware }) {
    if (!parse.valid) {
        // Checksum caught it — the scheme's whole point.
        return {
            status: "bad_code",
            http: 400,
            message: "That code doesn't look right — check for a mistyped character.",
        };
    }
    const image = firmware && firmware[parse.flavor];
    if (!image || !image.url) {
        return {
            status: "not_yet_available",
            http: 200,
            message:
                "Your code is good, but the image for your hardware isn't published yet. " +
                "Keep the code — it will start working the day the image ships.",
        };
    }
    return {
        status: "ok",
        http: 200,
        flavor: parse.flavor,
        version: image.version,
        url: image.url,
        sha256: image.sha256,
        size: image.size,
        // pi/vm are written or imported, never flashed — their own guided pages
        // promise "nothing is flashed", so this message must not say otherwise.
        message: parse.flavor === "pi" || parse.flavor === "vm"
            ? "Verify the sha256, then follow the guided steps for your platform. Nothing is flashed."
            : "Verify the sha256 before flashing. The download link is below.",
    };
}
