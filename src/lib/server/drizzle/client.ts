import { dev } from "$app/environment";
import { DATABASE_HOST, DATABASE_MAX_CONNECTIONS, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "$env/static/private";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export const connection = new pg.Pool({
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  max: Number(DATABASE_MAX_CONNECTIONS),
});

export const database = drizzle(connection, {
  logger: dev,
});
