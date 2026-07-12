import { createFileRoute } from "@tanstack/react-router";
import { getAppUrl, getStripe } from "@/lib/stripe";
import { getSupabaseServiceClient, getSupabaseUserClient } from "@/lib/supabase-server";

export const Route = createFileRoute("/api/stripe/portal")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const auth = request.headers.get("Authorization");
          const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
          if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const supabase = getSupabaseUserClient(token);
          const { data, error: userError } = await supabase.auth.getUser(token);
          if (userError || !data.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const admin = getSupabaseServiceClient();
          const stripe = await getStripe();
          const appUrl = getAppUrl(request.url);

          const { data: profile, error } = await admin
            .from("profiles")
            .select("stripe_customer_id")
            .eq("id", data.user.id)
            .single();

          if (error || !profile?.stripe_customer_id) {
            return Response.json(
              { error: "No billing customer found. Start a trial first." },
              { status: 400 },
            );
          }

          const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${appUrl}/bench`,
          });

          return Response.json({ url: session.url });
        } catch (err) {
          console.error("portal error", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "Portal failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
