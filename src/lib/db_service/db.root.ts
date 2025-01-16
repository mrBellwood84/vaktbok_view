"use server";

import { createConnection, ConnectionOptions } from "mysql2/promise";

const options: ConnectionOptions = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

export const dbBaseQuery = async (query: string) => {
  const conn = await createConnection(options);
  const [result] = await conn.query(query);
  conn.end();
  return result;
};
