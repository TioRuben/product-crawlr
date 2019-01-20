import * as DB from "./db";

export const needsUpdate = async (): Promise<boolean> =>
  DB.get(
    `SELECT * FROM products WHERE (updated + interval '${
      process.env.UPDATE_HOURS
    } hour') > current_timestamp LIMIT 1`
  ).then(result => result.length > 0);
