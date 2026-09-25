import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { openDatabase } from "./db";

const DB_PATH = "data/typing.db";
const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const db = openDatabase(DB_PATH);
console.log(`SQLite を開きました: ${DB_PATH}`);

serve(
  { fetch: createApp(db).fetch, hostname: HOSTNAME, port: PORT },
  (info) => {
    console.log(`サーバーを起動しました: http://${HOSTNAME}:${info.port}`);
  },
);
