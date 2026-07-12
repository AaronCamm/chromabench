import type Stripe from "stripe";

let stripePromise: Promise<Stripe> | null = null;

function readEnv(name: string): string | undefined {
  // Vite/Nitro may expose secrets on process.env; Cloudflare/Vercel bindings too.
  return process.env[name] ?? (import.meta as ImportMeta & { env?: Record<string, string> }).env?.[name];
}

export async function getStripe(): Promise<Stripe> {
  const key = readEnv("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  if (!stripePromise) {
    stripePromise = import("stripe").then(({ default: Stripe }) => {
      return new Stripe(key, {
        apiVersion: "2026-06-24.dahlia",
        typescript: true,
      });
    });
  }
  return stripePromise;
}

export function getMonthlyPriceId(): string {
  const id = readEnv("STRIPE_PRICE_ID_MONTHLY");
  if (!id) throw new Error("Missing STRIPE_PRICE_ID_MONTHLY");
  return id;
}

export function getAppUrl(requestUrl?: string): string {
  const configured = readEnv("APP_URL");
  if (configured) return configured.replace(/\/$/, "");
  if (requestUrl) {
    try {
      return new URL(requestUrl).origin;
    } catch {
      /* fall through */
    }
  }
  return "http://localhost:5173";
}
