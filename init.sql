CREATE TABLE products
(
    vendor_id bigint NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    link text COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2),
    updated timestamp with time zone,
    image_url text COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (vendor_id)
);
CREATE TABLE wishlist
(
    user_id integer NOT NULL,
    vendor_id integer NOT NULL
);
CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name VARCHAR NOT NULL,
   pw_hash VARCHAR NOT NULL
);
CREATE EXTENSION pgcrypto;