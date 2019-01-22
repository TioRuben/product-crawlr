import * as DB from "./db";
import * as format from "pg-format";
import { Product } from "../models/product";

export const getWishList = async (user: number): Promise<Product[]> =>
  DB.get(
    format(
      "SELECT products.* FROM wishlist JOIN products ON products.vendor_id=wishlist.vendor_id WHERE wishlist.user_id=%L",
      user
    )
  ).then(products =>
    products.map(product => ({
      ...product,
      vendorId: product.vendor_id,
      imageUrl: product.image_url
    }))
  );
