import { createFileRoute } from "@tanstack/react-router";
import { getStripe } from "@/lib/stripe";
import { markSubscriptionCanceled, upsertSubscriptionFromStripe } from "@/lib/stripe-webhook";
import type Stripe from "stripe";

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const stripe = await getStripe();
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
          return new Response("Webhook secret not configured", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing stripe-signature", { status: 400 });
        }

        const rawBody = await request.text();
        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(rawBody, signature, secret);
        } catch (err) {
          console.error("Stripe webhook signature verification failed", err);
          return new Response("Invalid signature", { status: 400 });
        }

        try {
          switch (event.type) {
            case "checkout.session.completed": {
              const session = event.data.object as Stripe.Checkout.Session;
              if (session.mode === "subscription" && session.subscription) {
                const subId =
                  typeof session.subscription === "string"
                    ? session.subscription
                    : session.subscription.id;
                const subscription = await stripe.subscriptions.retrieve(subId);
                if (session.metadata?.supabase_user_id) {
                  subscription.metadata = {
                    ...subscription.metadata,
                    supabase_user_id: session.metadata.supabase_user_id,
                  };
                }
                await upsertSubscriptionFromStripe(subscription);
              }
              break;
            }
            case "customer.subscription.created":
            case "customer.subscription.updated": {
              await upsertSubscriptionFromStripe(event.data.object as Stripe.Subscription);
              break;
            }
            case "customer.subscription.deleted": {
              const sub = event.data.object as Stripe.Subscription;
              await markSubscriptionCanceled(sub.id);
              break;
            }
            default:
              break;
          }
        } catch (err) {
          console.error("Stripe webhook handler error", err);
          return new Response("Webhook handler failed", { status: 500 });
        }

        return Response.json({ received: true });
      },
    },
  },
});
