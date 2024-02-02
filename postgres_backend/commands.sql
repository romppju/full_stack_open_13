CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);

INSERT INTO blogs (author, url, title) values ('Postgres Blogger 1', 'www.postgresblog1.com', 'Postgres blog 1');
INSERT INTO blogs (author, url, title) values ('Postgres Blogger 2', 'www.postgresblog2.com', 'Postgres blog 2');