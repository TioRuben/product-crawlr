import { getPageCount } from "./get-page-count";
import { singlePageCrawler } from "./single-page-product-crawler";
import { Product } from "../models/product";

export const mainCrawler = async (mainPage: string): Promise<Product[]> =>
  getPageCount(mainPage).then(async pages => {
    const crawlers: Promise<Product[]>[] = [];
    for (var i = 1; i <= pages; i++) {
      crawlers.push(singlePageCrawler(`${mainPage}?sort=price_asc&page=${i}`));
    }
    const productsArray = await Promise.all(crawlers);
    return [...new Set([].concat(...productsArray))];
  });
