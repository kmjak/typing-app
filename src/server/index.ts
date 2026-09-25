import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { openDatabase } from "./db";

const DB_PATH = "data/typing.db";
const PORT = 3000;

const db = openDatabase(DB_PATH);
console.log(`SQLite を開きました: ${DB_PATH}`);

serve({ fetch: createApp(db).fetch, port: PORT }, (info) => {
  console.log(`サーバーを起動しました: http://localhost:${info.port}`);
});
