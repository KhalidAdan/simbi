CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name text NOT NULL,
  product_description text NOT NULL,
  product_image text,
  price money NOT NULL,
  product_url text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
);

CREATE TYPE list_type as ENUM ('one_time', 'recurring');

CREATE TABLE recurring_times(
  id SERIAL PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO recurring_times (name) VALUES ('every 7 days'), ('every 14 days'), ('every 30 days');

CREATE TABLE list (
  id SERIAL PRIMARY KEY,
  list_name text NOT NULL,
  list_description text NOT NULL,
  end_date timestamp,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  type list_type NOT NULL DEFAULT 'one_time',
  recurring_window int REFERENCES recurring_times(id), 
  public bool NOT NULL DEFAULT true,
  user_id int REFERENCES users(id) ON DELETE NOT NULL 
);

CREATE TABLE list_user (
  id SERIAL PRIMARY KEY,
  list_id int REFERENCES list(id) ON DELETE CASCADE,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE list_product (
  id SERIAL PRIMARY KEY,
  product_id int REFERENCES product(id) ON DELETE CASCADE,
  list_id int REFERENCES list(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  claimed_by int REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
);

CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  content text NOT NULL,
  user_id int REFERENCES users(id) ON DELETE SET NULL,
  product_id int REFERENCES product(id) ON DELETE SET NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
);

CREATE TABLE recurring_times (
  id SERIAL PRIMARY KEY,
  name text
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY, -- , , , , , 
  name text NOT NULL,
  colour text NOT NULL
);

CREATE TABLE tag_list (
  id SERIAL PRIMARY KEY,
  tag_id int REFERENCES tags(id) ON DELETE CASCADE,
  list_id int REFERENCES list(id) ON DELETE CASCADE
);

INSERT INTO tags (name, colour) 
VALUES ('🏫 Back to school', '#F9D9D9'),
('🧴 Self care', 'red'),
('⛺️ Summer Camp', 'amber'),
('🪮 Hair care', 'cyan'),
('🍼 Baby registry', 'lime'),
('👩🏽‍🍳 Beginner cooking gear', 'violet');

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE invite_code (
  id SERIAL PRIMARY KEY,
  code uuid DEFAULT gen_random_uuid(),
  list_id int REFERENCES list(id),
  sender_user_id int REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW(),
  expires_at timestamp NOT NULL DEFAULT NOW() + INTERVAL '7 days'
);

-- remove, will just use application code to do this
CREATE OR REPLACE FUNCTION is_valid_uuid(uuid_text text) RETURNS boolean AS $$
BEGIN
  RETURN uuid_text ~ '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
END;
$$ LANGUAGE plpgsql;

CREATE TABLE user_signup_codes (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  invite_code_id int REFERENCES invite_code(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);
