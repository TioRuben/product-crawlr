import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});

export const get = (query: string): Promise<any> => {
  console.log("EXEC:", query);
  return pool.query(query).then(res => res.rows);
};

export const mutate = async (query: pg.QueryConfig): Promise<number> => {
  console.log("EXEC:", query);
  return pool.query(query).then(res => res.rowCount);
};

export const empty = async (table: string): Promise<boolean> => {
  console.log("TRUNCATE:", table);
  await pool.query(`TRUNCATE TABLE ${table}`);
  return true;
};
