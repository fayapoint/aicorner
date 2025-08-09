"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import type { FeatureFlags, Tier } from "@/lib/tier";
import { AnalyticsPanel } from "../uss/panels/analytics-panel";
import { SchedulerPanel } from "../uss/panels/scheduler-panel";
import { SettingsPanel } from "../uss/panels/settings-panel";
import { PersonasPanel } from "../uss/panels/personas-panel";
import { NotificationsPanel } from "../uss/panels/notifications-panel";
import { ExporterPanel } from "../uss/panels/exporter-panel";

type Props = {
  user: { name?: string | null; email?: string | null };
  tier: Tier;
  features: FeatureFlags;
  heightClass?: string;
};

// Feature flag: disable legacy random-panel autoplay and use immersive game instead
const ENABLE_LEGACY_AUTOPLAY = false;

function Rotator({ children, speed = 0.1 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<any>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function FeatureOrb({
  label,
  enabled,
  position,
  onClick,
  hue = 280,
  dim = false,
  selected = false,
}: {
  label: string;
  enabled: boolean;
  position: [number, number, number];
  onClick?: () => void;
  hue?: number;
  dim?: boolean;
  selected?: boolean;
}) {
  const color = `hsl(${hue}, 80%, ${enabled ? 60 : 25}%)`;
  const emissive = new THREE.Color().setHSL(hue / 360, 0.7, enabled ? 0.35 : 0.08);

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4} position={position}>
      <mesh onClick={enabled ? onClick : undefined} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={enabled ? 0.6 : 0.15} roughness={0.3} metalness={0.2} opacity={dim ? 0.3 : 1} transparent={dim} />
      </mesh>
      {selected && (
        <mesh>
          <torusGeometry args={[0.85, 0.035, 16, 64]} />
          <meshStandardMaterial color="#e879f9" emissive="#a855f7" emissiveIntensity={0.6} opacity={dim ? 0.2 : 0.8} transparent />
        </mesh>
      )}
      {!enabled && (
        <mesh>
          <torusGeometry args={[0.8, 0.06, 16, 64]} />
          <meshStandardMaterial color="#ffffff" opacity={dim ? 0.05 : 0.2} transparent />
        </mesh>
      )}
      {!dim && (
        <Html center distanceFactor={8} wrapperClass="pointer-events-none">
          <div className={`text-xs md:text-sm px-2 py-1 rounded-md border backdrop-blur ${enabled ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200" : "border-white/10 bg-white/5 text-gray-300"}`}>
            {label}
          </div>
        </Html>
      )}
    </Float>
  );
}

// Subtle emoji burst for feedback (reduced by default)
function EmojiBurst({ center = [0, 1, 0], emoji = "✨", count = 3 }: { center?: [number, number, number]; emoji?: string; count?: number }) {
  const nodes = useMemo(() => new Array(count).fill(0).map((_, i) => ({
    offset: (i / count) * Math.PI * 2,
    radius: 0.2 + Math.random() * 0.6,
    height: 0.2 + Math.random() * 0.8,
    speed: 0.5 + Math.random() * 1.2,
  })), [count]);
  return (
    <group position={center as any}>
      {nodes.map((n, idx) => (
        <Float key={idx} speed={n.speed} rotationIntensity={0.4} floatIntensity={0.8} position={[Math.cos(n.offset) * n.radius, n.height, Math.sin(n.offset) * n.radius] as any}>
          <Html center wrapperClass="pointer-events-none">
            <div className="text-xl select-none">{emoji}</div>
          </Html>
        </Float>
      ))}
    </group>
  );
}

// Buddy with basic behaviors
type AvatarBehavior = "idle" | "point" | "patrol";
function CharacterBuddy({ name, emoji, behavior, target, patrolSpeed = 1, patrolRadius = 2 }: { name?: string | null; emoji: string; behavior: AvatarBehavior; target?: [number, number, number]; patrolSpeed?: number; patrolRadius?: number }) {
  const group = useRef<any>(null);
  const theta = useRef(0);
  useFrame((_, delta) => {
    if (!group.current) return;
    if (behavior === "point" && target) {
      const v = new THREE.Vector3(target[0], target[1], target[2]);
      group.current.lookAt(v);
    }
    if (behavior === "patrol") {
      theta.current += delta * patrolSpeed;
      const r = patrolRadius;
      group.current.position.set(Math.cos(theta.current) * r, 0, Math.sin(theta.current) * r);
    } else {
      // Keep near origin when not patrolling
      group.current.position.set(0, 0, 0);
    }
  });
  return (
    <group ref={group}>
      <Float speed={behavior === "idle" ? 1.1 : 1.4} rotationIntensity={behavior === "patrol" ? 0.5 : 0.2} floatIntensity={1.2} position={[0, 1.4, 0] as any}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
        </mesh>
        <Html center distanceFactor={10}>
          <div className="text-3xl select-none" title={name ?? undefined}>{emoji}</div>
        </Html>
      </Float>
    </group>
  );
}

// Immersive AutoPlay overlay that drives real Arena actions
function AutoPlayGame({
  aiSpeed,
  items,
  actionsMap,
  onOpenTarget,
  onAct,
  onCloseTarget,
  onReward,
  onStop,
}: {
  aiSpeed: number;
  items: { key: string; label: string; emoji?: string; enabled: boolean }[];
  actionsMap: Record<string, string[]>;
  onOpenTarget: (key: string) => void;
  onAct: (key: string, action: string) => void;
  onCloseTarget: () => void;
  onReward: (reward: { xp: number; coins?: number; note?: string }) => void;
  onStop: () => void;
}) {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [combo, setCombo] = useState(0);
  const [targetIdx, setTargetIdx] = useState(0);
  const [currentAction, setCurrentAction] = useState<string>("");

  // Open initial target when starting
  useEffect(() => {
    if (items.length > 0) onOpenTarget(items[0].key);
  }, []);

  // Tick loop: advance progress and trigger Arena actions
  useEffect(() => {
    if (paused || items.length === 0) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const inc = 8 * Math.max(0.5, aiSpeed);
        const np = p + inc;
        const tgt = items[targetIdx % items.length];
        const opts = actionsMap[tgt.key] || ["home"];
        if (np >= 100) {
          // Commit a major step on completion and rotate target
          const act = opts[Math.floor(Math.random() * opts.length)];
          setCurrentAction(act);
          onAct(tgt.key, act);
          const coin = Math.random() < 0.33 ? 1 : 0;
          const base = 10 + Math.floor(combo * 2);
          onReward({ xp: base, coins: coin, note: `${tgt.label}/${act}` });
          setCombo((c) => Math.min(10, c + 1));
          onCloseTarget();
          const next = (targetIdx + 1) % items.length;
          setTargetIdx(next);
          const nextTgt = items[next];
          onOpenTarget(nextTgt.key);
          return 0;
        }
        // Mid-step micro actions
        if (Math.random() < 0.18) {
          const act = opts[Math.floor(Math.random() * opts.length)];
          setCurrentAction(act);
          onAct(tgt.key, act);
          onReward({ xp: 3, note: `${tgt.label}/${act}` });
        }
        return np;
      });
    }, 350);
    return () => clearInterval(id);
  }, [paused, aiSpeed, items, targetIdx, actionsMap, onAct, onReward, onCloseTarget, onOpenTarget]);

  const tgt = items.length ? items[targetIdx % items.length] : undefined;
  return (
    <div className="pointer-events-auto">
      <div className="sr-only">AutoPlay Game</div>
      <div className="relative">
        {/* Backdrop glow behind the card */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.20),transparent_60%)]" />
          <div className="absolute -top-10 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        {/* Glass neon card */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-3 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
          <div className="h-[65vh] w-[85vw] max-w-[1200px] rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                <span className="text-lg">🎮</span>
                <span className="opacity-90">AutoPlay em andamento</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPaused((p) => !p)} className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">
                  {paused ? "Retomar" : "Pausar"}
                </button>
                <button onClick={onStop} className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">
                  Sair do AutoPlay
                </button>
              </div>
            </div>

            {/* Mission strip */}
            {tgt ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  <span className="text-2xl drop-shadow">{tgt.emoji ?? "✨"}</span>
                  <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-[12px] uppercase tracking-wider text-fuchsia-200">Missão</span>
                  <span className="opacity-90">{tgt.label}</span>
                  {currentAction && (
                    <span className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[12px] opacity-80">Etapa: {currentAction}</span>
                  )}
                </div>

                {/* Progress bar with segments */}
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_0_1px,transparent_1px)] bg-[length:24px_100%] opacity-40" />
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 shadow-[0_0_20px_rgba(244,114,182,0.45)] transition-all"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[12px] opacity-90">
                  <span>Velocidade: <span className="text-fuchsia-300">{aiSpeed.toFixed(1)}x</span></span>
                  <span>Combo: <span className="text-fuchsia-300">{combo}</span></span>
                  <span>Status: <span className="text-fuchsia-300">{paused ? "Pausado" : "Ativo"}</span></span>
                </div>

                {/* Action buttons */}
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {(actionsMap[tgt.key] || ["home"]).slice(0, 6).map((act) => (
                    <button
                      key={act}
                      onClick={() => {
                        onAct(tgt.key, act);
                        onReward({ xp: 4, coins: Math.random() < 0.15 ? 1 : 0, note: `${tgt.label}/${act} (assist)` });
                        setCombo((c) => Math.min(10, c + 1));
                        setCurrentAction(act);
                      }}
                      className="rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-center text-[13px] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(167,139,250,0.25)]"
                    >
                      {act}
                    </button>
                  ))}
                </div>

                {/* Upcoming targets preview */}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] opacity-80">
                  <span className="mr-1 opacity-70">Próximos:</span>
                  {items.slice(1, 4).map((it) => (
                    <span key={it.key} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      <span>{it.emoji ?? "✨"}</span>
                      <span className="opacity-80">{it.label}</span>
                    </span>
                  ))}
                </div>

                <div className="opacity-70 text-[11px]">
                  Dica: use Assist para acelerar a missão e aumentar o combo para mais XP.
                </div>
              </div>
            ) : (
              <div className="opacity-70">Nenhuma missão disponível.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArenaCanvas({ user, tier, features, heightClass }: Props) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  // Local in-canvas panel state (no iframes / no URL navigations)
  const [panel, setPanel] = useState<{ view?: string; tab?: string; focus?: string; filter?: string }>({});
  const [log, setLog] = useState<string[]>([]);
  const [avatarEmoji, setAvatarEmoji] = useState<string>("🧑‍🚀");
  const [avatarBehavior, setAvatarBehavior] = useState<AvatarBehavior>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ down: false, x: 0, y: 0 });
  const [fxEnabled, setFxEnabled] = useState(false);
  const [patrolSpeed, setPatrolSpeed] = useState(1.0);
  const [patrolRadius, setPatrolRadius] = useState(2.0);
  const canInteract = !openPanel && !isDragging;
  const sceneState = openPanel ? "panel" : isDragging ? "explore" : "idle";

  // Gameloop state
  const [level, setLevel] = useState<number>(1);
  const [xp, setXp] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [aiSpeed, setAiSpeed] = useState<number>(1.0); // multiplier
  const lastActivity = useRef<number>(Date.now());
  // Sync control (max 2 writes per session)
  const syncsUsed = useRef(0);
  const syncing = useRef(false);

  // Persistence
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("arena_progress") || "null");
      if (saved) {
        setLevel(saved.level ?? 1);
        setXp(saved.xp ?? 0);
        setCoins(saved.coins ?? 0);
        setAchievements(Array.isArray(saved.achievements) ? saved.achievements : []);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(
        "arena_progress",
        JSON.stringify({ level, xp, coins, achievements })
      );
    } catch {}
  }, [level, xp, coins, achievements]);

  // Load remote profile (merge with local) and schedule a mid-session sync
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/arena/profile', { method: 'GET', cache: 'no-store' });
        if (!res.ok) return;
        const remote = await res.json();
        if (cancelled) return;
        // Merge strategy: prefer higher stats and union achievements
        setLevel((lv) => Math.max(lv, Number(remote.level ?? 1)));
        setXp((xp0) => {
          const rxp = Number(remote.xp ?? 0);
          const nx = Math.max(xp0, rxp);
          return Number.isFinite(nx) ? nx : xp0;
        });
        setCoins((c) => Math.max(c, Number(remote.coins ?? 0)));
        setAchievements((a) => {
          const arr: string[] = Array.isArray(remote.achievements) ? remote.achievements : [];
          const set = new Set<string>([...a, ...arr]);
          return Array.from(set).slice(0, 50);
        });
        setLog((l) => ['☁️ Progresso carregado do servidor', ...l].slice(0, 30));
      } catch (e: any) {
        setLog((l) => [`⚠️ Falha ao carregar perfil: ${e?.message || String(e)}`, ...l].slice(0, 30));
      }
    })();
    // Mid-session sync after 60s of activity
    const mid = setTimeout(() => {
      if (document.visibilityState !== 'hidden') maybeSync('meio da sessão');
    }, 60000);
    return () => { cancelled = true; clearTimeout(mid); };
  }, []);

  // Final sync on tab hide/unload (keepalive)
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        maybeSync('final', { keepalive: true });
      }
    };
    const onBeforeUnload = () => {
      maybeSync('final', { keepalive: true });
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  const nextLevelXp = (lv: number) => Math.floor(60 * lv * 1.3);
  const grantAchievement = (name: string) => {
    setAchievements((a) => (a.includes(name) ? a : [name, ...a].slice(0, 20)));
    setLog((l) => [`🏆 Conquista: ${name}`, ...l].slice(0, 30));
  };
  const addXp = (amount: number, reason?: string) => {
    if (reason) setLog((l) => [`+${amount} XP · ${reason}`, ...l].slice(0, 30));
    setXp((cur) => {
      let nxp = cur + amount;
      let lv = level;
      let leveled = false;
      while (nxp >= nextLevelXp(lv)) {
        nxp -= nextLevelXp(lv);
        lv += 1;
        leveled = true;
      }
      if (leveled) {
        setLevel(lv);
        const bonus = 20 * lv;
        setCoins((c) => c + bonus);
        setLog((l) => [`⬆️ Level ${lv}! +${bonus} moedas`, ...l].slice(0, 30));
        grantAchievement(`Level ${lv}`);
      }
      return nxp;
    });
  };

  const addCoins = (amount: number, reason?: string) => {
    if (amount > 0) {
      setCoins((c) => c + amount);
      setLog((l) => [`+${amount} moedas${reason ? ` · ${reason}` : ""}`, ...l].slice(0, 30));
    }
  };

  // Server sync helpers
  const buildProfile = () => ({ level, xp, coins, achievements });
  const syncProfile = async (reason: string, opts?: { keepalive?: boolean }) => {
    if (syncsUsed.current >= 2 || syncing.current) return;
    try {
      syncing.current = true;
      setLog((l) => [`⇅ Sync (${reason})…`, ...l].slice(0, 30));
      const res = await fetch('/api/arena/profile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(buildProfile()),
        // Keepalive allows the request to finish during unload
        keepalive: opts?.keepalive === true,
      } as RequestInit);
      if (res.ok) {
        syncsUsed.current += 1;
        setLog((l) => [`✅ Sync salvo (${syncsUsed.current}/2)`, ...l].slice(0, 30));
      } else {
        setLog((l) => [`⚠️ Sync falhou: ${res.status}`, ...l].slice(0, 30));
      }
    } catch (e: any) {
      setLog((l) => [`⚠️ Sync erro: ${e?.message || String(e)}`, ...l].slice(0, 30));
    } finally {
      syncing.current = false;
    }
  };
  const maybeSync = (reason: string, opts?: { keepalive?: boolean }) => {
    if (syncsUsed.current >= 2) {
      setLog((l) => [`⏭️ Limite de sync atingido`, ...l].slice(0, 30));
      return;
    }
    syncProfile(reason, opts);
  };

  // Map features to 3D positions and in-world panel URLs
  const items = useMemo(
    () => [
      { key: "postsScheduler", label: "Scheduler", enabled: features.postsScheduler, pos: [-3, 0.8, -1], url: "/dashboard/uss/scheduler?embed=1", hue: 290, emoji: "📅" },
      { key: "analytics", label: "Analytics", enabled: features.analytics, pos: [0, 1.2, -2.5], url: "/dashboard/uss/analytics?embed=1", hue: 260, emoji: "📈" },
      { key: "settings", label: "Settings", enabled: features.settings, pos: [3, 0.8, -1], url: "/dashboard/uss/settings?embed=1", hue: 220, emoji: "⚙️" },
      { key: "personas", label: "Personas", enabled: features.personas, pos: [-1.8, 0.6, 1.5], url: "/dashboard/uss/personas?embed=1", hue: 320, emoji: "🧠" },
      { key: "notifications", label: "Notifications", enabled: features.notifications, pos: [1.8, 0.6, 1.5], url: "/dashboard/uss/notifications?embed=1", hue: 190, emoji: "🔔" },
      { key: "exporter", label: "Exporter", enabled: features.exporter, pos: [0, 0.5, 0.8], url: "/dashboard/uss?embed=1", hue: 150, emoji: "📦" },
    ],
    [features]
  );

  const selectedItem = useMemo(() => items.find((i) => i.key === openPanel) || null, [items, openPanel]);

  // Canonical action sets for each feature (used by autoplay and HUD buttons)
  const actionsMap = useMemo<Record<string, string[]>>(
    () => ({
      postsScheduler: ["queue", "calendar", "create"],
      analytics: ["overview", "engagement", "growth"],
      settings: ["integrations", "preferences"],
      personas: ["list", "create"],
      notifications: ["unread", "all"],
      exporter: ["home"],
    }),
    []
  );

  const doPanelAction = (key: string, pick: string) => {
    if (key === "settings") setPanel({ tab: pick });
    else if (key === "analytics") setPanel({ focus: pick });
    else if (key === "notifications") setPanel({ filter: pick });
    else setPanel({ view: pick });
  };
  const selectItem = (key: string | null) => {
    if (!key) {
      setOpenPanel(null);
      setPanel({});
      setLog((l) => ["Fechou painel.", ...l].slice(0, 30));
      setAvatarBehavior("idle");
      return;
    }
    const it = items.find((i) => i.key === key);
    if (it) {
      setOpenPanel(key);
      setPanel({});
      setLog((l) => [`Abriu ${it.label}.`, ...l].slice(0, 30));
      setAvatarBehavior("point");
      addXp(10, `Explorou ${it.label}`);
      if (Math.random() < 0.15) setCoins((c) => c + 1);
      grantAchievement("Explorador I");
    }
  };

  // Close panel with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openPanel) selectItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openPanel]);

  // User activity listeners to pause/resume AI
  useEffect(() => {
    const touch = (e: Event) => {
      lastActivity.current = Date.now();
      // If interaction happened inside the autoplay overlay, do NOT pause
      const overlay = document.getElementById('autoplay-overlay');
      const target = e.target as Node | null;
      if (overlay && target && overlay.contains(target)) return;
      if (autoPlay) {
        setAutoPlay(false);
        setLog((l)=>['⛔ AI pausada (atividade do usuário)', ...l].slice(0,30));
      }
    };
    const touchPassive = () => { lastActivity.current = Date.now(); };
    window.addEventListener('pointerdown', touch, { passive: true } as any);
    window.addEventListener('wheel', touch, { passive: true } as any);
    window.addEventListener('keydown', touch, { passive: true } as any);
    window.addEventListener('mousemove', touchPassive, { passive: true } as any);
    const chk = setInterval(()=>{
      if (!autoPlay && Date.now() - lastActivity.current > 8000) {
        setAutoPlay(true);
        setLog((l)=>['🤖 AI iniciada (inatividade)', ...l].slice(0,30));
      }
    }, 1000);
    return () => {
      window.removeEventListener('pointerdown', touch as any);
      window.removeEventListener('wheel', touch as any);
      window.removeEventListener('keydown', touch as any);
      window.removeEventListener('mousemove', touchPassive as any);
      clearInterval(chk);
    };
  }, [autoPlay]);

  // When AutoPlay starts, close panels and prep avatar
  useEffect(() => {
    if (autoPlay) {
      if (openPanel) setOpenPanel(null);
      setAvatarBehavior("idle");
      grantAchievement("Autoplay iniciado");
    }
  }, [autoPlay, openPanel]);

  // AI Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    if (!ENABLE_LEGACY_AUTOPLAY) return;
    let alive = true;
    const step = () => {
      if (!alive) return;
      const enabledItems = items.filter((i) => i.enabled);
      if (enabledItems.length === 0) return;
      if (!openPanel) {
        const choice = enabledItems[Math.floor(Math.random() * enabledItems.length)];
        selectItem(choice.key);
      } else if (selectedItem) {
        // Perform contextual action
        const key = selectedItem.key;
        const actions: Record<string, string[]> = {
          postsScheduler: ["queue", "calendar", "create"],
          analytics: ["overview", "engagement", "growth"],
          settings: ["integrations", "preferences"],
          personas: ["list", "create"],
          notifications: ["unread", "all"],
          exporter: ["home"],
        };
        const opts = actions[key] || ["home"];
        const pick = opts[Math.floor(Math.random() * opts.length)];
        if (key === "settings") setPanel({ tab: pick });
        else if (key === "analytics") setPanel({ focus: pick });
        else if (key === "notifications") setPanel({ filter: pick });
        else setPanel({ view: pick });
        addXp(6, `AI ação: ${selectedItem.label}/${pick}`);
        // Occasionally switch focus
        if (Math.random() < 0.25) selectItem(null);
      }
      const delay = 2000 / Math.max(0.2, aiSpeed);
      setTimeout(step, delay);
    };
    const t = setTimeout(step, 1200);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [autoPlay, aiSpeed, items, openPanel, selectedItem]);

  return (
    <div className={`relative ${heightClass ?? 'h-[70vh]'} w-full overflow-hidden rounded-xl border border-white/10 bg-black/30`}>
      {/* Overlay HUD */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 backdrop-blur">
        <div className="opacity-90">Bem-vindo(a){user.name ? `, ${user.name}` : user.email ? `, ${user.email}` : ""}</div>
        <div className="opacity-60">Tier: {tier}</div>
        <div className="opacity-60">Arraste para orbitar, role para zoom</div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 3.5, 6.5], fov: 55 }}
        dpr={[1, 1.75]}
        onPointerDown={(e) => {
          drag.current.down = true;
          // @ts-ignore
          drag.current.x = (e.clientX ?? 0);
          // @ts-ignore
          drag.current.y = (e.clientY ?? 0);
        }}
        onPointerMove={(e) => {
          if (!drag.current.down) return;
          // @ts-ignore
          const dx = (e.clientX ?? 0) - drag.current.x;
          // @ts-ignore
          const dy = (e.clientY ?? 0) - drag.current.y;
          if (Math.hypot(dx, dy) > 5) setIsDragging(true);
        }}
        onPointerUp={() => {
          drag.current.down = false;
          setTimeout(() => setIsDragging(false), 0);
        }}
        onPointerCancel={() => {
          drag.current.down = false;
          setIsDragging(false);
        }}
        onPointerMissed={() => {
          // Ignore empty clicks to avoid breaking state when there's nothing to do
        }}
      >
        <color attach="background" args={["#0a0b10"]} />
        <fog attach="fog" args={["#0a0b10", 8, 18]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <spotLight position={[-6, 8, 2]} intensity={0.8} angle={0.4} penumbra={0.3} />

        <OrbitControls enabled={!openPanel && !autoPlay} enableDamping dampingFactor={0.08} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Sparkles count={28} scale={12} size={1.6} speed={0.35} color="#c084fc" />
        </Suspense>

        {/* Ground */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#0f1020" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Central ring */}
        <Rotator>
          <mesh position={[0, 0.2, 0]} castShadow>
            <torusGeometry args={[2.4, 0.07, 32, 200]} />
            <meshStandardMaterial color="#6d28d9" metalness={0.6} roughness={0.25} emissive="#4c1d95" emissiveIntensity={0.3} />
          </mesh>
        </Rotator>

        {/* Buddy character */}
        <CharacterBuddy name={user.name} emoji={avatarEmoji} behavior={avatarBehavior} target={selectedItem ? (selectedItem.pos as [number, number, number]) : undefined} patrolSpeed={patrolSpeed} patrolRadius={patrolRadius} />

        {/* Feature orbs */}
        {items.map((it) => (
          <FeatureOrb
            key={it.key}
            label={it.label}
            enabled={it.enabled}
            position={it.pos as [number, number, number]}
            hue={it.hue}
            dim={!!openPanel && openPanel !== it.key}
            selected={openPanel === it.key}
            onClick={!openPanel && !isDragging && !autoPlay && it.enabled ? () => selectItem(it.key) : undefined}
          />
        ))}

        {/* Emoji bursts when opening panels */}
        {fxEnabled && openPanel && (
          <EmojiBurst center={[0, 1.2, 0] as any} emoji={items.find((i) => i.key === openPanel)?.emoji ?? "✨"} count={3} />
        )}
      </Canvas>

      {/* Immersive AutoPlay overlay (drives real Arena actions) */}
      {autoPlay ? (
        <div id="autoplay-overlay" className="pointer-events-none absolute inset-0 z-20">
          {/* Cinematic scrim */}
          <div className="pointer-events-none absolute inset-0 bg-black/50" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.35),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.25),transparent_60%)]" />
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative w-[90vw] max-w-[1200px] rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
              <div className="sr-only">AutoPlay HUD</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold opacity-90">AutoPlay: Executando</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAutoPlay(false)} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Pausar</button>
                  <button onClick={() => setAiSpeed(aiSpeed + 0.1)} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Aumentar Velocidade</button>
                  <button onClick={() => setAiSpeed(aiSpeed - 0.1)} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Diminuir Velocidade</button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="text-sm opacity-70">Progresso:</div>
                <div className="w-full rounded bg-white/10">
                  <div className="h-2 rounded bg-fuchsia-400/70" style={{ width: `${Math.min(100, (xp / Math.max(1, nextLevelXp(level))) * 100)}%` }} />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.filter((i) => i.enabled).map((it) => (
                  <div key={it.key} className="rounded border border-white/10 bg-white/10 px-2 py-1">
                    <div className="text-sm opacity-70">{it.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="text-sm opacity-70">Próximos Alvos:</div>
                <div className="flex flex-wrap gap-2">
                  {items.filter((i) => i.enabled).map((it) => (
                    <div key={it.key} className="rounded border border-white/10 bg-white/10 px-2 py-1">
                      <div className="text-sm opacity-70">{it.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="text-sm opacity-70">Ações:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem?.key === "postsScheduler" && (
                    <>
                      <button onClick={() => { setPanel({ view: "queue" }); setLog((l)=>["Ação: Fila", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Fila</button>
                      <button onClick={() => { setPanel({ view: "calendar" }); setLog((l)=>["Ação: Calendário", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Calendário</button>
                      <button onClick={() => { setPanel({ view: "create" }); setLog((l)=>["Ação: Criar", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Criar</button>
                    </>
                  )}
                  {selectedItem?.key === "analytics" && (
                    <>
                      <button onClick={() => { setPanel({ focus: "overview" }); setLog((l)=>["Ação: Visão geral", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Visão geral</button>
                      <button onClick={() => { setPanel({ focus: "engagement" }); setLog((l)=>["Ação: Engajamento", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Engajamento</button>
                      <button onClick={() => { setPanel({ focus: "growth" }); setLog((l)=>["Ação: Crescimento", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Crescimento</button>
                    </>
                  )}
                  {selectedItem?.key === "settings" && (
                    <>
                      <button onClick={() => { setPanel({ tab: "integrations" }); setLog((l)=>["Ação: Integrações", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Integrações</button>
                      <button onClick={() => { setPanel({ tab: "preferences" }); setLog((l)=>["Ação: Preferências", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Preferências</button>
                    </>
                  )}
                  {selectedItem?.key === "personas" && (
                    <>
                      <button onClick={() => { setPanel({ view: "list" }); setLog((l)=>["Ação: Personas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Lista</button>
                      <button onClick={() => { setPanel({ view: "create" }); setLog((l)=>["Ação: Nova persona", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Nova</button>
                    </>
                  )}
                  {selectedItem?.key === "notifications" && (
                    <>
                      <button onClick={() => { setPanel({ filter: "unread" }); setLog((l)=>["Ação: Não lidas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Não lidas</button>
                      <button onClick={() => { setPanel({ filter: "all" }); setLog((l)=>["Ação: Todas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Todas</button>
                    </>
                  )}
                </div>
              </div>
              <AutoPlayGame
                aiSpeed={aiSpeed}
                items={items.filter((i) => i.enabled)}
                actionsMap={actionsMap}
                onOpenTarget={(key) => {
                  if (openPanel !== key) selectItem(key);
                  setAvatarBehavior('point');
                }}
                onAct={(key, action) => {
                  doPanelAction(key, action);
                  const lbl = items.find((i) => i.key === key)?.label || key;
                  addXp(6, `AI: ${lbl}/${action}`);
                }}
                onCloseTarget={() => {
                  selectItem(null);
                  setAvatarBehavior('idle');
                }}
                onReward={({ xp, coins, note }) => {
                  addXp(xp, note);
                  if (coins) addCoins(coins, note);
                }}
                onStop={() => setAutoPlay(false)}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Holographic panel overlay (hidden during AutoPlay to avoid overlap) */}
      {openPanel && !autoPlay ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto">
            <div className="sr-only">Painel holográfico</div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-fuchsia-500/10 blur-2xl" />
              <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-2">
                <div className="h-[65vh] w-[85vw] max-w-[1200px] rounded-xl border border-white/10 bg-white/5 p-3">
                  {/* Header */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-semibold opacity-90">{selectedItem?.label}</div>
                  </div>
                  {/* Body */}
                  <div className="min-h-0 overflow-auto rounded border border-white/10 bg-white/5 p-3 text-sm">
                    {selectedItem?.key === "postsScheduler" && (
                      <SchedulerPanel view={panel.view ?? "home"} />
                    )}
                    {selectedItem?.key === "analytics" && (
                      <AnalyticsPanel focus={panel.focus ?? "overview"} />
                    )}
                    {selectedItem?.key === "settings" && (
                      <SettingsPanel tab={panel.tab ?? "integrations"} />
                    )}
                    {selectedItem?.key === "personas" && (
                      <PersonasPanel view={panel.view ?? "list"} />
                    )}
                    {selectedItem?.key === "notifications" && (
                      <NotificationsPanel filter={panel.filter ?? "unread"} />
                    )}
                    {selectedItem?.key === "exporter" && (
                      <ExporterPanel />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => selectItem(null)}
                  className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                >
                  Fechar ✖️
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    {/* Bottom-left HUD: status and controls */}
    <div className="absolute bottom-3 left-3 z-10 w-[320px] max-w-[90vw] rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-gray-200 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium">
          {autoPlay ? 'AutoPlay: executando' : (openPanel ? `Foco: ${selectedItem?.label}` : "Idle")}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
          <div className="rounded border border-white/10 bg-white/5 p-2">
            <div className="opacity-70">Level</div>
            <div className="text-sm font-semibold">{level}</div>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-2">
            <div className="opacity-70">XP</div>
            <div className="text-sm font-semibold">{xp}/{nextLevelXp(level)}</div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-white/10">
              <div className="h-full bg-fuchsia-400/70" style={{ width: `${Math.min(100, (xp / Math.max(1, nextLevelXp(level))) * 100)}%` }} />
            </div>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-2">
            <div className="opacity-70">Moedas</div>
            <div className="text-sm font-semibold">🪙 {coins}</div>
          </div>
        </div>

        {!openPanel && !autoPlay && (
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wide opacity-70">Dicas</div>
            <div className="mt-1 text-[11px] opacity-80">Clique em um orbe habilitado para abrir um painel. Arraste para orbitar. Pressione Esc para fechar.</div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button onClick={()=> setAutoPlay((v)=>{ const nv=!v; setLog((l)=>[nv?"🤖 AutoPlay: on":"⏸️ AutoPlay: off", ...l].slice(0,30)); return nv; })} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">
            {autoPlay ? 'Pausar AI' : 'Iniciar AI'}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-70">Velocidade AI</span>
            <input type="range" min={0.4} max={3} step={0.1} value={aiSpeed} onChange={(e)=> setAiSpeed(parseFloat(e.target.value))} className="w-28" />
          </div>
          <label className="inline-flex items-center gap-1">
            <input type="checkbox" checked={fxEnabled} onChange={(e)=>{ setFxEnabled(e.target.checked); setLog((l)=>[`FX Emoji: ${e.target.checked ? 'on' : 'off'}`, ...l].slice(0,30)); }} />
            <span className="opacity-80">FX Emoji</span>
          </label>
          <Link href="/dashboard" className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">← Dashboard</Link>
          <button onClick={()=>{ setLevel(1); setXp(0); setCoins(0); setAchievements([]); setLog((l)=>['🗑️ Progresso resetado', ...l].slice(0,30)); maybeSync('reset'); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Reset</button>
        </div>
        {openPanel ? (
          <div className="mt-2 space-y-2">
            <div className="text-[10px] uppercase tracking-wide opacity-70">Ações</div>
            <div className="flex flex-wrap gap-2">
              {selectedItem?.key === "postsScheduler" && (
                <>
                  <button onClick={() => { setPanel({ view: "queue" }); setLog((l)=>["Ação: Fila", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Fila</button>
                  <button onClick={() => { setPanel({ view: "calendar" }); setLog((l)=>["Ação: Calendário", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Calendário</button>
                  <button onClick={() => { setPanel({ view: "create" }); setLog((l)=>["Ação: Criar", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Criar</button>
                </>
              )}
              {selectedItem?.key === "analytics" && (
                <>
                  <button onClick={() => { setPanel({ focus: "overview" }); setLog((l)=>["Ação: Visão geral", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Visão geral</button>
                  <button onClick={() => { setPanel({ focus: "engagement" }); setLog((l)=>["Ação: Engajamento", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Engajamento</button>
                  <button onClick={() => { setPanel({ focus: "growth" }); setLog((l)=>["Ação: Crescimento", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Crescimento</button>
                </>
              )}
              {selectedItem?.key === "settings" && (
                <>
                  <button onClick={() => { setPanel({ tab: "integrations" }); setLog((l)=>["Ação: Integrações", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Integrações</button>
                  <button onClick={() => { setPanel({ tab: "preferences" }); setLog((l)=>["Ação: Preferências", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Preferências</button>
                </>
              )}
              {selectedItem?.key === "personas" && (
                <>
                  <button onClick={() => { setPanel({ view: "list" }); setLog((l)=>["Ação: Personas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Lista</button>
                  <button onClick={() => { setPanel({ view: "create" }); setLog((l)=>["Ação: Nova persona", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Nova</button>
                </>
              )}
              {selectedItem?.key === "notifications" && (
                <>
                  <button onClick={() => { setPanel({ filter: "unread" }); setLog((l)=>["Ação: Não lidas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Não lidas</button>
                  <button onClick={() => { setPanel({ filter: "all" }); setLog((l)=>["Ação: Todas", ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Todas</button>
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-3 space-y-2">
          <div className="text-[10px] uppercase tracking-wide opacity-70">Avatar</div>
          <div className="flex items-center gap-2">
            <select value={avatarEmoji} onChange={(e)=>{ setAvatarEmoji(e.target.value); setLog((l)=>[`Avatar: ${e.target.value}`, ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1">
              {['🧑‍🚀','🤖','🧙‍♂️','🦊','🐼','🐸','👩‍🚀'].map(em => <option key={em} value={em}>{em}</option>)}
            </select>
            <select value={avatarBehavior} onChange={(e)=>{ setAvatarBehavior(e.target.value as AvatarBehavior); setLog((l)=>[`Avatar modo: ${e.target.value}`, ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1">
              <option value="idle">Idle</option>
              <option value="point">Apontar</option>
              <option value="patrol">Patrulhar</option>
            </select>
            {openPanel ? (
              <button onClick={()=>{ setAvatarBehavior('point'); setLog((l)=>['Avatar: apontar alvo', ...l].slice(0,30)); }} className="rounded border border-white/10 bg-white/10 px-2 py-1 hover:bg-white/20">Apontar alvo</button>
            ) : null}
          </div>
          {avatarBehavior === 'patrol' && (
            <div className="mt-2 flex items-center gap-2">
              <label className="text-[10px] opacity-70">Velocidade</label>
              <input type="range" min={0.3} max={3} step={0.1} value={patrolSpeed} onChange={(e)=>{ const v=parseFloat(e.target.value); setPatrolSpeed(v); setLog((l)=>[`Patrulha velocidade: ${v.toFixed(1)}`, ...l].slice(0,30)); }} className="w-24" />
              <label className="text-[10px] opacity-70">Raio</label>
              <input type="range" min={0.5} max={4} step={0.1} value={patrolRadius} onChange={(e)=>{ const v=parseFloat(e.target.value); setPatrolRadius(v); setLog((l)=>[`Patrulha raio: ${v.toFixed(1)}`, ...l].slice(0,30)); }} className="w-24" />
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="text-[10px] uppercase tracking-wide opacity-70 mb-1">Eventos</div>
          <div className="max-h-28 overflow-auto rounded border border-white/10 bg-white/5 p-2 text-[11px] leading-snug">
            {log.length === 0 ? <div className="opacity-60">Sem eventos ainda.</div> : log.map((line, i)=> (
              <div key={i} className="opacity-90">• {line}</div>
            ))}
          </div>
          {achievements.length > 0 && (
            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-wide opacity-70 mb-1">Conquistas</div>
              <div className="flex flex-wrap gap-1">
                {achievements.slice(0,8).map((a, idx)=> (
                  <span key={idx} className="rounded border border-white/10 bg-white/10 px-2 py-0.5 text-[10px]">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
