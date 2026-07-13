import { createFileRoute } from "@tanstack/react-router";
import { requireUserFromRequest } from "@/lib/api-auth";
import { getSupabaseServiceClient } from "@/lib/supabase-server";
import { lookupSchemeWithClaude } from "@/lib/scheme-lookup";

const MAX_LOOKUPS_PER_HOUR = 20;

export const Route = createFileRoute("/api/models/lookup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const auth = await requireUserFromRequest(request);
          if ("error" in auth) return auth.error;
          const { user } = auth;

          const body = (await request.json().catch(() => ({}))) as {
            query?: string;
            notes?: string;
          };
          const query = body.query?.trim() ?? "";
          if (query.length < 2) {
            return Response.json({ error: "Enter a model or scheme to look up" }, { status: 400 });
          }
          if (query.length > 200) {
            return Response.json({ error: "Query is too long" }, { status: 400 });
          }

          const admin = getSupabaseServiceClient();
          const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
          const { count, error: countError } = await admin
            .from("model_lookup_events")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id)
            .gte("created_at", since);

          if (countError) {
            return Response.json({ error: countError.message }, { status: 500 });
          }
          if ((count ?? 0) >= MAX_LOOKUPS_PER_HOUR) {
            return Response.json(
              { error: "Lookup limit reached (20 per hour). Try again later." },
              { status: 429 },
            );
          }

          await admin.from("model_lookup_events").insert({ user_id: user.id });

          const draft = await lookupSchemeWithClaude(query, body.notes);
          return Response.json({ draft, query });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Lookup failed";
          const status = message.includes("ANTHROPIC_API_KEY") ? 503 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
