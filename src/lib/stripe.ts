import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  if (!stripe) {
    stripe = new Stripe(key, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }
  return stripe;
}

export function getMonthlyPriceId(): string {
  const id = process.env.STRIPE_PRICE_ID_MONTHLY;
  if (!id) throw new Error("Missing STRIPE_PRICE_ID_MONTHLY");
  return id;
}

export function getAppUrl(requestUrl?: string): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (requestUrl) {
    try {
      return new URL(requestUrl).origin;
    } catch {
      /* fall through */
    }
  }
  return "http://localhost:5173";
}
