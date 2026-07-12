# Auth, billing & favourites setup

Chromabench uses **Supabase** (auth + Postgres) and **Stripe** ($5/month with a 7-day trial).

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/migrations/001_init.sql`](../supabase/migrations/001_init.sql).
3. Authentication → Providers → Email: enable Email. For local/dev you can disable “Confirm email”.
4. Copy **Project URL** and **anon** / **service_role** keys into `.env` (see [`.env.example`](../.env.example)).

## 2. Stripe

1. Create a Product **Chromabench** with a recurring Price of **$5 USD / month**.
2. Copy the Price ID into `STRIPE_PRICE_ID_MONTHLY`.
3. Enable the **Customer Portal** (Settings → Billing → Customer portal): allow cancel and payment method update.
4. Webhook endpoint: `https://YOUR_DOMAIN/api/stripe/webhook`  
   Events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Local testing: `stripe listen --forward-to localhost:5173/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET` to the CLI secret.

Checkout is created with `trial_period_days: 7` and collects a payment method up front.

## 3. Env vars

Copy `.env.example` → `.env` (or Cloudflare `.dev.vars` for Workers). Restart the dev server after changes.

| Variable                      | Where                                |
| ----------------------------- | ------------------------------------ |
| `VITE_SUPABASE_URL`           | Browser + server                     |
| `VITE_SUPABASE_ANON_KEY`      | Browser + server                     |
| `SUPABASE_SERVICE_ROLE_KEY`   | Server only (webhooks)               |
| `STRIPE_SECRET_KEY`           | Server only                          |
| `STRIPE_WEBHOOK_SECRET`       | Server only                          |
| `STRIPE_PRICE_ID_MONTHLY`     | Server only                          |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Reserved for future client Stripe.js |
| `APP_URL`                     | Server (Checkout / Portal URLs)      |

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

- **Entire bench** (Equivalents, Mixer, Recipe finder, Favourites) — requires sign-in and access (`trialing`, `active`, or `complimentary`).
- Favourites store mixer and finder recipes (paint IDs + parts + hex/ΔE metadata).
