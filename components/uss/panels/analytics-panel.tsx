"use client";

import { useEffect, useState } from "react";

export function AnalyticsPanel({ focus = "overview" }: { focus?: "overview" | "engagement" | "growth" | string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/uss/summary", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setSummary(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full animate-pulse">
        <div className="h-6 w-40 rounded bg-white/10" />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="h-24 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
          <div className="h-24 rounded bg-white/10" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="text-red-300">Falha ao carregar: {error}</div>;
  }

  return (
    <div className="space-y-3">
      <div className="opacity-80">Foco: <span className="font-mono">{String(focus)}</span></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <div className="text-xs opacity-70">Total contas</div>
          <div className="text-lg font-semibold">{summary?.counts?.accounts ?? "—"}</div>
        </div>
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <div className="text-xs opacity-70">Postagens</div>
          <div className="text-lg font-semibold">{summary?.counts?.posts ?? "—"}</div>
        </div>
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <div className="text-xs opacity-70">Notificações</div>
          <div className="text-lg font-semibold">{summary?.counts?.notifications ?? "—"}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-40 rounded border border-white/10 bg-gradient-to-b from-fuchsia-500/10 to-transparent p-3">
          <div className="text-xs opacity-70">Gráfico 1 ({focus === "engagement" ? "Engajamento" : focus === "growth" ? "Crescimento" : "Visão geral"})</div>
          <div className="mt-2 h-28 rounded bg-white/5" />
        </div>
        <div className="h-40 rounded border border-white/10 bg-gradient-to-b from-sky-500/10 to-transparent p-3">
          <div className="text-xs opacity-70">Gráfico 2</div>
          <div className="mt-2 h-28 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
