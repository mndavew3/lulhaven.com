-- Haven Challenge participant accounts. D1 binding haven_builds. STAGED — apply with:
--   wrangler d1 execute haven-builds --file=migrations/contest_accounts.sql --remote
-- Passwords are one-way + salted + peppered (see functions/_lib/account.js); no
-- plaintext, no reversible/decryptable store. Email is verified by an emailed code
-- before the account can log in. See docs/CONTEST_EXPORT_IMPORT_DESIGN.md.

CREATE TABLE IF NOT EXISTS contest_accounts (
  username         TEXT NOT NULL,               -- display case preserved
  username_lc      TEXT PRIMARY KEY,            -- case-insensitive uniqueness key
  email            TEXT NOT NULL UNIQUE,
  pw_hash          TEXT NOT NULL,               -- PBKDF2( HMAC(pepper, password), salt )
  pw_salt          TEXT NOT NULL,               -- per-user random salt (hex)
  verified         INTEGER NOT NULL DEFAULT 0,  -- 0 until the emailed code is echoed
  code             TEXT,                        -- 6-digit verification code (cleared on verify)
  code_expiry      INTEGER,                     -- unix seconds
  code_tries       INTEGER NOT NULL DEFAULT 0,
  reset_code       TEXT,                        -- 6-digit password-reset code (cleared on reset)
  reset_code_expiry INTEGER,                    -- unix seconds
  reset_tries      INTEGER NOT NULL DEFAULT 0,
  created_datetime TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_contest_accounts_email ON contest_accounts(email);
