-- Allow scheme (vehicle) favourites alongside mixer/finder recipes.

alter table public.favourite_recipes
  drop constraint if exists favourite_recipes_kind_check;

alter table public.favourite_recipes
  add constraint favourite_recipes_kind_check
    check (kind in ('mixer', 'finder', 'scheme'));
