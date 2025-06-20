import { PrismaClient } from "./generated/index.js";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

/**
 * Prisma Client doesn’t embed your DB URL at build time.
 * By default (when you don’t use Data Proxy), your schema.prisma points at
 *
 * Your Node app needs to know the URL at runtime.
 *
 * PrismaClient under the hood does something like: process.env.DATABASE_URL
 *
 * Passing the URL in code or loading .env
 *
 */

const prisma = new PrismaClient({
  datasources: {
    db: { url: connectionString }, // Pass it explicitly in the constructor (using the datasources override):
  },
});

export default prisma;

/**
 * Prisma Cloud (Data Proxy) clients are generated with a hard-coded prisma://… URL in the schema, so your code “just works.”

 * Local clients read env("DATABASE_URL") only at CLI time; your Node process still needs to 
 * (a) have that env var set, or 
 * (b) be told the URL explicitly in code.
 */
