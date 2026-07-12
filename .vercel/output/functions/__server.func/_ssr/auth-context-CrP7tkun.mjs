import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-CrP7tkun.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var browserClient = null;
function isSupabaseConfigured() {
	return Boolean("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidGF0bGlxZmN6Yml4aGJmaWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3Njc3MDksImV4cCI6MjA5OTM0MzcwOX0.XkSoEtVbzDVuyZS1eYAjxvPq6owR8y9oU4atg1ePUMk");
}
function getSupabaseBrowserClient() {
	if (!isSupabaseConfigured()) throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
	if (!browserClient) browserClient = createClient("https://ybtatliqfczbixhbfilt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidGF0bGlxZmN6Yml4aGJmaWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3Njc3MDksImV4cCI6MjA5OTM0MzcwOX0.XkSoEtVbzDVuyZS1eYAjxvPq6owR8y9oU4atg1ePUMk", { auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	} });
	return browserClient;
}
var ACTIVE_SUBSCRIPTION_STATUSES = /* @__PURE__ */ new Set(["trialing", "active"]);
function hasPaidAccess(profile, subscription) {
	if (!profile) return false;
	if (profile.access_tier === "complimentary") return true;
	if (subscription && ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status)) return true;
	return false;
}
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const configured = isSupabaseConfigured();
	const [loading, setLoading] = (0, import_react.useState)(configured);
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [subscription, setSubscription] = (0, import_react.useState)(null);
	const [favourites, setFavourites] = (0, import_react.useState)([]);
	const refreshAccess = (0, import_react.useCallback)(async () => {
		if (!configured) return;
		const supabase = getSupabaseBrowserClient();
		const { data: { session: current } } = await supabase.auth.getSession();
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
			supabase.from("subscriptions").select("*").eq("user_id", userId).in("status", ["trialing", "active"]).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
			supabase.from("favourite_recipes").select("*").eq("user_id", userId).order("created_at", { ascending: false })
		]);
		setProfile(profileRes.data ?? null);
		setSubscription(subRes.data ?? null);
		setFavourites(favRes.data ?? []);
	}, [configured]);
	(0, import_react.useEffect)(() => {
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
		const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(async () => {
			await refreshAccess();
			if (mounted) setLoading(false);
		});
		return () => {
			mounted = false;
			authSub.unsubscribe();
		};
	}, [configured, refreshAccess]);
	const signIn = (0, import_react.useCallback)(async (email, password) => {
		const { error } = await getSupabaseBrowserClient().auth.signInWithPassword({
			email,
			password
		});
		return { error: error?.message ?? null };
	}, []);
	const signUp = (0, import_react.useCallback)(async (email, password) => {
		const { error } = await getSupabaseBrowserClient().auth.signUp({
			email,
			password
		});
		return { error: error?.message ?? null };
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		await getSupabaseBrowserClient().auth.signOut();
		setProfile(null);
		setSubscription(null);
		setFavourites([]);
		setSession(null);
	}, []);
	const startCheckout = (0, import_react.useCallback)(async () => {
		if (!session?.access_token) throw new Error("Sign in required");
		const res = await fetch("/api/stripe/checkout", {
			method: "POST",
			headers: { Authorization: `Bearer ${session.access_token}` }
		});
		const body = await res.json().catch(() => ({}));
		if (!res.ok || !body.url) throw new Error(body.error ?? "Checkout failed");
		window.location.href = body.url;
	}, [session]);
	const openBillingPortal = (0, import_react.useCallback)(async () => {
		if (!session?.access_token) throw new Error("Sign in required");
		const res = await fetch("/api/stripe/portal", {
			method: "POST",
			headers: { Authorization: `Bearer ${session.access_token}` }
		});
		const body = await res.json().catch(() => ({}));
		if (!res.ok || !body.url) throw new Error(body.error ?? "Portal failed");
		window.location.href = body.url;
	}, [session]);
	const saveFavourite = (0, import_react.useCallback)(async (input) => {
		if (!session?.user) return { error: "Sign in required" };
		if (!hasPaidAccess(profile, subscription)) return { error: "Active trial or subscription required" };
		const { error } = await getSupabaseBrowserClient().from("favourite_recipes").insert({
			user_id: session.user.id,
			kind: input.kind,
			title: input.title ?? null,
			payload: input.payload
		});
		if (!error) await refreshAccess();
		return { error: error?.message ?? null };
	}, [
		session,
		profile,
		subscription,
		refreshAccess
	]);
	const deleteFavourite = (0, import_react.useCallback)(async (id) => {
		await getSupabaseBrowserClient().from("favourite_recipes").delete().eq("id", id);
		await refreshAccess();
	}, [refreshAccess]);
	const value = (0, import_react.useMemo)(() => ({
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
		deleteFavourite
	}), [
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
		deleteFavourite
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
