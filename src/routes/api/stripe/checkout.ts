import { createFileRoute } from "@tanstack/react-router";
import { getAppUrl, getMonthlyPriceId, getStripe } from "@/lib/stripe";
import { getSupabaseServiceClient, getSupabaseUserClient } from "@/lib/supabase-server";

async function requireUserFromRequest(request: Request) {
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

export const Route = createFileRoute("/api/stripe/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const auth = await requireUserFromRequest(request);
          if ("error" in auth && auth.error) return auth.error;
          const { user } = auth as { user: { id: string; email?: string } };

          const admin = getSupabaseServiceClient();
          const stripe = await getStripe();
          const priceId = getMonthlyPriceId();
          const appUrl = getAppUrl(request.url);

          const { data: profile, error: profileError } = await admin
            .from("profiles")
            .select("id, email, access_tier, stripe_customer_id")
            .eq("id", user.id)
            .single();

          if (profileError || !profile) {
            return Response.json({ error: "Profile not found" }, { status: 404 });
          }

          if (profile.access_tier === "complimentary") {
            return Response.json(
              { error: "Complimentary accounts do not need a subscription" },
              { status: 400 },
            );
          }

          let customerId = profile.stripe_customer_id as string | null;
          if (!customerId) {
            const customer = await stripe.customers.create({
              email: profile.email ?? user.email ?? undefined,
              metadata: { supabase_user_id: user.id },
            });
            customerId = customer.id;
            await admin
              .from("profiles")
              .update({ stripe_customer_id: customerId })
              .eq("id", user.id);
          }

          const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            line_items: [{ price: priceId, quantity: 1 }],
            subscription_data: {
              trial_period_days: 7,
              metadata: { supabase_user_id: user.id },
            },
            metadata: { supabase_user_id: user.id },
            success_url: `${appUrl}/bench?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/bench?checkout=cancel`,
            allow_promotion_codes: true,
          });

          if (!session.url) {
            return Response.json(
              { error: "Stripe did not return a checkout URL" },
              { status: 500 },
            );
          }

          return Response.json({ url: session.url });
        } catch (err) {
          console.error("checkout error", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "Checkout failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
