import * as DB from "./db";
import format from "pg-format";
import { Product } from "../models/product";
import { startCrawl } from "../crawler/start-crawl";

export const getProducts = async (
  filter: string,
  orderBy: string,
  asc: boolean,
  limit: number,
  offset: number
): Promise<Product[]> =>
  startCrawl().then(products =>
    products.length > 0
      ? createAndUpdateMultipleProducts(products).then(update_timestamp =>
          removeOldProducts(update_timestamp).then(s =>
            selectFilteredProducts(filter, orderBy, asc, limit, offset)
          )
        )
      : selectFilteredProducts(filter, orderBy, asc, limit, offset)
  );

const selectFilteredProducts = async (
  filter: string,
  orderBy: string,
  asc: boolean,
  limit: number,
  offset: number
): Promise<Product[]> =>
  DB.get(
    format(
      "SELECT * FROM products WHERE description ILIKE %L ORDER BY %I %s LIMIT %s OFFSET %s",
      `%${filter || ""}%`,
      orderBy,
      asc ? "ASC" : "DESC",
      limit,
      offset
    )
  ).then(products =>
    products.map(product => ({
      ...product,
      vendorId: product.vendor_id,
      imageUrl: product.image_url
    }))
  );

const selectAllProducts = async (): Promise<Product[]> =>
  DB.get("SELECT * FROM products ORDER BY price ASC").then(products =>
    products.map(product => ({
      ...product,
      vendorId: product.vendor_id,
      imageUrl: product.image_url
    }))
  );

export const removeOldProducts = async (timestamp: string): Promise<number> =>
  DB.mutate({
    text: `DELETE FROM products WHERE updated < '${timestamp}'`
  });

export const createAndUpdateMultipleProducts = async (
  products: Product[]
): Promise<string> => {
  const current_timestamp: string = new Date().toISOString();
  const values = products
    .filter(
      (value, index, self) =>
        index === self.findIndex(v => v.vendorId === value.vendorId)
    )
    .map(product => [
      product.description,
      product.link,
      product.price,
      product.vendorId,
      product.imageUrl,
      current_timestamp
    ]);
  const query = format(
    "INSERT INTO products (description, link, price, vendor_id, image_url, updated) " +
      "VALUES %L ON CONFLICT (vendor_id) DO UPDATE " +
      "SET description=excluded.description, link=excluded.link, price=excluded.price, updated=excluded.updated",
    values
  );
  return DB.mutate({ text: query }).then(queryResult =>
    Promise.resolve(current_timestamp)
  );
};
