# BOUTIBLANCA — mise en route Supabase

Le dépôt reste un site statique sans compilation. Supabase fournit l'authentification et la base de données. Le projet Supabase doit être créé par le propriétaire de la boutique.

## 1. Créer le projet gratuit
1. Crée un projet sur https://supabase.com/ et choisis le plan Free.
2. Dans **Project Settings → API** (ou **Connect** selon l'interface), copie l'URL du projet et la clé **anon / publishable**.
3. Dans le dépôt, ouvre `supabase-config.js` et remplace les deux valeurs de démonstration. La clé anon/public est destinée au navigateur et est protégée par les politiques RLS ci-dessous. **N'ajoute jamais la clé `service_role` ici.**
4. Dans Supabase → **SQL Editor**, colle puis exécute le contenu de `supabase/schema.sql`.

## 2. Créer le compte administrateur
1. Dans Supabase → **Authentication → Users**, crée/invite ton compte administrateur avec ton email.
2. Copie l'UUID de cet utilisateur.
3. Dans SQL Editor, exécute en remplaçant l'UUID réel :
```sql
insert into public.admin_profiles (id, role, display_name)
values ('UUID-REEL-DE-TON-UTILISATEUR', 'admin', 'BOUTIBLANCA Admin')
on conflict (id) do update set role = 'admin', display_name = excluded.display_name;
```
4. Ouvre `/admin.html`, connecte-toi avec cet email et ce mot de passe.

Ne rends jamais l'inscription publique admin disponible depuis la boutique. Crée les comptes via le tableau de bord Supabase et accorde explicitement le rôle.

## 3. Produits
Dans Administration → Produits, ajoute/modifie les noms français et arabes, le slug, la catégorie, le prix en DH, le stock, l'URL d'image et la visibilité. Les produits publiés sont lus par la boutique. Les images sont pour l'instant des URL ; l'intégration de l'upload Supabase Storage est une prochaine étape.

## 4. Landing pages — coller et publier
1. Prépare ton document HTML complet (incluant `<!doctype html>`, CSS et contenu).
2. Ouvre Administration → Landing pages → Nouvelle landing page.
3. Donne un titre et un slug simple, par exemple `collection-aid`.
4. Colle le HTML dans la grande zone de texte, clique sur **Prévisualiser**, puis **Enregistrer**.
5. Coche **Publier immédiatement** pour rendre la page accessible à `page.html?slug=collection-aid`. Utilise le bouton **Voir** pour vérifier la page en ligne.

Le contenu HTML est rendu dans une iframe sandboxée sans accès au DOM parent ni à la session admin. Les fonctions qui dépendent de cookies tiers, de scripts bloqués ou de chemins relatifs peuvent demander des ajustements. Pour les images, privilégie des URL HTTPS absolues. Ne colle pas de mots de passe, de clés privées ou de scripts de paiement non vérifiés.

## 5. Commandes et stock

Le checkout public demande le nom, le téléphone, la ville et l'adresse. Il appelle `create_store_order` : le navigateur n'envoie que les identifiants et quantités ; la base récupère les prix, vérifie les stocks et crée la commande en statut « À confirmer ». L'administration permet de mettre à jour le statut. Le passage en « Annulée » restitue le stock. Les frais de livraison sont actuellement à 0 DH : configure-les avant d'ouvrir les commandes au public.

## 6. Déploiement
Publie le dépôt sur un hébergeur statique (GitHub Pages, Netlify ou Vercel). Configure le domaine et les redirections HTTPS chez l'hébergeur. Le site ne peut pas accéder à ta base avant d'avoir renseigné les identifiants publics Supabase et exécuté le SQL.

## État / limites actuelles
- Le panneau admin comprend l'authentification, le CRUD du catalogue, la création/édition/publication des landing pages, et la consultation/mise à jour du statut des commandes.
- Le checkout public enregistre maintenant les commandes via la fonction SQL `create_store_order`, qui recalcule les prix à partir de la base, vérifie le stock et le réserve. Une annulation depuis l'admin restitue le stock. Les frais de livraison sont à 0 DH pour le moment et doivent être configurés avant le lancement.
- Le catalogue utilise des images via URL, pas encore un upload de fichiers.
- Les landing pages sont isolées en iframe ; elles ont leur propre contenu HTML, elles ne remplacent pas le document parent.
- Les prix et images de démonstration doivent être remplacés avant la mise en vente.
