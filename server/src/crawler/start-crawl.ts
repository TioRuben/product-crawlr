import { Product } from "../models/product";
import { mainCrawler } from "./main-crawler";
import { checkCrawlStatus } from "./check-crawl-status";

export const startCrawl = async (): Promise<Product[]> =>
  checkCrawlStatus().then(needsUpdate =>
    needsUpdate
      ? Promise.all([
          mainCrawler(process.env.URL_1),
          mainCrawler(process.env.URL_2)
        ]).then(products => [...new Set([].concat(...products))])
      : []
  );
