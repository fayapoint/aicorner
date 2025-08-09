import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { getUssDb } from "@/lib/uss/mongo";

export const dynamic = "force-dynamic";

const COLLECTION = "arena_profiles";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "content-type": "application/json" } });
  }
  const email = session.user.email;
  const db = await getUssDb();
  const doc = await db.collection(COLLECTION).findOne({ email });
  const profile = doc ?? { email, level: 1, xp: 0, coins: 0, achievements: [] as string[], updatedAt: new Date() };
  return new Response(JSON.stringify(profile), { status: 200, headers: { "content-type": "application/json" } });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "content-type": "application/json" } });
  }
  const email = session.user.email;
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  const { level, xp, coins, achievements } = body || {};
  if (
    typeof level !== "number" ||
    typeof xp !== "number" ||
    typeof coins !== "number" ||
    !Array.isArray(achievements)
  ) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  const db = await getUssDb();
  await db.collection(COLLECTION).updateOne(
    { email },
    { $set: { email, level, xp, coins, achievements, updatedAt: new Date() } },
    { upsert: true }
  );
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
}
