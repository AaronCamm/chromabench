-- Remove unused scheme reference image columns

alter table public.community_schemes
  drop column if exists image_url,
  drop column if exists image_credit;
