CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name text NOT NULL,
  product_description text NOT NULL,
  product_image text,
  price integer NOT NULL,
  url text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
);

CREATE TYPE list_type as ENUM ('one_time', 'recurring');

CREATE TABLE list (
  id SERIAL PRIMARY KEY,
  list_name text NOT NULL,
  list_description text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  type list_type NOT NULL DEFAULT 'one_time',
  public bool NOT NULL DEFAULT true
);

CREATE TABLE list_product (
  id SERIAL PRIMARY KEY,
  product_id int REFERENCES product(id) ON DELETE CASCADE,
  list_id int REFERENCES list(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
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