"use client";

import { useEffect, useState } from "react";

export function NotificationsPanel({ filter = "unread" }: { filter?: "unread" | "all" | string }) {
  const [items, setItems] = useState<Array<{ id: string; title: string; read?: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        // Simulado — integrar com fonte real depois
        const seeded = Array.from({ length: 6 }).map((_, i) => ({ id: String(i + 1), title: `Notificação #${i + 1}`, read: i % 3 === 0 }));
        await new Promise(r => setTimeout(r, 250));
        if (!cancelled) setItems(seeded);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const shown = items.filter(n => filter === "all" ? true : !n.read);

  return (
    <div className="space-y-3">
      <div className="opacity-80">Notificações · filtro: <span className="font-mono">{String(filter)}</span></div>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded border border-white/10 bg-white/10" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <div className="rounded border border-white/10 bg-white/5 p-3 opacity-80">Nada por aqui.</div>
      ) : (
        <div className="space-y-2">
          {shown.map(n => (
            <div key={n.id} className="rounded border border-white/10 bg-white/5 p-2">
              <div className="font-medium">{n.title}</div>
              <div className="text-xs opacity-60">{n.read ? "Lida" : "Não lida"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
