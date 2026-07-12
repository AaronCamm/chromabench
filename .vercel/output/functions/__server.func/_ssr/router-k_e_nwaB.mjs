import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as AuthProvider } from "./auth-context-CrP7tkun.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-k_e_nwaB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BgO-AoJa.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Chromabench — Hobby paint converter & mixer" },
			{
				name: "description",
				content: "Match Citadel, Vallejo, Tamiya, Mr. Color, SMS, Army Painter, AK Interactive and more. Find cross-brand equivalents and build multi-brand mix recipes."
			},
			{
				property: "og:title",
				content: "Chromabench — Hobby paint converter & mixer"
			},
			{
				property: "og:description",
				content: "Match Citadel, Vallejo, Tamiya, Mr. Color, SMS, Army Painter, AK Interactive and more. Find cross-brand equivalents and build multi-brand mix recipes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Chromabench — Hobby paint converter & mixer"
			},
			{
				name: "twitter:description",
				content: "Match Citadel, Vallejo, Tamiya, Mr. Color, SMS, Army Painter, AK Interactive and more. Find cross-brand equivalents and build multi-brand mix recipes."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ef86e612-cee6-4c9b-83d2-9f4b4cff7762/id-preview-875e2643--74de1408-2c4a-4eec-9911-bf466e844507.lovable.app-1783758247917.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ef86e612-cee6-4c9b-83d2-9f4b4cff7762/id-preview-875e2643--74de1408-2c4a-4eec-9911-bf466e844507.lovable.app-1783758247917.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter = () => import("./routes-kIxRj2pG.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var stripePromise = null;
function readEnv(name) {
	return process.env[name] ?? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_STRIPE_PUBLISHABLE_KEY": "pk_test_51Trzy0Ll4CmSabWxlXyl30zYbQlV2hi8R8fbQTbTdpAAwC0bVvEcFeLeHuMDJ6vEvdzxqYOxY5GwyyOx0KXljsZc00ZJHMa5Oj",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidGF0bGlxZmN6Yml4aGJmaWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3Njc3MDksImV4cCI6MjA5OTM0MzcwOX0.XkSoEtVbzDVuyZS1eYAjxvPq6owR8y9oU4atg1ePUMk",
		"VITE_SUPABASE_URL": "https://ybtatliqfczbixhbfilt.supabase.co"
	}[name];
}
async function getStripe() {
	const key = readEnv("STRIPE_SECRET_KEY");
	if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
	if (!stripePromise) stripePromise = import("../_libs/stripe.mjs").then((n) => n.t).then(({ default: Stripe }) => {
		return new Stripe(key, {
			apiVersion: "2026-06-24.dahlia",
			typescript: true
		});
	});
	return stripePromise;
}
function getMonthlyPriceId() {
	const id = readEnv("STRIPE_PRICE_ID_MONTHLY");
	if (!id) throw new Error("Missing STRIPE_PRICE_ID_MONTHLY");
	return id;
}
function getAppUrl(requestUrl) {
	const configured = readEnv("APP_URL");
	if (configured) return configured.replace(/\/$/, "");
	if (requestUrl) try {
		return new URL(requestUrl).origin;
	} catch {}
	return "http://localhost:5173";
}
var serviceClient = null;
function getSupabaseServiceClient() {
	const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key) throw new Error("Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
	if (!serviceClient) serviceClient = createClient(url, key, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	return serviceClient;
}
function getSupabaseUserClient(accessToken) {
	const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
	const anon = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
	if (!url || !anon) throw new Error("Missing Supabase URL or anon key on server");
	return createClient(url, anon, {
		global: { headers: { Authorization: `Bearer ${accessToken}` } },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
function toIso(unix) {
	if (!unix) return null;
	return (/* @__PURE__ */ new Date(unix * 1e3)).toISOString();
}
async function resolveUserId(subscription) {
	const fromMeta = subscription.metadata?.supabase_user_id;
	if (fromMeta) return fromMeta;
	const admin = getSupabaseServiceClient();
	const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
	const { data } = await admin.from("profiles").select("id").eq("stripe_customer_id", customerId).maybeSingle();
	return data?.id ?? null;
}
async function upsertSubscriptionFromStripe(subscription) {
	const userId = await resolveUserId(subscription);
	if (!userId) {
		console.error("No user for Stripe subscription", subscription.id);
		return;
	}
	const admin = getSupabaseServiceClient();
	const item = subscription.items.data[0];
	const priceId = item?.price?.id ?? null;
	const periodEnd = item?.current_period_end ?? subscription.current_period_end;
	await admin.from("subscriptions").upsert({
		user_id: userId,
		stripe_subscription_id: subscription.id,
		stripe_price_id: priceId,
		status: subscription.status,
		trial_end: toIso(subscription.trial_end),
		current_period_end: toIso(periodEnd),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { onConflict: "stripe_subscription_id" });
	const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
	await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", userId);
}
async function markSubscriptionCanceled(subscriptionId) {
	await getSupabaseServiceClient().from("subscriptions").update({
		status: "canceled",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("stripe_subscription_id", subscriptionId);
}
var Route$2 = createFileRoute("/api/stripe/webhook")({ server: { handlers: { POST: async ({ request }) => {
	const stripe = await getStripe();
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!secret) return new Response("Webhook secret not configured", { status: 500 });
	const signature = request.headers.get("stripe-signature");
	if (!signature) return new Response("Missing stripe-signature", { status: 400 });
	const rawBody = await request.text();
	let event;
	try {
		event = stripe.webhooks.constructEvent(rawBody, signature, secret);
	} catch (err) {
		console.error("Stripe webhook signature verification failed", err);
		return new Response("Invalid signature", { status: 400 });
	}
	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;
				if (session.mode === "subscription" && session.subscription) {
					const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
					const subscription = await stripe.subscriptions.retrieve(subId);
					if (session.metadata?.supabase_user_id) subscription.metadata = {
						...subscription.metadata,
						supabase_user_id: session.metadata.supabase_user_id
					};
					await upsertSubscriptionFromStripe(subscription);
				}
				break;
			}
			case "customer.subscription.created":
			case "customer.subscription.updated":
				await upsertSubscriptionFromStripe(event.data.object);
				break;
			case "customer.subscription.deleted": {
				const sub = event.data.object;
				await markSubscriptionCanceled(sub.id);
				break;
			}
			default: break;
		}
	} catch (err) {
		console.error("Stripe webhook handler error", err);
		return new Response("Webhook handler failed", { status: 500 });
	}
	return Response.json({ received: true });
} } } });
var Route$1 = createFileRoute("/api/stripe/portal")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const auth = request.headers.get("Authorization");
		const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
		if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
		const { data, error: userError } = await getSupabaseUserClient(token).auth.getUser(token);
		if (userError || !data.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
		const admin = getSupabaseServiceClient();
		const stripe = await getStripe();
		const appUrl = getAppUrl(request.url);
		const { data: profile, error } = await admin.from("profiles").select("stripe_customer_id").eq("id", data.user.id).single();
		if (error || !profile?.stripe_customer_id) return Response.json({ error: "No billing customer found. Start a trial first." }, { status: 400 });
		const session = await stripe.billingPortal.sessions.create({
			customer: profile.stripe_customer_id,
			return_url: `${appUrl}/#tool`
		});
		return Response.json({ url: session.url });
	} catch (err) {
		console.error("portal error", err);
		return Response.json({ error: err instanceof Error ? err.message : "Portal failed" }, { status: 500 });
	}
} } } });
async function requireUserFromRequest(request) {
	const auth = request.headers.get("Authorization");
	const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
	if (!token) return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
	const { data, error } = await getSupabaseUserClient(token).auth.getUser(token);
	if (error || !data.user) return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
	return {
		user: data.user,
		token
	};
}
var Route = createFileRoute("/api/stripe/checkout")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const auth = await requireUserFromRequest(request);
		if ("error" in auth && auth.error) return auth.error;
		const { user } = auth;
		const admin = getSupabaseServiceClient();
		const stripe = await getStripe();
		const priceId = getMonthlyPriceId();
		const appUrl = getAppUrl(request.url);
		const { data: profile, error: profileError } = await admin.from("profiles").select("id, email, access_tier, stripe_customer_id").eq("id", user.id).single();
		if (profileError || !profile) return Response.json({ error: "Profile not found" }, { status: 404 });
		if (profile.access_tier === "complimentary") return Response.json({ error: "Complimentary accounts do not need a subscription" }, { status: 400 });
		let customerId = profile.stripe_customer_id;
		if (!customerId) {
			customerId = (await stripe.customers.create({
				email: profile.email ?? user.email ?? void 0,
				metadata: { supabase_user_id: user.id }
			})).id;
			await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
		}
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			customer: customerId,
			line_items: [{
				price: priceId,
				quantity: 1
			}],
			subscription_data: {
				trial_period_days: 7,
				metadata: { supabase_user_id: user.id }
			},
			metadata: { supabase_user_id: user.id },
			success_url: `${appUrl}/?checkout=success#tool`,
			cancel_url: `${appUrl}/?checkout=cancel#tool`,
			allow_promotion_codes: true
		});
		if (!session.url) return Response.json({ error: "Stripe did not return a checkout URL" }, { status: 500 });
		return Response.json({ url: session.url });
	} catch (err) {
		console.error("checkout error", err);
		return Response.json({ error: err instanceof Error ? err.message : "Checkout failed" }, { status: 500 });
	}
} } } });
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var ApiStripeWebhookRoute = Route$2.update({
	id: "/api/stripe/webhook",
	path: "/api/stripe/webhook",
	getParentRoute: () => Route$4
});
var ApiStripePortalRoute = Route$1.update({
	id: "/api/stripe/portal",
	path: "/api/stripe/portal",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute,
	ApiStripeCheckoutRoute: Route.update({
		id: "/api/stripe/checkout",
		path: "/api/stripe/checkout",
		getParentRoute: () => Route$4
	}),
	ApiStripePortalRoute,
	ApiStripeWebhookRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
