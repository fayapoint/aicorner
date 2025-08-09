import Link from "next/link";

export function FeatureLocked({ title, reason }: { title: string; reason?: string }) {
  return (
    <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-900">
      <div className="font-medium">{title} indisponível</div>
      <div className="text-sm mt-1">
        {reason || "Este recurso está bloqueado para o seu plano atual."}
      </div>
      <div className="mt-2 text-sm">
        <Link href="/planos" className="underline underline-offset-2">
          Ver planos e upgrades
        </Link>
      </div>
    </div>
  );
}
