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
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  type list_type NOT NULL DEFAULT 'one_time',
  recurring_date date, -- only used if type is recurring, and is the date the list is due so we can send reminders and add +30 days to it or w/e
  public bool NOT NULL DEFAULT true
  user_id int REFERENCES users(id) ON DELETE NOT NULL
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