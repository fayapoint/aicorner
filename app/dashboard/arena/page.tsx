import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { getUssAccess } from "@/lib/authz";
import type { FeatureFlags, Tier } from "@/lib/tier";
import ArenaFullscreen from "@/components/three/arena-fullscreen";

export const dynamic = "force-dynamic";

interface SafeAccessProps {
  user: { name?: string | null; email?: string | null };
  tier: Tier;
  features: FeatureFlags;
}

export default async function ArenaPage() {
  const session = await getServerSession(authOptions);
  const access = await getUssAccess(session);

  const props: SafeAccessProps = {
    user: { name: access.session?.user?.name ?? null, email: access.session?.user?.email ?? null },
    tier: access.tier,
    features: access.features,
  };

  return <ArenaFullscreen {...props} />;
}
