import { getUssAccess } from "@/lib/authz";
import { FeatureLocked } from "@/components/uss/feature-locked";

export default async function UssSchedulerPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const access = await getUssAccess();
  const embed = searchParams?.embed === "1" || searchParams?.embed === "true";

  if (!access.session || !access.email) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-2">Agendador de Posts</h1>
        <p className="text-sm text-red-600">Você não está autenticado.</p>
      </div>
    );
  }

  if (!access.features.postsScheduler) {
    return <FeatureLocked title="Agendador de Posts" />;
  }

  return (
    <div className={embed ? "space-y-3 p-2" : "space-y-4"}>
      {!embed && <h1 className="text-2xl font-semibold">Agendador de Posts</h1>}
      <p className="text-sm text-gray-600">Em breve: calendário e filas de publicação integradas ao USS.</p>
    </div>
  );
}
