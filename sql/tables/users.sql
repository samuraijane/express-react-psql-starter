-- ============= USERS =============
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  last_name varchar(30) not null,
  first_name varchar(30) not null,
  email VARCHAR(50) not null unique,
  pw_hash VARCHAR(50) not null,
  created_at date not null,
  updated_at date not null,
  PRIMARY KEY(user_id)
);
INSERT INTO users (last_name, first_name, email, pw_hash, created_at, updated_at) VALUES
  /*
  TODO
    delete this user before deploying as it exists for demo purposes only;
    not deleting this user puts the database at risk.
  */
  ('Anderson', 'Anna', 'anna@email.com', '1234', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
