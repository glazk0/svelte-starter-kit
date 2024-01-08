import * as dotvenv from "dotenv";
import type { Config } from "drizzle-kit";

dotvenv.config();

export default {
  schema: "./src/lib/server/drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME as string,
  },
  out: "./src/lib/server/drizzle/migrations",
} satisfies Config;
