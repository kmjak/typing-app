import { useEffect, useState } from "react";
import type { HealthResponse } from "../shared/types";

type State =
  | { kind: "loading" }
  | { kind: "ok"; health: HealthResponse }
  | { kind: "error"; message: string };

export const App = () => {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    fetch("/api/health")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setState({ kind: "ok", health: (await res.json()) as HealthResponse });
      })
      .catch((error: unknown) => {
        setState({ kind: "error", message: String(error) });
      });
  }, []);

  return (
    <main>
      <h1>タイピング練習</h1>
      {state.kind === "loading" && <p>サーバーに接続しています…</p>}
      {state.kind === "ok" && (
        <p>
          サーバー：{state.health.status} / DB：{state.health.db}
        </p>
      )}
      {state.kind === "error" && (
        <p>サーバーに接続できません：{state.message}</p>
      )}
    </main>
  );
};
