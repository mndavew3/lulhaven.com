// Shared utilities for Haven Wiki Workers

export const WIKI_SESSION_COOKIE = "haven_wiki_session";
export const SESSION_LIFE_DAYS   = 30;
export const SESSION_LIFE_MS     = SESSION_LIFE_DAYS * 24 * 60 * 60 * 1000;

// --- crypto helpers ---

export async function hashPassword(password) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 },
        key, 256
    );
    const saltHex = hex(salt);
    const hashHex = hex(new Uint8Array(bits));
    return `pbkdf2:${saltHex}:${hashHex}`;
}

export async function verifyPassword(password, stored) {
    const [, saltHex, hashHex] = stored.split(":");
    if (!saltHex || !hashHex) return false;
    const enc = new TextEncoder();
    const salt = unhex(saltHex);
    const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 },
        key, 256
    );
    return hex(new Uint8Array(bits)) === hashHex;
}

export function randomToken(bytes = 32) {
    return hex(crypto.getRandomValues(new Uint8Array(bytes)));
}

function hex(buf) {
    return Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
}
function unhex(s) {
    const out = new Uint8Array(s.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
    return out;
}

// --- session ---

export function getCookie(request, name) {
    const h = request.headers.get("Cookie") || "";
    for (const part of h.split(/;\s*/)) {
        const [k, ...v] = part.split("=");
        if (k === name) return v.join("=");
    }
    return null;
}

export function sessionCookie(token, maxAge) {
    const parts = [`${WIKI_SESSION_COOKIE}=${token}`, "Path=/wiki", "HttpOnly", "SameSite=Strict", "Secure"];
    parts.push(maxAge === 0 ? "Max-Age=0" : `Max-Age=${SESSION_LIFE_DAYS * 86400}`);
    return parts.join("; ");
}

// Returns user row or null
export async function sessionUser(request, db) {
    const token = getCookie(request, WIKI_SESSION_COOKIE);
    if (!token) return null;
    const now = new Date().toISOString();
    const row = await db.prepare(
        "SELECT u.id, u.email, u.display_name, u.role FROM wiki_sessions s " +
        "JOIN wiki_users u ON u.id = s.user_id " +
        "WHERE s.token = ?1 AND s.expires_datetime > ?2"
    ).bind(token, now).first();
    return row || null;
}

// --- responses ---

export function json(data, status = 200, extra = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", ...extra }
    });
}

export function err(msg, status = 400) {
    return json({ ok: false, error: msg }, status);
}

// --- datetime ---

export function now() {
    return new Date().toISOString();
}

// --- minimal Markdown → HTML renderer ---
// Handles: headings, bold, italic, inline code, code blocks, links,
//          unordered lists, ordered lists, blockquotes, horizontal rules, paragraphs.

export function renderMarkdown(md) {
    let html = "";
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    let i = 0;
    let inUl = false, inOl = false, inBlockquote = false;

    function closeList() {
        if (inUl) { html += "</ul>\n"; inUl = false; }
        if (inOl) { html += "</ol>\n"; inOl = false; }
    }
    function closeBlockquote() {
        if (inBlockquote) { html += "</blockquote>\n"; inBlockquote = false; }
    }

    function inline(s) {
        return s
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    }

    while (i < lines.length) {
        const line = lines[i];

        // fenced code block
        if (/^```/.test(line)) {
            closeList(); closeBlockquote();
            const lang = line.slice(3).trim();
            let code = "";
            i++;
            while (i < lines.length && !/^```/.test(lines[i])) { code += lines[i] + "\n"; i++; }
            html += `<pre><code${lang ? ` class="language-${lang}"` : ""}>${code.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</code></pre>\n`;
            i++; continue;
        }

        // heading
        const hm = line.match(/^(#{1,6})\s+(.*)/);
        if (hm) {
            closeList(); closeBlockquote();
            const lvl = hm[1].length;
            html += `<h${lvl}>${inline(hm[2])}</h${lvl}>\n`;
            i++; continue;
        }

        // hr
        if (/^---+\s*$/.test(line)) {
            closeList(); closeBlockquote();
            html += "<hr>\n"; i++; continue;
        }

        // blockquote
        if (/^> /.test(line)) {
            closeList();
            if (!inBlockquote) { html += "<blockquote>\n"; inBlockquote = true; }
            html += `<p>${inline(line.slice(2))}</p>\n`;
            i++; continue;
        }
        if (inBlockquote && line.trim() !== "") {
            html += `<p>${inline(line)}</p>\n`; i++; continue;
        }

        // unordered list
        if (/^[-*] /.test(line)) {
            closeBlockquote();
            if (!inUl) { closeList(); html += "<ul>\n"; inUl = true; }
            html += `<li>${inline(line.slice(2))}</li>\n`;
            i++; continue;
        }

        // ordered list
        if (/^\d+\. /.test(line)) {
            closeBlockquote();
            if (!inOl) { closeList(); html += "<ol>\n"; inOl = true; }
            html += `<li>${inline(line.replace(/^\d+\. /, ""))}</li>\n`;
            i++; continue;
        }

        // blank line
        if (line.trim() === "") {
            closeList(); closeBlockquote(); i++; continue;
        }

        // paragraph
        closeList(); closeBlockquote();
        html += `<p>${inline(line)}</p>\n`;
        i++;
    }
    closeList(); closeBlockquote();
    return html;
}
