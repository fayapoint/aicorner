import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { getUssAccess } from "@/lib/authz";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function Conta() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Conta</h1>
        <p className="text-sm text-red-600">Você não está autenticado.</p>
      </div>
    );
  }

  const access = await getUssAccess(session);
  const email = access.email || "";
  const name = session.user?.name || email || "Usuário";
  const role = (session.user as any)?.role || "user";
  const tier = access.tier;
  const feat = access.features;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Conta</h1>
        <p className="text-sm text-gray-500">Gerencie seu perfil e sessão</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <div className="font-medium mb-2">Identidade</div>
          <div className="text-sm text-gray-700">Nome: {name}</div>
          <div className="text-sm text-gray-700">Email: {email || "-"}</div>
          <div className="text-sm text-gray-700">Papel: {role}</div>
          <div className="text-sm text-gray-700">Plano/Tier: {tier}</div>
          {access.ussUserId ? (
            <div className="text-xs text-gray-500 mt-1">USS ID: {access.ussUserId}</div>
          ) : null}
          <div className="mt-4"><SignOutButton /></div>
        </div>

        <div className="rounded-md border bg-white p-4 shadow-sm">
          <div className="font-medium mb-2">Recursos por Tier</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <span className="mr-2">{feat.postsScheduler ? "✅" : "🔒"}</span>
              Agendador de Posts
            </li>
            <li>
              <span className="mr-2">{feat.analytics ? "✅" : "🔒"}</span>
              Analytics
            </li>
            <li>
              <span className="mr-2">{feat.settings ? "✅" : "🔒"}</span>
              Configurações
            </li>
            <li>
              <span className="mr-2">{feat.personas ? "✅" : "🔒"}</span>
              Personas
            </li>
            <li>
              <span className="mr-2">{feat.notifications ? "✅" : "🔒"}</span>
              Notificações
            </li>
            <li>
              <span className="mr-2">{feat.exporter ? "✅" : "🔒"}</span>
              Exportação
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
