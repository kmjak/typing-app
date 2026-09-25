import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "./db";

describe("openDatabase", () => {
  let tempDir: string | undefined;

  afterEach(() => {
    if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  });

  it("無いディレクトリごと SQLite のファイルを作って開ける", () => {
    tempDir = mkdtempSync(join(tmpdir(), "typing-app-"));
    const path = join(tempDir, "nested", "typing.db");

    const db = openDatabase(path);

    expect(existsSync(path)).toBe(true);
    expect(db.prepare("select 1 as one").get()).toEqual({ one: 1 });
    db.close();
  });
});
