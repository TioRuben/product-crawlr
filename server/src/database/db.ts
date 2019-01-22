import * as pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});

export const get = async (query: string): Promise<any> => {
  const res = await pool.query(query);
  return res.rows;
};

export const mutate = async (query: pg.QueryConfig): Promise<number> => {
  const res = await pool.query(query);
  return res.rowCount;
};

export const empty = async (table: string): Promise<boolean> => {
  await pool.query(`TRUNCATE TABLE ${table}`);
  return true;
};
