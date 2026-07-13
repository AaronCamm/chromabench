-- Optional reference image for community schemes (Wikimedia / attributed URLs)

alter table public.community_schemes
  add column if not exists image_url text,
  add column if not exists image_credit text;
