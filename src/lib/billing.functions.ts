import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAppUrl, getMonthlyPriceId, getStripe } from "@/lib/stripe";
import { getSupabaseServiceClient, getSupabaseUserClient } from "@/lib/supabase-server";

const authInput = z.object({
  accessToken: z.string().min(1),
});

async function requireUser(accessToken: string) {
  const supabase = getSupabaseUserClient(accessToken);
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    throw new Error("Unauthorized");
  }
  return { supabase, user: data.user };
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => authInput.parse(data))
  .handler(async ({ data }) => {
    const { user } = await requireUser(data.accessToken);
    const admin = getSupabaseServiceClient();
    const stripe = getStripe();
    const priceId = getMonthlyPriceId();
    const appUrl = getAppUrl();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, email, access_tier, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile not found");
    }

    if (profile.access_tier === "complimentary") {
      throw new Error("Complimentary accounts do not need a subscription");
    }

    let customerId = profile.stripe_customer_id as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile.email ?? user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
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
      success_url: `${appUrl}/?checkout=success#tool`,
      cancel_url: `${appUrl}/?checkout=cancel#tool`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return { url: session.url };
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => authInput.parse(data))
  .handler(async ({ data }) => {
    const { user } = await requireUser(data.accessToken);
    const admin = getSupabaseServiceClient();
    const stripe = getStripe();
    const appUrl = getAppUrl();

    const { data: profile, error } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (error || !profile?.stripe_customer_id) {
      throw new Error("No billing customer found. Start a trial first.");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${appUrl}/#tool`,
    });

    return { url: session.url };
  });
