// _lib/redeem-logic.js — pure decision core for /api/redeem (challenge #71b,
// task_ladder #113). No I/O here: the Pages Function feeds it the parse
// result, the D1 row, and update.json's firmware block; it returns exactly
// what to say and what to record. Unit-tested in Node (redeem-logic.test.js).
//
// Policy defaults (Dave may override; chosen from standing rulings, see
// task_ladder #113 result):
//   - re-downloads ALLOWED: same code works up to MAX_REDEEMS times within
//     REDEEM_WINDOW_DAYS of first redemption (a failed download must never
//     strand a paying customer).
//   - a code whose flavor has no current image stays valid and says so
//     plainly ("check back"), so codes can be issued ahead of support.

export const MAX_REDEEMS = 5;
export const REDEEM_WINDOW_DAYS = 30;

export function evaluateRedemption({ parse, row, firmware, nowMs }) {
    if (!parse.valid) {
        // Checksum caught it — no DB was touched (the scheme's whole point).
        return {
            status: "bad_code",
            http: 400,
            message: "That code doesn't look right — check for a mistyped character.",
        };
    }
    if (!row) {
        return {
            status: "unknown_code",
            http: 404,
            message: "We don't recognize that code.",
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
    if (row.first_redeemed_at) {
        const firstMs = Date.parse(row.first_redeemed_at + "Z");
        const ageDays = (nowMs - firstMs) / 86400000;
        if (row.redeem_count >= MAX_REDEEMS || ageDays > REDEEM_WINDOW_DAYS) {
            return {
                status: "exhausted",
                http: 403,
                message:
                    "This code has reached its download limit. If your download failed, " +
                    "contact us and we'll set you right.",
            };
        }
    }
    return {
        status: "ok",
        http: 200,
        flavor: parse.flavor,
        version: image.version,
        url: image.url,
        sha256: image.sha256,
        size: image.size,
        message: "Verify the sha256 before flashing. The download link is below.",
    };
}
