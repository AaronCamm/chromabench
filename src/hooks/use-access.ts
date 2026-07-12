import { useAuth } from "@/contexts/auth-context";

/** Access helper: complimentary OR active/trialing Stripe subscription. */
export function useAccess() {
  const { configured, loading, user, hasAccess, profile, subscription } = useAuth();
  return {
    configured,
    loading,
    signedIn: Boolean(user),
    hasAccess,
    isComplimentary: profile?.access_tier === "complimentary",
    subscriptionStatus: subscription?.status ?? null,
    trialEnd: subscription?.trial_end ?? null,
  };
}
