import * as Request from "request-promise-native";
import { load } from "cheerio";

export const getPageCount = async (mainPage: string): Promise<number> => {
  return Request.get(mainPage).then(mainPageHtml => {
    let numpages = 0;
    const $ = load(mainPageHtml);
    const lastLink = $(".result-list-pagination a:contains(last)");
    if (lastLink.length > 0) {
      const linkPieces = lastLink.attr("href").split("&page=");
      numpages = parseInt(linkPieces[linkPieces.length - 1]);
    } else {
      const pageLinks = $(".result-list-pagination a:not(:contains(next))");
      const linkPieces = pageLinks
        .last()
        .attr("href")
        .split("&page=");
      numpages = parseInt(linkPieces[linkPieces.length - 1]);
    }
    return numpages;
  });
};
