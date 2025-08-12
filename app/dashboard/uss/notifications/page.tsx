import { getUssAccess } from "@/lib/authz";
import { FeatureLocked } from "@/components/uss/feature-locked";

// Force dynamic rendering to prevent SSG context issues
export const dynamic = 'force-dynamic';

export default async function UssNotificationsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const access = await getUssAccess();
  const embed = searchParams?.embed === "1" || searchParams?.embed === "true";

  if (!access.session || !access.email) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-2">Notificações</h1>
        <p className="text-sm text-red-600">Você não está autenticado.</p>
      </div>
    );
  }

  if (!access.features.notifications) {
    return <FeatureLocked title="Notificações" />;
  }

  return (
    <div className={embed ? "space-y-3 p-2" : "space-y-4"}>
      {!embed && <h1 className="text-2xl font-semibold">Notificações</h1>}
      <p className="text-sm text-gray-600">Em breve: central de alertas, status e mensagens do USS.</p>
    </div>
  );
}
