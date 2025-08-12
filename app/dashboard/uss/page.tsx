import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { buildUssUserSummary } from "@/lib/uss/summary";
import { getUssAccess } from "@/lib/authz";

// Force dynamic rendering to prevent SSG context issues
export const dynamic = 'force-dynamic';

export default async function UssHubPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const embed = searchParams?.embed === "1" || searchParams?.embed === "true";

  if (!email) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-2">USS Hub</h1>
        <p className="text-sm text-red-600">Você não está autenticado.</p>
      </div>
    );
  }

  const [summary, access] = await Promise.all([
    buildUssUserSummary(email),
    getUssAccess(session),
  ]);

  return (
    <div className={embed ? "space-y-4 p-2" : "space-y-8"}>
      {!embed && (
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">USS Hub</h1>
          <p className="text-sm text-gray-600">Perfil: {email}</p>
        </header>
      )}

      <section className="space-y-3">
        {!embed && <h2 className="text-lg font-medium">Acesso rápido</h2>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            href="/dashboard/uss/scheduler"
            title="Agendador"
            desc="Calendário e filas de publicação"
            locked={!access.features.postsScheduler}
            embed={embed}
          />
          <FeatureCard
            href="/dashboard/uss/analytics"
            title="Analytics"
            desc="KPIs e relatórios"
            locked={!access.features.analytics}
            embed={embed}
          />
          <FeatureCard
            href="/dashboard/uss/settings"
            title="Configurações"
            desc="Preferências e integrações"
            locked={!access.features.settings}
            embed={embed}
          />
          <FeatureCard
            href="/dashboard/uss/personas"
            title="Personas"
            desc="Perfis de conteúdo"
            locked={!access.features.personas}
            embed={embed}
          />
          <FeatureCard
            href="/dashboard/uss/notifications"
            title="Notificações"
            desc="Alertas e updates"
            locked={!access.features.notifications}
            embed={embed}
          />
        </div>
      </section>

      {summary.missingUser ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-800">
          <div className="font-medium mb-1">Usuário não encontrado na base USS</div>
          <div className="text-sm">
            Não localizamos um registro correspondente na base USS. Após validarmos o schema real, podemos provisionar o
            usuário automaticamente nesta etapa.
          </div>
        </div>
      ) : (
        <section className="space-y-2">
          {!embed && <h2 className="text-lg font-medium">Usuário USS</h2>}
          <div className={embed ? "rounded-md border p-4 bg-white/5 backdrop-blur" : "rounded-md border bg-white p-4 shadow-sm"}>
            <div className="text-sm text-gray-600">Coleção: {summary.userCollection || "(desconhecida)"}</div>
            <div className="text-sm text-gray-600">USS User ID: {summary.ussUserId || "(indisponível)"}</div>
            {summary.userDoc ? (
              <pre className="mt-3 max-h-64 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-800">
                {JSON.stringify(summary.userDoc, null, 2)}
              </pre>
            ) : null}
          </div>
        </section>
      )}

      <section className="space-y-3">
        {!embed && <h2 className="text-lg font-medium">Coleções relacionadas</h2>}
        {summary.collections.length === 0 ? (
          <div className="text-sm text-gray-500">Nenhum documento relacionado encontrado.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {summary.collections.map((c) => (
              <div key={c.collection} className="rounded-md border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.collection}</div>
                  <div className="text-sm text-gray-500">Total: {c.total}</div>
                </div>
                {c.sample?.length ? (
                  <pre className="mt-3 max-h-48 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-800">
                    {JSON.stringify(c.sample, null, 2)}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FeatureCard({ href, title, desc, locked, embed }: { href: string; title: string; desc: string; locked?: boolean; embed?: boolean }) {
  const inner = (
    <div
      className={
        "block rounded-lg border border-gray-200 bg-white/60 transition p-4 shadow-sm " +
        (locked ? "opacity-60 cursor-not-allowed" : "hover:bg-white")
      }
    >
      <div className="flex items-center gap-2">
        <div className="font-medium">{title}</div>
        {locked ? <span className="text-xs rounded bg-gray-200 px-1.5 py-0.5">Bloqueado</span> : null}
      </div>
      <div className="text-sm text-gray-500">{desc}</div>
    </div>
  );
  return locked ? (
    <div>{inner}</div>
  ) : (
    <Link href={embed ? (href.includes("?") ? `${href}&embed=1` : `${href}?embed=1`) : href} className="block">
      {inner}
    </Link>
  );
}
