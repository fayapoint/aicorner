import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";
import { buildUssUserSummary } from "@/lib/uss/summary";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const summary = await buildUssUserSummary(session.user.email);
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to build summary", message: err?.message || String(err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
