CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name text,
  email text,
  email_verified timestamp,
  image text,
  UNIQUE(email)
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  provider text,
  provider_account_id text,
  refresh_token text,
  access_token text,
  expires_at int,
  token_type text,
  scope text,
  id_token text,
  session_state text
);

CREATE TABLE session (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  expires timestamp,
  session_token text
);

CREATE TABLE verification_token (
  identifier text PRIMARY KEY,
  token text,
  expires timestamp
)