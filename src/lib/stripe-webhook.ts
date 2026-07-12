import type Stripe from "stripe";
import { getSupabaseServiceClient } from "@/lib/supabase-server";

function toIso(unix: number | null | undefined): string | null {
  if (!unix) return null;
  return new Date(unix * 1000).toISOString();
}

async function resolveUserId(subscription: Stripe.Subscription): Promise<string | null> {
  const fromMeta = subscription.metadata?.supabase_user_id;
  if (fromMeta) return fromMeta;

  const admin = getSupabaseServiceClient();
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;

  const { data } = await admin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return data?.id ?? null;
}

export async function upsertSubscriptionFromStripe(subscription: Stripe.Subscription) {
  const userId = await resolveUserId(subscription);
  if (!userId) {
    console.error("No user for Stripe subscription", subscription.id);
    return;
  }

  const admin = getSupabaseServiceClient();
  const item = subscription.items.data[0];
  const priceId = item?.price?.id ?? null;
  // Stripe API 2025+: period end lives on subscription items
  const periodEnd =
    item?.current_period_end ??
    (subscription as Stripe.Subscription & { current_period_end?: number }).current_period_end;

  await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: priceId,
      status: subscription.status,
      trial_end: toIso(subscription.trial_end),
      current_period_end: toIso(periodEnd),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;

  await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", userId);
}

export async function markSubscriptionCanceled(subscriptionId: string) {
  const admin = getSupabaseServiceClient();
  await admin
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId);
}
