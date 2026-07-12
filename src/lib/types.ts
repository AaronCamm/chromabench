export type AccessTier = "none" | "complimentary";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  access_tier: AccessTier;
  stripe_customer_id: string | null;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string | null;
  status: string;
  trial_end: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type FavouriteKind = "mixer" | "finder";

export type FavouritePaintPart = {
  id: string;
  parts: number;
};

export type FavouritePayload = {
  paints: FavouritePaintPart[];
  hex?: string;
  dE?: number;
  brand?: string;
  targetPaintId?: string;
};

export type FavouriteRecipe = {
  id: string;
  user_id: string;
  kind: FavouriteKind;
  title: string | null;
  payload: FavouritePayload;
  created_at: string;
};

export const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["trialing", "active"]);

export function hasPaidAccess(
  profile: Pick<Profile, "access_tier"> | null | undefined,
  subscription: Pick<Subscription, "status"> | null | undefined,
): boolean {
  if (!profile) return false;
  if (profile.access_tier === "complimentary") return true;
  if (subscription && ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status)) return true;
  return false;
}
