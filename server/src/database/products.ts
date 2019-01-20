import * as DB from "./db";
import * as format from "pg-format";
import { Product } from "../models/product";
import { startCrawl } from "../crawler/start-crawl";

export const getAllProducts = async (): Promise<Product[]> =>
  startCrawl().then(products =>
    products.length > 0
      ? createAndUpdateMultipleProducts(products).then(r =>
          removeOldProducts().then(s => selectAllProducts())
        )
      : selectAllProducts()
  );

const selectAllProducts = async (): Promise<Product[]> =>
  DB.get("SELECT * FROM products").then(products =>
    products.map(product => ({
      ...product,
      vendorId: product.vendor_id
    }))
  );

export const createProduct = async (product: Product): Promise<any> => {
  const { description, link, price, vendorId } = product;
  const query = {
    text:
      "INSERT INTO products (description, link, price, vendor_id, updated) VALUES($1, $2, $3, $4, $5)",
    values: [
      description,
      link,
      price,
      vendorId,
      new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
    ]
  };
  return await DB.mutate(query);
};

export const removeOldProducts = async (): Promise<number> =>
  DB.mutate({
    text: `DELETE FROM products WHERE (updated + interval '${
      process.env.UPDATE_HOURS
    } hour') > current_timestamp`
  });

export const createAndUpdateMultipleProducts = async (
  products: Product[]
): Promise<number> => {
  const current_timestamp: string = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
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
      current_timestamp
    ]);
  const query = format(
    "INSERT INTO products (description, link, price, vendor_id, updated) " +
      "VALUES %L ON CONFLICT (vendor_id) DO UPDATE " +
      "SET description=excluded.description, link=excluded.link, price=excluded.price, updated=excluded.updated",
    values
  );
  return await DB.mutate({ text: query });
};

export const deleteProduct = async (id: number): Promise<number> => {
  const query = {
    text: "DELETE FROM products where id = $1",
    values: [id]
  };
  return await DB.mutate(query);
};
