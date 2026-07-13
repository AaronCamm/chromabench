import { createFileRoute } from "@tanstack/react-router";
import { requireUserFromRequest, slugifyId } from "@/lib/api-auth";
import { getSupabaseServiceClient } from "@/lib/supabase-server";
import { draftSources, type SchemeLookupDraft } from "@/lib/scheme-lookup";
import { verifyCitationUrl } from "@/lib/citation-verify";
import { hasPaidAccess, type Profile, type Subscription } from "@/lib/types";

export const Route = createFileRoute("/api/models/confirm")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const auth = await requireUserFromRequest(request);
          if ("error" in auth) return auth.error;
          const { user } = auth;

          const body = (await request.json().catch(() => ({}))) as {
            draft?: SchemeLookupDraft;
            query?: string;
          };
          const draft = body.draft;
          if (!draft?.modelName || !draft?.schemeName) {
            return Response.json({ error: "Missing scheme draft" }, { status: 400 });
          }
          if (!Array.isArray(draft.colors) || draft.colors.length === 0) {
            return Response.json(
              { error: "Cannot confirm a scheme with no colour callouts" },
              { status: 400 },
            );
          }

          const admin = getSupabaseServiceClient();
          const [{ data: profile }, { data: subscription }] = await Promise.all([
            admin.from("profiles").select("*").eq("id", user.id).maybeSingle(),
            admin
              .from("subscriptions")
              .select("*")
              .eq("user_id", user.id)
              .in("status", ["trialing", "active"])
              .order("updated_at", { ascending: false })
              .limit(1)
              .maybeSingle(),
          ]);

          if (!hasPaidAccess(profile as Profile | null, subscription as Subscription | null)) {
            return Response.json(
              { error: "Active trial or subscription required" },
              { status: 403 },
            );
          }

          const modelId = slugifyId(draft.modelName);
          const schemeId = slugifyId(`${modelId}-${draft.schemeName}`);

          // Re-verify citation server-side so clients can't save unchecked URLs.
          // needs_review is allowed when the user explicitly included the link after opening it.
          if (draft.citedUrl) {
            const citation = await verifyCitationUrl(draft.citedUrl, draft, body.query);
            draft.citedUrl =
              citation.status === "verified" || citation.status === "needs_review"
                ? citation.url
                : undefined;
          }

          const sources = draftSources(draft);
          // Always ensure User Added is first
          if (!sources.some((s) => s.label === "User Added")) {
            sources.unshift({ label: "User Added" });
          }

          const { error: modelError } = await admin.from("community_models").upsert(
            {
              id: modelId,
              name: draft.modelName.trim(),
              category: draft.category ?? "aircraft",
              aliases: draft.aliases ?? [],
              created_by: user.id,
            },
            { onConflict: "id", ignoreDuplicates: true },
          );

          if (modelError) {
            return Response.json({ error: modelError.message }, { status: 500 });
          }

          // If model already existed from another user, ignoreDuplicates left it alone — fine.
          // Ensure row exists for FK (in case ignoreDuplicates skipped and row missing somehow)
          const { data: existingModel } = await admin
            .from("community_models")
            .select("id")
            .eq("id", modelId)
            .maybeSingle();

          if (!existingModel) {
            const { error: insertModelError } = await admin.from("community_models").insert({
              id: modelId,
              name: draft.modelName.trim(),
              category: draft.category ?? "aircraft",
              aliases: draft.aliases ?? [],
              created_by: user.id,
            });
            if (insertModelError) {
              return Response.json({ error: insertModelError.message }, { status: 500 });
            }
          }

          const { error: schemeError } = await admin.from("community_schemes").insert({
            id: schemeId,
            model_id: modelId,
            name: draft.schemeName.trim(),
            operator: draft.operator ?? null,
            unit: draft.unit ?? null,
            year: draft.year ?? null,
            buno: draft.buno ?? null,
            colors: draft.colors,
            sources,
            query_text: body.query?.trim() || null,
            created_by: user.id,
          });

          if (schemeError) {
            if (schemeError.code === "23505") {
              return Response.json(
                { error: "This scheme was already added", modelId, schemeId },
                { status: 409 },
              );
            }
            return Response.json({ error: schemeError.message }, { status: 500 });
          }

          return Response.json({ modelId, schemeId });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Confirm failed";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
