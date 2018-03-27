DROP DATABASE IF EXISTS contacts;
CREATE DATABASE contacts;

\c contacts;

CREATE TABLE contacts (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    number VARCHAR
);

INSERT INTO contacts (name, number)
    VALUES ('Nick', '828.713.1626');

