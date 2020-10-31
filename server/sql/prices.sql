CREATE TABLE prices (
  primary_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  price INT NOT NULL,
  scrape_date TIMESTAMP WITHOUT TIME ZONE NOT NULL
);