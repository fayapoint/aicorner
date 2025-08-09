export type Tier = "free" | "pro" | "enterprise" | "admin";

export type FeatureKey =
  | "postsScheduler"
  | "analytics"
  | "settings"
  | "personas"
  | "notifications"
  | "exporter";

export type FeatureFlags = Record<FeatureKey, boolean>;

const FEATURE_MAP: Record<Tier, FeatureFlags> = {
  free: {
    postsScheduler: true,
    analytics: false,
    settings: true,
    personas: false,
    notifications: true,
    exporter: false,
  },
  pro: {
    postsScheduler: true,
    analytics: true,
    settings: true,
    personas: true,
    notifications: true,
    exporter: true,
  },
  enterprise: {
    postsScheduler: true,
    analytics: true,
    settings: true,
    personas: true,
    notifications: true,
    exporter: true,
  },
  admin: {
    postsScheduler: true,
    analytics: true,
    settings: true,
    personas: true,
    notifications: true,
    exporter: true,
  },
};

function normalizeTier(input?: string | null): Tier | undefined {
  if (!input) return undefined;
  const s = String(input).toLowerCase();
  if (["admin", "owner", "root"].includes(s)) return "admin";
  if (["enterprise", "ent", "corp"].includes(s)) return "enterprise";
  if (["pro", "premium"].includes(s)) return "pro";
  if (["free", "basic", "starter"].includes(s)) return "free";
  return undefined;
}

export function resolveTier(session: any, ussUserDoc?: any): Tier {
  // 1) Session role wins if admin
  const role = session?.user?.role as string | undefined;
  if (normalizeTier(role) === "admin") return "admin";

  // 2) USS document properties
  const doc = ussUserDoc || {};
  const 
    tierFromDoc =
      normalizeTier(doc.subscriptionTier) ||
      normalizeTier(doc.SubscriptionTier) ||
      normalizeTier(doc.tier) ||
      normalizeTier(doc.plan) ||
      normalizeTier(doc.accountType);
  if (tierFromDoc) return tierFromDoc;

  // 3) Session role mapping
  const tierFromRole = normalizeTier(role);
  if (tierFromRole) return tierFromRole;

  // Default
  return "free";
}

export function featuresForTier(tier: Tier): FeatureFlags {
  return FEATURE_MAP[tier];
}

export function hasFeature(tier: Tier, feature: FeatureKey): boolean {
  return !!FEATURE_MAP[tier]?.[feature];
}
