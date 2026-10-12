# BOUTIBLANCA V2 — Prototype isolé

**État : prototype à valider. Ce dossier ne remplace pas la production.**

## Aperçu

- `index.html` : accueil éditorial, catégories, carrousel horizontal des nouveautés, recherche et filtres.
- `product.html?id=caftan-zelij` : fiche détaillée individuelle avec description, prix, variantes de démonstration et demande de renseignement.
- `styles.css` : identité visuelle ivoire, brun/noir, sable et or discret, responsive desktop/mobile.
- `app.js` / `product.js` : interactions du prototype.

## Tester sans toucher à la production

Ouvrir la page du prototype via GitHub Pages ou un serveur statique en pointant vers ce dossier. En local, depuis la racine du dépôt :

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080/test-iso-prod/boutique-v2/`.

## Avant validation

- Le catalogue et les prix sont fictifs : les remplacer par les données réelles.
- Les images sont des URL d'images externes de démonstration ; valider les droits, la pertinence et l'identité marocaine des photos, puis déposer les photos approuvées dans un dossier local d'assets.
- La fiche produit prépare une demande, mais le numéro WhatsApp n'est volontairement pas configuré.
- Aucun paiement, enregistrement de commande, Supabase, authentification ni collecte réelle de newsletter n'est activé.
- Le prototype est autonome et ne modifie aucun fichier de production ni la configuration Supabase.

## Promotion vers la production

Après validation visuelle et fonctionnelle, comparer le diff, intégrer seulement les changements acceptés via Pull Request et vérifier le déploiement Netlify. Ne pas fusionner ce prototype tel quel : d'abord connecter le catalogue réel, les images validées et le flux de commande.
