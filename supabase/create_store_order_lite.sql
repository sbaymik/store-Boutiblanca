-- ============================================================
-- RPC SIMPLIFIÉ POUR LES COMMANDES AVEC PRODUITS CORE (SLUGS)
-- À exécuter dans : Supabase → SQL Editor → New query → Run
-- ============================================================
-- Ce RPC accepte un snapshot JSON des articles côté client,
-- sans valider les IDs comme UUIDs dans la table products.
-- Il permet d'enregistrer les commandes passées via les 20
-- CORE_PRODUCTS (dont les IDs sont des slugs texte, pas des UUID).

create or replace function public.create_store_order_lite(
  p_customer_name    text,
  p_customer_phone   text,
  p_shipping_address text,
  p_city             text,
  p_snapshot         text,      -- JSON stringifié côté client
  p_total_mad        integer
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_snapshot_json jsonb;
  v_order         public.orders%rowtype;
begin
  -- Validations minimales
  if length(trim(coalesce(p_customer_name,''))) < 2 then
    raise exception 'Merci de saisir un nom valide.';
  end if;
  if length(trim(coalesce(p_customer_phone,''))) < 7 then
    raise exception 'Numéro de téléphone invalide.';
  end if;
  if length(trim(coalesce(p_shipping_address,''))) < 4 then
    raise exception 'Adresse de livraison invalide.';
  end if;
  if length(trim(coalesce(p_city,''))) < 2 then
    raise exception 'Ville invalide.';
  end if;
  if p_total_mad < 0 then
    raise exception 'Montant invalide.';
  end if;

  -- Parser le snapshot JSON
  begin
    v_snapshot_json := p_snapshot::jsonb;
  exception when others then
    raise exception 'Snapshot JSON invalide.';
  end;

  if jsonb_typeof(v_snapshot_json) <> 'array' or jsonb_array_length(v_snapshot_json) < 1 then
    raise exception 'Le panier est vide ou invalide.';
  end if;

  -- Insérer la commande
  insert into public.orders(
    customer_name, customer_phone, shipping_address, city,
    items, subtotal_mad, delivery_mad, total_mad, status
  )
  values(
    trim(p_customer_name), trim(p_customer_phone),
    trim(p_shipping_address), trim(p_city),
    v_snapshot_json,
    p_total_mad, 0, p_total_mad,
    'pending'
  )
  returning * into v_order;

  return jsonb_build_object(
    'order_number', v_order.order_number,
    'total_mad',    v_order.total_mad,
    'status',       v_order.status
  );
end;
$$;

-- Accorder l'accès public (anonyme + authentifié)
revoke all on function public.create_store_order_lite(text,text,text,text,text,integer) from public;
grant execute on function public.create_store_order_lite(text,text,text,text,text,integer) to anon, authenticated;
