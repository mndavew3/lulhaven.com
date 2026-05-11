// git.js — commit and push files to mndavew3/haven-data via the GitHub API.
//
// Authentication: a fine-grained Personal Access Token stored as the Cloudflare
// secret HAVEN_DATA_GITHUB_TOKEN. Scoped to mndavew3/haven-data with Contents:
// Read and write. Set via:
//   wrangler pages secret put HAVEN_DATA_GITHUB_TOKEN --project-name=lulhaven
//
// Why GitHub API and not `git`: Cloudflare Workers have no filesystem, no shell,
// no git binary. The GitHub REST API supports tree/blob/commit creation over
// HTTPS — that's the only mechanism available.
//
// The commit flow per call:
//   1. GET the current ref of main -> commit SHA
//   2. GET that commit -> tree SHA
//   3. POST a new blob with the file content -> blob SHA
//   4. POST a new tree, base_tree = old tree, with our path -> new tree SHA
//   5. POST a new commit, parent = old commit, tree = new tree -> new commit SHA
//   6. PATCH refs/heads/main to point at new commit SHA
//
// Atomicity: step 6 fails with 409 on race conditions. Caller can retry.

const OWNER = "mndavew3";
const REPO  = "haven-data";
const BRANCH = "main";
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

async function gh(env, path, method = "GET", body = null) {
    const url = path.startsWith("http") ? path : API_BASE + path;
    const headers = {
        "Authorization": `Bearer ${env.HAVEN_DATA_GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        // GitHub requires a non-empty UA on API calls
        "User-Agent": "haven-cf-pages-fn",
    };
    const init = { method, headers };
    if (body !== null) {
        init.body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
    }
    const res = await fetch(url, init);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`GitHub API ${method} ${path} -> ${res.status}: ${text}`);
    }
    return res.json();
}

/**
 * Commit a single file to haven-data/main.
 *
 * @param env       Pages env (has HAVEN_DATA_GITHUB_TOKEN)
 * @param path      e.g. "builds/mn-st-cloud/260510NAV0001.json"
 * @param content   string content of the file
 * @param message   commit message
 * @param author    { name: "...", email: "..." } — optional, defaults to a bot identity
 * @returns         { commit_sha, html_url }
 */
export async function commitFile(env, path, content, message, author = null) {
    if (!env.HAVEN_DATA_GITHUB_TOKEN) {
        throw new Error("HAVEN_DATA_GITHUB_TOKEN secret not configured on Pages project");
    }

    author = author || {
        name: "Haven Build Maint",
        email: "build-maint@lulhaven.com",
    };

    // 1. current main ref -> commit SHA
    const ref = await gh(env, `/git/ref/heads/${BRANCH}`);
    const parentCommitSha = ref.object.sha;

    // 2. parent commit -> tree SHA
    const parentCommit = await gh(env, `/git/commits/${parentCommitSha}`);
    const baseTreeSha = parentCommit.tree.sha;

    // 3. create blob
    const blob = await gh(env, "/git/blobs", "POST", {
        content,
        encoding: "utf-8",
    });

    // 4. create new tree
    const tree = await gh(env, "/git/trees", "POST", {
        base_tree: baseTreeSha,
        tree: [{
            path,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
        }],
    });

    // 5. create commit
    const commit = await gh(env, "/git/commits", "POST", {
        message,
        tree: tree.sha,
        parents: [parentCommitSha],
        author,
        committer: author,
    });

    // 6. update ref (atomic; will 409 on race)
    await gh(env, `/git/refs/heads/${BRANCH}`, "PATCH", {
        sha: commit.sha,
        force: false,
    });

    return {
        commit_sha: commit.sha,
        html_url: `https://github.com/${OWNER}/${REPO}/commit/${commit.sha}`,
    };
}

/**
 * Convenience: commit a full build record (header + steps + NCRs) as JSON.
 *
 * @param env      Pages env
 * @param db       D1 database binding (env.haven_builds)
 * @param buildId  integer
 * @param message  commit message
 * @returns        { commit_sha, html_url, path }
 */
export async function commitBuildSnapshot(env, db, buildId, message) {
    const build = await db.prepare(
        `SELECT * FROM builds WHERE id = ?`
    ).bind(buildId).first();
    if (!build) throw new Error(`Build ${buildId} not found`);

    const stepsRes = await db.prepare(
        `SELECT * FROM build_steps WHERE build_id = ? ORDER BY step_order`
    ).bind(buildId).all();

    const ncrsRes = await db.prepare(
        `SELECT * FROM build_nonconformances WHERE build_id = ? ORDER BY discovered_datetime`
    ).bind(buildId).all();

    const snapshot = {
        snapshot_taken_at: new Date().toISOString(),
        build,
        steps: stepsRes.results,
        nonconformances: ncrsRes.results,
    };

    const path = `builds/${build.site}/${build.serial}.json`;
    const content = JSON.stringify(snapshot, null, 2) + "\n";

    return {
        path,
        ...(await commitFile(env, path, content, message, {
            name: build.released_by || "Haven Build Maint",
            email: "build-maint@lulhaven.com",
        })),
    };
}
