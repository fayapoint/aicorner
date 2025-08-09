"use client";

export function ExporterPanel() {
  return (
    <div className="space-y-3">
      <div className="mb-2 text-sm opacity-80">Exporter</div>
      <div className="rounded border border-white/10 bg-white/5 p-3">
        <div className="text-xs opacity-70">Pacotes de exportação</div>
        <ul className="mt-2 list-disc pl-5 opacity-90">
          <li>Exportar posts (CSV) — em breve</li>
          <li>Exportar analytics (JSON) — em breve</li>
          <li>Backup completo — em breve</li>
        </ul>
      </div>
    </div>
  );
}
