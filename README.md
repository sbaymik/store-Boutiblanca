# BOUTIBLANCA — Maison marocaine

A responsive French/Arabic storefront MVP for a Moroccan traditional fashion brand: caftans, takchitas and jellabas.

**Repository:** https://github.com/sbaymik/store-Boutiblanca

## Current implementation

- Editorial storefront with responsive desktop and mobile layouts.
- French/Arabic language switch with RTL layout support.
- Product catalogue, category filters and search.
- Shopping cart with quantity controls and browser-local persistence.
- WhatsApp checkout flow scaffold (requires the shop number to be configured).
- Newsletter form placeholder (requires a newsletter provider).
- Product data centralised in `app.js` for now.

## Run locally

No build step is required. Open `index.html` in a browser, or serve the folder with any static HTTP server.

For example, with Python installed:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Before accepting real orders

1. Replace demo product copy, prices, and remote sample images with approved product data and owned/authorised photos.
2. Set `WHATSAPP_NUMBER` in `app.js` to the shop's international-format number (digits only, without `+`).
3. Connect a real order backend before treating a WhatsApp message as a confirmed order.
4. Add a secure admin interface and authentication; never put API keys or secrets in frontend files.
5. Add shipping rules, size/colour variants, stock management, privacy/legal pages, and production analytics.
6. Connect a newsletter service before collecting subscriptions.

## Planned project structure

- `index.html`, `styles.css`, `app.js`: public storefront MVP.
- `docs/ARCHITECTURE.md`: product and technical roadmap.
- Next: authenticated admin, product/media management, order management, and API/database.

## Important

The current catalogue is demonstration content. Prices, descriptions and photos are placeholders, and the checkout does not send an order until the store WhatsApp number is configured. The current newsletter form does not save addresses.


## Supabase admin and landing pages

- `admin.html`: authenticated admin workspace (Supabase Auth + admin role).
- `supabase/schema.sql`: schema, row-level security policies, sample product rows.
- `supabase-config.js`: public project URL + anon/publishable key placeholders; never use service_role in frontend.
- `admin.html` → Landing pages: paste a full HTML document, preview in a sandboxed iframe, save as draft or publish.
- Published landing pages are available at `page.html?slug=your-page-slug` and can be linked from the storefront.
- Setup guide: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

The Supabase integration is inactive until you create your project, run the SQL, set the public URL/key and grant the admin role to your user. Public checkout creates database-backed orders through a stock- and price-validating Supabase RPC once configured. Delivery fees are still set to 0 DH and must be configured before launch.
