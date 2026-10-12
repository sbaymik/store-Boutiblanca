# BOUTIBLANCA — Espace de test isolé de la production

Ce dossier est réservé aux prototypes et expérimentations. Les fichiers placés ici ne remplacent pas les fichiers de production à la racine (`index.html`, `styles.css`, `app.js`, etc.).

## Règles de travail

1. Créer chaque prototype dans un sous-dossier dédié, par exemple `test-iso-prod/landing-v2/`.
2. Ne jamais modifier les fichiers de production à la racine pendant la phase de test.
3. Tester les liens, le responsive, le catalogue, les fiches produit, le panier, Supabase et le parcours de commande.
4. Après validation, comparer les fichiers du prototype avec la production et transférer uniquement les changements validés.
5. Pour toute bascule en production, privilégier une branche Git dédiée et une Pull Request vers `main`, avec vérification du diff avant fusion.

## Déploiement Netlify

Attention : si Netlify publie la racine du dépôt, les fichiers statiques du sous-dossier peuvent être accessibles sous `/test-iso-prod/...`. Ne pas configurer ce dossier comme répertoire de publication principal sans intention explicite. La production continue d'utiliser les fichiers déjà configurés dans Netlify.

## Prototype en cours

Créer ici un sous-dossier pour chaque prototype afin de garder les essais clairement séparés et faciles à retirer.