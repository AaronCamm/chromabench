import { createFileRoute } from "@tanstack/react-router";
import { getStripe } from "@/lib/stripe";
import { upsertSubscriptionFromStripe } from "@/lib/stripe-webhook";
import { getSupabaseServiceClient, getSupabaseUserClient } from "@/lib/supabase-server";

export const Route = createFileRoute("/api/stripe/sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const auth = request.headers.get("Authorization");
          const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
          if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const userClient = getSupabaseUserClient(token);
          const { data: userData, error: userError } = await userClient.auth.getUser(token);
          if (userError || !userData.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const userId = userData.user.id;
          const admin = getSupabaseServiceClient();
          const stripe = await getStripe();

          const body = (await request.json().catch(() => ({}))) as { sessionId?: string };

          if (body.sessionId) {
            const session = await stripe.checkout.sessions.retrieve(body.sessionId, {
              expand: ["subscription"],
            });
            const metaUser = session.metadata?.supabase_user_id;
            if (metaUser && metaUser !== userId) {
              return Response.json({ error: "Session does not belong to this user" }, { status: 403 });
            }

            if (session.subscription) {
              const sub =
                typeof session.subscription === "string"
                  ? await stripe.subscriptions.retrieve(session.subscription)
                  : session.subscription;
              sub.metadata = {
                ...sub.metadata,
                supabase_user_id: userId,
              };
              await upsertSubscriptionFromStripe(sub);
              return Response.json({ ok: true, status: sub.status });
            }
          }

          const { data: profile } = await admin
            .from("profiles")
            .select("stripe_customer_id")
            .eq("id", userId)
            .maybeSingle();

          if (!profile?.stripe_customer_id) {
            return Response.json({ ok: false, status: null, error: "No Stripe customer" }, { status: 404 });
          }

          const list = await stripe.subscriptions.list({
            customer: profile.stripe_customer_id,
            status: "all",
            limit: 5,
          });

          const preferred =
            list.data.find((s) => s.status === "trialing" || s.status === "active") ?? list.data[0];

          if (!preferred) {
            return Response.json({ ok: false, status: null });
          }

          preferred.metadata = {
            ...preferred.metadata,
            supabase_user_id: userId,
          };
          await upsertSubscriptionFromStripe(preferred);
          return Response.json({ ok: true, status: preferred.status });
        } catch (err) {
          console.error("stripe sync error", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "Sync failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
