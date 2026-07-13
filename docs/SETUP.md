# Auth, billing & favourites setup

Chromabench uses **Supabase** (auth + Postgres) and **Stripe** ($5/month with a 7-day trial).

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run:
   - [`supabase/migrations/001_init.sql`](../supabase/migrations/001_init.sql)
   - [`supabase/migrations/002_scheme_favourites.sql`](../supabase/migrations/002_scheme_favourites.sql)
   - [`supabase/migrations/003_community_schemes.sql`](../supabase/migrations/003_community_schemes.sql)
3. Authentication → Providers → Email: enable Email. For local/dev you can disable “Confirm email”.
4. Authentication → URL Configuration:
   - **Site URL:** `https://chromabench.com`
   - **Redirect URLs:** add `https://chromabench.com/**`, `https://www.chromabench.com/**`, and `http://localhost:5173/**` for local dev
5. Copy **Project URL** and **anon** / **service_role** keys into `.env` (see [`.env.example`](../.env.example)).

## 2. Stripe

1. Create a Product **Chromabench** with a recurring Price of **$5 USD / month**.
2. Copy the Price ID into `STRIPE_PRICE_ID_MONTHLY`.
3. Enable the **Customer Portal** (Settings → Billing → Customer portal): allow cancel and payment method update.
4. Webhook endpoint: `https://chromabench.com/api/stripe/webhook`  
   Events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`  
   Use the **Dashboard** signing secret (not only the Stripe CLI secret) in Vercel as `STRIPE_WEBHOOK_SECRET`.  
   The app also syncs from Stripe when you return from Checkout or open the bench while signed in.

Checkout is created with `trial_period_days: 7` and collects a payment method up front.

## 3. Env vars

Copy `.env.example` → `.env` (or Cloudflare `.dev.vars` for Workers). Restart the dev server after changes.

| Variable                      | Where                                |
| ----------------------------- | ------------------------------------ |
| `VITE_SUPABASE_URL`           | Browser + server                     |
| `VITE_SUPABASE_ANON_KEY`      | Browser + server                     |
| `SUPABASE_SERVICE_ROLE_KEY`   | Server only (webhooks / confirm API) |
| `STRIPE_SECRET_KEY`           | Server only                          |
| `STRIPE_WEBHOOK_SECRET`       | Server only                          |
| `STRIPE_PRICE_ID_MONTHLY`     | Server only                          |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Reserved for future client Stripe.js |
| `APP_URL`                     | Server (Checkout / Portal URLs)      |
| `ANTHROPIC_API_KEY`           | Server only (Models scheme lookup)   |

## 4. Complimentary access (family)

Do **not** create a public 100%-off coupon. After your dad signs up once:

```sql
update public.profiles
set access_tier = 'complimentary'
where email = 'dad@example.com';
```

He gets Mixer, Recipe finder, and Favourites with no Stripe subscription. To revoke:

```sql
update public.profiles
set access_tier = 'none'
where email = 'dad@example.com';
```

## 5. Product rules

- **Entire bench** (Equivalents, Mixer, Recipe finder, Models (Beta), Favourites) — requires sign-in and access (`trialing`, `active`, or `complimentary`).
- Favourites store mixer/finder recipes (paint IDs + parts + hex/ΔE metadata) and vehicle schemes (model + scheme IDs).

## 6. Model scheme catalog

The **Models (Beta)** tab uses a static catalog at `src/data/models/catalog.ts`, generated from Cybermodeler color profiles.

To refresh the catalog locally:

```bash
npm run import:schemes
```

Then commit the updated `catalog.ts`. The app does **not** scrape at runtime.

Run [`supabase/migrations/002_scheme_favourites.sql`](../supabase/migrations/002_scheme_favourites.sql) on existing projects to allow `scheme` favourites.

When search finds nothing, signed-in subscribers can **Request this model**. Claude looks up FS callouts; after the user confirms, the scheme is stored in Supabase (`community_models` / `community_schemes`) with source **User Added** and appears in Models search for everyone signed in.

Run [`supabase/migrations/003_community_schemes.sql`](../supabase/migrations/003_community_schemes.sql) and set `ANTHROPIC_API_KEY` on Vercel for that flow.
