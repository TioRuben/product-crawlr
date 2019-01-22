import { crawlStatus } from "../database";

export const checkCrawlStatus = async () => crawlStatus.needsUpdate();

export const updateCrawlStatus = async () => crawlStatus.updateStatus();
