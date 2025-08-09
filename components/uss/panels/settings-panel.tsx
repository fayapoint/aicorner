"use client";

export function SettingsPanel({ tab = "integrations" }: { tab?: "integrations" | "preferences" | string }) {
  return (
    <div className="space-y-3">
      <div className="opacity-80">Configurações · aba: <span className="font-mono">{String(tab)}</span></div>
      {tab === "integrations" && (
        <div className="rounded border border-white/10 bg-white/5 p-3 space-y-2">
          <div className="text-xs opacity-70">Integrações conectadas</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
              <span>Twitter/X</span>
              <input type="checkbox" disabled defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
              <span>Instagram</span>
              <input type="checkbox" disabled />
            </label>
            <label className="flex items-center justify-between gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
              <span>LinkedIn</span>
              <input type="checkbox" disabled />
            </label>
          </div>
          <div className="text-xs opacity-60">Conexões reais em breve.</div>
        </div>
      )}
      {tab === "preferences" && (
        <div className="rounded border border-white/10 bg-white/5 p-3 space-y-2">
          <div className="text-xs opacity-70">Preferências</div>
          <label className="flex items-center justify-between gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
            <span>Idioma: Português</span>
            <select disabled className="rounded border border-white/10 bg-white/10 px-2 py-1">
              <option>Português</option>
              <option>English</option>
            </select>
          </label>
          <label className="flex items-center justify-between gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
            <span>Fuso horário</span>
            <select disabled className="rounded border border-white/10 bg-white/10 px-2 py-1">
              <option>GMT-3</option>
            </select>
          </label>
          <div className="text-xs opacity-60">Configurações persistentes em breve.</div>
        </div>
      )}
    </div>
  );
}
