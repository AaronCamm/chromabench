import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import { hasPaidAccess, type FavouriteRecipe, type Profile, type Subscription } from "@/lib/types";
import { createCheckoutSession, createPortalSession } from "@/lib/billing.functions";

/* Context modules export hooks alongside the provider. */
/* eslint-disable react-refresh/only-export-components */

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  favourites: FavouriteRecipe[];
  hasAccess: boolean;
  refreshAccess: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  startCheckout: () => Promise<void>;
  openBillingPortal: () => Promise<void>;
  saveFavourite: (input: {
    kind: "mixer" | "finder";
    title?: string;
    payload: FavouriteRecipe["payload"];
  }) => Promise<{ error: string | null }>;
  deleteFavourite: (id: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [loading, setLoading] = useState(configured);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [favourites, setFavourites] = useState<FavouriteRecipe[]>([]);

  const refreshAccess = useCallback(async () => {
    if (!configured) return;
    const supabase = getSupabaseBrowserClient();
    const {
      data: { session: current },
    } = await supabase.auth.getSession();
    setSession(current);

    if (!current?.user) {
      setProfile(null);
      setSubscription(null);
      setFavourites([]);
      return;
    }

    const userId = current.user.id;

    const [profileRes, subRes, favRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .in("status", ["trialing", "active"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("favourite_recipes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    ]);

    setProfile((profileRes.data as Profile | null) ?? null);
    setSubscription((subRes.data as Subscription | null) ?? null);
    setFavourites((favRes.data as FavouriteRecipe[] | null) ?? []);
  }, [configured]);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const supabase = getSupabaseBrowserClient();

    (async () => {
      await refreshAccess();
      if (mounted) setLoading(false);
    })();

    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange(async () => {
      await refreshAccess();
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      authSub.unsubscribe();
    };
  }, [configured, refreshAccess]);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setProfile(null);
    setSubscription(null);
    setFavourites([]);
    setSession(null);
  }, []);

  const startCheckout = useCallback(async () => {
    if (!session?.access_token) throw new Error("Sign in required");
    const { url } = await createCheckoutSession({
      data: { accessToken: session.access_token },
    });
    window.location.href = url;
  }, [session]);

  const openBillingPortal = useCallback(async () => {
    if (!session?.access_token) throw new Error("Sign in required");
    const { url } = await createPortalSession({
      data: { accessToken: session.access_token },
    });
    window.location.href = url;
  }, [session]);

  const saveFavourite = useCallback(
    async (input: {
      kind: "mixer" | "finder";
      title?: string;
      payload: FavouriteRecipe["payload"];
    }) => {
      if (!session?.user) return { error: "Sign in required" };
      if (!hasPaidAccess(profile, subscription)) {
        return { error: "Active trial or subscription required" };
      }
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("favourite_recipes").insert({
        user_id: session.user.id,
        kind: input.kind,
        title: input.title ?? null,
        payload: input.payload,
      });
      if (!error) await refreshAccess();
      return { error: error?.message ?? null };
    },
    [session, profile, subscription, refreshAccess],
  );

  const deleteFavourite = useCallback(
    async (id: string) => {
      const supabase = getSupabaseBrowserClient();
      await supabase.from("favourite_recipes").delete().eq("id", id);
      await refreshAccess();
    },
    [refreshAccess],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      configured,
      loading,
      session,
      user: session?.user ?? null,
      profile,
      subscription,
      favourites,
      hasAccess: hasPaidAccess(profile, subscription),
      refreshAccess,
      signIn,
      signUp,
      signOut,
      startCheckout,
      openBillingPortal,
      saveFavourite,
      deleteFavourite,
    }),
    [
      configured,
      loading,
      session,
      profile,
      subscription,
      favourites,
      refreshAccess,
      signIn,
      signUp,
      signOut,
      startCheckout,
      openBillingPortal,
      saveFavourite,
      deleteFavourite,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
