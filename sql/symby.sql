CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name text NOT NULL,
  product_description text NOT NULL,
  product_image text,
  price money NOT NULL,
  url text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
);

CREATE TYPE list_type as ENUM ('one_time', 'recurring');

CREATE TABLE list (
  id SERIAL PRIMARY KEY,
  list_name text NOT NULL,
  list_description text NOT NULL,
  end_date date NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  type list_type NOT NULL DEFAULT 'one_time',
  recurring_window int REFERENCES recurring_times(id), -- in days, so 7 = weekly, 14 = bi-weekly, 30 = monthly, etc.
  public bool NOT NULL DEFAULT true
  user_id int REFERENCES users(id) ON DELETE NOT NULL
);

CREATE TABLE list_product (
  id SERIAL PRIMARY KEY,
  product_id int REFERENCES product(id) ON DELETE CASCADE,
  list_id int REFERENCES list(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  claimedBy int REFERENCES users(id) ON DELETE SET NULL,
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
