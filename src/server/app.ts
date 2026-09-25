import { Hono } from "hono";
import type { HealthResponse } from "../shared/types";
import type { Db } from "./db";

export const createApp = (db: Db) => {
  const app = new Hono();

  app.get("/api/health", (c) => {
    db.prepare("select 1").get();
    return c.json<HealthResponse>({ status: "ok", db: "ok" });
  });

  return app;
};
