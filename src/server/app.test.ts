import { describe, expect, it } from "vitest";
import { createApp } from "./app";
import { openDatabase } from "./db";

describe("createApp", () => {
  it("GET /api/health は status と db が ok を返す", async () => {
    const app = createApp(openDatabase(":memory:"));

    const res = await app.request("/api/health");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok", db: "ok" });
  });
});
