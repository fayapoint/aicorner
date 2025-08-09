import type { Db } from "mongodb";
import { getUssDb } from "@/lib/uss/mongo";
import { findUssUserByEmail, getUssUserId } from "@/lib/uss/users";

export interface UssCollectionSummary {
  collection: string;
  total: number;
  sample: any[];
}

export interface UssUserSummary {
  email: string;
  userCollection?: string;
  ussUserId?: string;
  userDoc?: any;
  collections: UssCollectionSummary[];
  missingUser: boolean;
}

const NEXTAUTH_SYSTEM_COLLECTIONS = new Set([
  "accounts",
  "sessions",
  "verification_tokens",
]);

function redactDoc(doc: any): any {
  if (!doc || typeof doc !== "object") return doc;
  const deny = new Set([
    "password",
    "passwordHash",
    "hash",
    "accessToken",
    "refreshToken",
    "token",
    "secret",
    "apiKey",
    "apiSecret",
    "clientSecret",
    "privateKey",
    "verificationToken",
  ]);
  const out: any = {};
  for (const [k, v] of Object.entries(doc)) {
    if (k === "_id") {
      out._id = typeof v === "string" ? v : (v as any)?.toString?.() ?? String(v);
      continue;
    }
    if (deny.has(k)) {
      out[k] = "[redacted]";
      continue;
    }
    out[k] = v;
  }
  return out;
}

function buildFilters(ussUserId: string | undefined, email: string) {
  const filters: any[] = [];
  if (ussUserId) {
    filters.push(
      { userId: ussUserId },
      { userID: ussUserId },
      { user_id: ussUserId },
      { ownerId: ussUserId },
      { ownerID: ussUserId },
      { owner_id: ussUserId }
    );
  }
  filters.push({ email }, { userEmail: email });
  return filters.length ? { $or: filters } : {};
}

async function summarizeCollection(db: Db, name: string, filter: any): Promise<UssCollectionSummary | null> {
  try {
    const coll = db.collection(name);
    const total = await coll.countDocuments(filter);
    if (!total) return null;
    const docs = await coll.find(filter).limit(5).toArray();
    return { collection: name, total, sample: docs.map(redactDoc) };
  } catch {
    return null;
  }
}

export async function buildUssUserSummary(email: string): Promise<UssUserSummary> {
  const db = await getUssDb();
  const userRes = await findUssUserByEmail(db, email);
  const ussUserId = getUssUserId(userRes?.doc);

  const collections = await db.listCollections().toArray();
  const summaries: UssCollectionSummary[] = [];
  const filter = buildFilters(ussUserId, email);

  for (const c of collections) {
    const name = c.name;
    if (name.startsWith("system.")) continue;
    if (NEXTAUTH_SYSTEM_COLLECTIONS.has(name)) continue;

    const s = await summarizeCollection(db, name, filter);
    if (s) summaries.push(s);
  }

  const userDocRedacted = userRes?.doc ? redactDoc(userRes.doc) : undefined;
  return {
    email,
    userCollection: userRes?.collection,
    ussUserId,
    userDoc: userDocRedacted,
    collections: summaries,
    missingUser: !userRes,
  };
}
