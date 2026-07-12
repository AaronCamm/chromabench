-- Chromabench: profiles, subscriptions, favourite_recipes

create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  access_tier text not null default 'none'
    check (access_tier in ('none', 'complimentary')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

create index profiles_stripe_customer_id_idx on public.profiles (stripe_customer_id);

-- Stripe subscription mirror
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  stripe_subscription_id text not null unique,
  stripe_price_id text,
  status text not null,
  trial_end timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index subscriptions_user_id_idx on public.subscriptions (user_id);
create index subscriptions_status_idx on public.subscriptions (status);

-- Saved mix / finder recipes
create table public.favourite_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('mixer', 'finder')),
  title text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index favourite_recipes_user_id_idx on public.favourite_recipes (user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.favourite_recipes enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile (non-privileged fields)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and access_tier = (select p.access_tier from public.profiles p where p.id = auth.uid())
    and stripe_customer_id is not distinct from (
      select p.stripe_customer_id from public.profiles p where p.id = auth.uid()
    )
  );

create policy "Users can read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can read own favourites"
  on public.favourite_recipes for select
  using (auth.uid() = user_id);

create policy "Users can insert own favourites"
  on public.favourite_recipes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own favourites"
  on public.favourite_recipes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own favourites"
  on public.favourite_recipes for delete
  using (auth.uid() = user_id);

-- Service role (webhooks) bypasses RLS by default — no insert/update policies for subscriptions/profiles billing fields.
