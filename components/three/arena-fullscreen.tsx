"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ArenaCanvas from "./arena-canvas";
import type { FeatureFlags, Tier } from "@/lib/tier";

export default function ArenaFullscreen({
  user,
  tier,
  features,
}: {
  user: { name?: string | null; email?: string | null };
  tier: Tier;
  features: FeatureFlags;
}) {
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[500] bg-gradient-to-b from-[#0a0b10] via-[#0a0b10] to-[#090a14]">
      {/* Top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[510] flex items-center justify-between p-3">
        <div className="pointer-events-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-100 hover:bg-white/20"
            aria-label="Voltar ao dashboard"
          >
            ← Voltar
          </button>
        </div>
        <div className="pointer-events-none text-xs text-white/60 select-none">
          Arena • Modo imersivo
        </div>
        <div className="w-[72px]" />
      </div>

      <div className="h-full w-full p-3">
        <div className="h-full w-full">
          <ArenaCanvas user={user} tier={tier} features={features} heightClass="h-full" />
        </div>
      </div>
    </div>
  );
}
