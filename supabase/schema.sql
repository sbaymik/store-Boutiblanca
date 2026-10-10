-- BOUTIBLANCA Supabase schema. Run in Supabase Dashboard > SQL Editor.
-- Never expose the service_role key in browser code.
create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('admin','staff')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_ar text not null default '',
  description_fr text not null default '',
  description_ar text not null default '',
  category text not null default 'Caftan' check (category in ('Caftan','Takchita','Jellaba','Accessoire')),
  price_mad integer not null default 0 check (price_mad >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  badge text not null default '',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  meta_description text not null default '',
  html_content text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('BB-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null default '',
  city text not null default '',
  items jsonb not null default '[]'::jsonb,
  subtotal_mad integer not null default 0 check (subtotal_mad >= 0),
  delivery_mad integer not null default 0 check (delivery_mad >= 0),
  total_mad integer not null default 0 check (total_mad >= 0),
  status text not null default 'pending' check (status in ('pending','confirmed','preparing','shipped','delivered','cancelled')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function public.is_store_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists pages_updated_at on public.landing_pages;
create trigger pages_updated_at before update on public.landing_pages for each row execute function public.set_updated_at();
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;
alter table public.landing_pages enable row level security;
alter table public.orders enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Admins can read profiles" on public.admin_profiles;
create policy "Admins can read profiles" on public.admin_profiles for select to authenticated using (public.is_store_admin() or id = auth.uid());
drop policy if exists "Admins manage profiles" on public.admin_profiles;
create policy "Admins manage profiles" on public.admin_profiles for all to authenticated using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "Public read published products" on public.products;
create policy "Public read published products" on public.products for select to anon, authenticated using (is_published = true or public.is_store_admin());
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products for all to authenticated using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "Public read published landing pages" on public.landing_pages;
create policy "Public read published landing pages" on public.landing_pages for select to anon, authenticated using (is_published = true or public.is_store_admin());
drop policy if exists "Admins manage landing pages" on public.landing_pages;
create policy "Admins manage landing pages" on public.landing_pages for all to authenticated using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "Admins read orders" on public.orders;
create policy "Admins read orders" on public.orders for select to authenticated using (public.is_store_admin());
drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders" on public.orders for update to authenticated using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "Admins insert orders" on public.orders;
create policy "Admins insert orders" on public.orders for insert to authenticated with check (public.is_store_admin());
drop policy if exists "Admins delete orders" on public.orders;
create policy "Admins delete orders" on public.orders for delete to authenticated using (public.is_store_admin());

drop policy if exists "Public subscribe newsletter" on public.newsletter_subscribers;
create policy "Public subscribe newsletter" on public.newsletter_subscribers for insert to anon, authenticated with check (length(email) <= 254 and position('@' in email) > 1);
drop policy if exists "Admins manage newsletter" on public.newsletter_subscribers;
create policy "Admins manage newsletter" on public.newsletter_subscribers for select, update, delete to authenticated using (public.is_store_admin()) with check (public.is_store_admin());

-- IMPORTANT: create your user first in Authentication > Users, then insert its UUID below.
-- Replace YOUR_AUTH_USER_UUID with the real user UUID shown in Supabase.
-- insert into public.admin_profiles (id, role, display_name)
-- values ('YOUR_AUTH_USER_UUID', 'admin', 'BOUTIBLANCA Admin')
-- on conflict (id) do update set role = 'admin', display_name = excluded.display_name;

-- Optional demo product seed; replace photos, descriptions and prices before selling.
insert into public.products (slug,name_fr,name_ar,description_fr,category,price_mad,stock,image_url,badge,is_published)
values
('caftan-nour','Caftan Nour','قفطان نور','Velours doux et finitions délicates.','Caftan',1890,1,'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=82','Signature',true),
('takchita-zahra','Takchita Zahra','تكشيطة زهراء','Une silhouette festive aux détails raffinés.','Takchita',2450,1,'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=82','Pièce d’exception',true),
('jellaba-salma','Jellaba Salma','جلابة سلمى','L’élégance facile à porter au quotidien.','Jellaba',690,1,'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=82','Essentiel',true)
on conflict (slug) do nothing;
