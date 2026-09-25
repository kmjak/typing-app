import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";

export type Db = Database.Database;

export const openDatabase = (path: string): Db => {
  if (path !== ":memory:") {
    mkdirSync(dirname(path), { recursive: true });
  }
  return new Database(path);
};
