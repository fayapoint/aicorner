"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type GalleryStat = {
  label: string;
  value: string;
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
  badge?: string;
  stats?: GalleryStat[];
};

type GlassGalleryProps = {
  title: string;
  subtitle: string;
  items: GalleryItem[];
  className?: string;
};

type TiltState = {
  rotateX: number;
  rotateY: number;
  gradient: string;
};

const defaultGradient = "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18), transparent 60%)";

function GlassCard({ item }: { item: GalleryItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ rotateX, rotateY, gradient }, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    gradient: defaultGradient,
  });
  const frameRef = useRef<number>();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;
    const nextRotateX = ((rect.height / 2 - relY) / rect.height) * 14;
    const nextRotateY = ((relX - rect.width / 2) / rect.width) * 14;
    const highlightX = (relX / rect.width) * 100;
    const highlightY = (relY / rect.height) * 100;
    const nextGradient = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(168, 85, 247, 0.3), transparent 65%)`;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setTilt({ rotateX: nextRotateX, rotateY: nextRotateY, gradient: nextGradient });
    });
  };

  const resetTilt = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setTilt({ rotateX: 0, rotateY: 0, gradient: defaultGradient });
  };

  const stats = useMemo(() => item.stats ?? [], [item.stats]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl transition-transform duration-300"
      style={{
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        backgroundImage: gradient,
      }}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
      <div className="absolute -inset-px pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/0" />
          {item.badge && (
            <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100 backdrop-blur">
              {item.badge}
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-4 p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{item.title}</h3>
            <p className="text-sm leading-relaxed text-slate-200/80">{item.description}</p>
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-slate-100 shadow-inner"
                >
                  <div className="text-xs uppercase tracking-wide text-white/70">{stat.label}</div>
                  <div className="text-base font-semibold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GlassGallery({ title, subtitle, items, className }: GlassGalleryProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-10 shadow-[0_25px_80px_-30px_rgba(147,51,234,0.5)] backdrop-blur-3xl",
        className
      )}
    >
      <div className="pointer-events-none absolute -top-52 left-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="relative mb-12 flex flex-col gap-4 text-center lg:text-left">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-100 lg:mx-0">
          Highlights
        </span>
        <h2 className="text-4xl font-black text-white drop-shadow-xl md:text-5xl">{title}</h2>
        <p className="text-base text-slate-200/80 md:text-lg">{subtitle}</p>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-3">
        {items.map((item) => (
          <GlassCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
