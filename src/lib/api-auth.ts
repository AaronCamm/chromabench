import { getSupabaseUserClient } from "@/lib/supabase-server";
import type { User } from "@supabase/supabase-js";

export async function requireUserFromRequest(
  request: Request,
): Promise<{ user: User; token: string } | { error: Response }> {
  const auth = request.headers.get("Authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const supabase = getSupabaseUserClient(token);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { user: data.user, token };
}

export function slugifyId(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "unknown"
  );
}
