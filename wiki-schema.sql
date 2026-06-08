-- Haven Wiki — D1 schema
-- Namespaces: 'haven' = team-authored, locked to admin; 'community' = open to editors

CREATE TABLE IF NOT EXISTS wiki_users (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    email            TEXT    NOT NULL UNIQUE,
    password_hash    TEXT    NOT NULL,
    display_name     TEXT    NOT NULL,
    role             TEXT    NOT NULL DEFAULT 'editor', -- admin | editor
    verified         INTEGER NOT NULL DEFAULT 0,
    verify_token     TEXT,
    created_datetime TEXT    NOT NULL,
    last_login_datetime TEXT
);

CREATE TABLE IF NOT EXISTS wiki_sessions (
    token            TEXT    PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES wiki_users(id) ON DELETE CASCADE,
    expires_datetime TEXT    NOT NULL,
    created_datetime TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS wiki_pages (
    slug             TEXT    PRIMARY KEY,           -- e.g. "haven/schedule", "community/dns-tips"
    namespace        TEXT    NOT NULL DEFAULT 'community', -- haven | community
    title            TEXT    NOT NULL,
    body             TEXT    NOT NULL DEFAULT '',   -- Markdown source
    author_id        INTEGER REFERENCES wiki_users(id),
    created_datetime TEXT    NOT NULL,
    modified_datetime TEXT   NOT NULL,
    revision         INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS wiki_revisions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    slug             TEXT    NOT NULL,
    revision         INTEGER NOT NULL,
    title            TEXT    NOT NULL,
    body             TEXT    NOT NULL,
    author_id        INTEGER REFERENCES wiki_users(id),
    summary          TEXT    NOT NULL DEFAULT '',   -- edit summary
    created_datetime TEXT    NOT NULL,
    UNIQUE(slug, revision)
);

-- Full-text search over pages
CREATE VIRTUAL TABLE IF NOT EXISTS wiki_pages_fts USING fts5(
    slug UNINDEXED,
    title,
    body,
    content='wiki_pages',
    content_rowid='rowid'
);

CREATE TRIGGER IF NOT EXISTS wiki_pages_fts_insert AFTER INSERT ON wiki_pages BEGIN
    INSERT INTO wiki_pages_fts(rowid, slug, title, body)
    VALUES (new.rowid, new.slug, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS wiki_pages_fts_update AFTER UPDATE ON wiki_pages BEGIN
    INSERT INTO wiki_pages_fts(wiki_pages_fts, rowid, slug, title, body)
    VALUES ('delete', old.rowid, old.slug, old.title, old.body);
    INSERT INTO wiki_pages_fts(rowid, slug, title, body)
    VALUES (new.rowid, new.slug, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS wiki_pages_fts_delete AFTER DELETE ON wiki_pages BEGIN
    INSERT INTO wiki_pages_fts(wiki_pages_fts, rowid, slug, title, body)
    VALUES ('delete', old.rowid, old.slug, old.title, old.body);
END;

CREATE INDEX IF NOT EXISTS idx_wiki_revisions_slug ON wiki_revisions(slug, revision DESC);
CREATE INDEX IF NOT EXISTS idx_wiki_sessions_expires ON wiki_sessions(expires_datetime);
CREATE INDEX IF NOT EXISTS idx_wiki_pages_namespace ON wiki_pages(namespace, modified_datetime DESC);
