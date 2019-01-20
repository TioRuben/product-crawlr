import * as Request from "request-promise-native";
import { load } from "cheerio";
import { Product } from "../models/product";

export const singlePageCrawler = async (page: string): Promise<Product[]> => {
  return Request.get(page).then(result => {
    const products: Product[] = [];
    const $ = load(result);
    $(".search-results-product").each((index, element) => {
      const link = $("h4 > a", element).attr("href");
      const linkSplitted = link.split("/");
      products.push({
        description: $("h4", element).text(),
        link,
        price: parseFloat(
          $("h3.section-title", element)
            .text()
            .replace("€", "")
        ),
        vendorId: parseInt(linkSplitted[linkSplitted.length - 1])
      });
    });
    return products;
  });
};
