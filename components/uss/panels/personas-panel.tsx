"use client";

export function PersonasPanel({ view = "list" }: { view?: "list" | "create" | string }) {
  return (
    <div className="space-y-3">
      <div className="opacity-80">Personas · view: <span className="font-mono">{String(view)}</span></div>
      {view === "list" && (
        <div className="rounded border border-white/10 bg-white/5 p-3">
          <div className="text-xs opacity-70 mb-2">Suas personas</div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded border border-white/10 bg-black/20 p-2">
                <div className="font-medium">Persona {i + 1}</div>
                <div className="text-xs opacity-70">Em breve: detalhes e edição.</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "create" && (
        <div className="rounded border border-white/10 bg-white/5 p-3 space-y-2">
          <div className="text-xs opacity-70">Nova persona</div>
          <input placeholder="Nome" className="w-full rounded border border-white/10 bg-black/20 px-2 py-1" />
          <textarea placeholder="Descrição" rows={4} className="w-full rounded border border-white/10 bg-black/20 px-2 py-1" />
          <button disabled className="rounded border border-white/10 bg-white/10 px-2 py-1 opacity-60 cursor-not-allowed">Salvar (em breve)</button>
        </div>
      )}
    </div>
  );
}
