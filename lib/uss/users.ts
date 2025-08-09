import type { Db } from "mongodb";

const USER_COLLECTION_CANDIDATES = [
  "users",
  "Users",
  "user",
  "User",
  "profiles",
  "Profiles",
];

export async function findUssUserByEmail(db: Db, email: string) {
  const collections = await db.listCollections().toArray();
  const names = new Set(collections.map((c) => c.name));

  for (const name of USER_COLLECTION_CANDIDATES) {
    if (!names.has(name)) continue;
    const doc = await db.collection(name).findOne({ email });
    if (doc) return { collection: name, doc };
  }

  // Fallback: scan any collection containing a likely user structure
  for (const c of collections) {
    if (!/user/i.test(c.name)) continue;
    const doc = await db.collection(c.name).findOne({ email });
    if (doc) return { collection: c.name, doc };
  }

  return null;
}

export function getUssUserId(ussUserDoc: any): string | undefined {
  if (!ussUserDoc) return undefined;
  const raw = ussUserDoc._id ?? ussUserDoc.id ?? ussUserDoc.userId ?? ussUserDoc.userID;
  if (!raw) return undefined;
  try {
    return typeof raw === "string" ? raw : raw.toString?.() ?? String(raw);
  } catch {
    return String(raw);
  }
}
