-- Community / user-confirmed model schemes (public after confirm)

create table public.community_models (
  id text primary key,
  name text not null,
  category text not null check (category in ('aircraft', 'vehicle', 'ship')),
  aliases text[] not null default '{}',
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.community_schemes (
  id text primary key,
  model_id text not null references public.community_models (id) on delete cascade,
  name text not null,
  operator text,
  unit text,
  year text,
  buno text,
  colors jsonb not null default '[]'::jsonb,
  sources jsonb not null default '[]'::jsonb,
  query_text text,
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (model_id, name)
);

create index community_schemes_model_id_idx on public.community_schemes (model_id);
create index community_models_created_at_idx on public.community_models (created_at desc);

-- Rate-limit Claude lookups (5 / user / hour)
create table public.model_lookup_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index model_lookup_events_user_created_idx
  on public.model_lookup_events (user_id, created_at desc);

alter table public.community_models enable row level security;
alter table public.community_schemes enable row level security;
alter table public.model_lookup_events enable row level security;

-- Authenticated users can read all community models/schemes
create policy "Authenticated users can read community models"
  on public.community_models for select
  to authenticated
  using (true);

create policy "Authenticated users can read community schemes"
  on public.community_schemes for select
  to authenticated
  using (true);

-- Inserts go through service role (confirm API); keep owner insert policies as backup
create policy "Users can insert own community models"
  on public.community_models for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Users can insert own community schemes"
  on public.community_schemes for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Users can insert own lookup events"
  on public.model_lookup_events for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can read own lookup events"
  on public.model_lookup_events for select
  to authenticated
  using (auth.uid() = user_id);
