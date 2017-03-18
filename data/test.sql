DROP DATABASE IF EXISTS rentdb;
CREATE DATABASE rentdb;

\c rentdb;

CREATE TABLE test (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  likes INTEGER,
  description VARCHAR
);

INSERT INTO test (name, likes, description)
VALUES ('Artur Raud', 300, 'Foo description');
INSERT INTO test (name, likes, description)
VALUES ('Rauno Ruusand', 2, 'Bar description');