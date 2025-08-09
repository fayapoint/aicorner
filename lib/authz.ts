import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { buildUssUserSummary } from "@/lib/uss/summary";
import { resolveTier, featuresForTier, type FeatureFlags, type Tier } from "@/lib/tier";

export interface AccessContext {
  session: any | null;
  email?: string;
  tier: Tier;
  features: FeatureFlags;
  ussUserId?: string;
  ussUserDoc?: any;
}

export async function getUssAccess(sessionArg?: any): Promise<AccessContext> {
  const session = sessionArg ?? (await getServerSession(authOptions));
  const email = session?.user?.email ?? undefined;

  if (!session || !email) {
    return { session, email, tier: "free", features: featuresForTier("free") };
  }

  const summary = await buildUssUserSummary(email);
  const tier = resolveTier(session, summary.userDoc);
  const features = featuresForTier(tier);

  return {
    session,
    email,
    tier,
    features,
    ussUserId: summary.ussUserId,
    ussUserDoc: summary.userDoc,
  };
}
