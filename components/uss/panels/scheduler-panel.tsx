"use client";

export function SchedulerPanel({ view = "home" }: { view?: string }) {
  return (
    <div className="space-y-3">
      <div className="opacity-80">Scheduler · view: <span className="font-mono">{view}</span></div>
      {view === "queue" && (
        <div className="space-y-2">
          <div className="text-xs opacity-70">Fila de postagens</div>
          <div className="rounded border border-white/10 bg-white/5 p-2">
            <div className="opacity-80">Nenhuma postagem na fila.</div>
          </div>
        </div>
      )}
      {view === "calendar" && (
        <div className="space-y-2">
          <div className="text-xs opacity-70">Calendário</div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({length: 14}).map((_,i)=> (
              <div key={i} className="h-16 rounded border border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      )}
      {view === "create" && (
        <div className="space-y-2">
          <div className="text-xs opacity-70">Criar postagem</div>
          <div className="rounded border border-white/10 bg-white/5 p-3 space-y-2">
            <input placeholder="Título" className="w-full rounded border border-white/10 bg-black/20 px-2 py-1" />
            <textarea placeholder="Conteúdo" rows={4} className="w-full rounded border border-white/10 bg-black/20 px-2 py-1" />
            <button disabled className="rounded border border-white/10 bg-white/10 px-2 py-1 opacity-60 cursor-not-allowed">Publicar (em breve)</button>
          </div>
        </div>
      )}
      {!["queue","calendar","create"].includes(view) && (
        <div className="opacity-60">Selecione acima: Fila, Calendário ou Criar.</div>
      )}
    </div>
  );
}
