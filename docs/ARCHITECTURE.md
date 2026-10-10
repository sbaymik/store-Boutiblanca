# BOUTIBLANCA — Architecture & roadmap

## Product direction

BOUTIBLANCA is a premium-feeling Moroccan traditional clothing storefront focused on caftans, takchitas and jellabas. The experience should feel editorial and warm rather than like a generic marketplace: natural paper tones, restrained typography, generous spacing, product storytelling, and clear mobile shopping.

Languages: French (default) and Arabic (RTL). Currency: Moroccan dirham (MAD / DH).

## Current implementation

The repository is a zero-build static storefront connected to Supabase when configured:
- Public storefront with responsive layout, French/Arabic switch, catalogue filters/search and cart.
- Supabase Auth-protected admin at `admin.html`, with admin-role verification through `admin_profiles`.
- Product CRUD (prices in DH, stock, category, FR/AR copy, image URL, publish/draft).
- Landing-page editor: paste a complete HTML document, preview in a sandboxed iframe, save drafts and publish pages at `page.html?slug=...`.
- Supabase schema with Row Level Security for products, landing pages, profiles and orders.
- Database checkout RPC recalculates prices from the database, validates and reserves stock, stores an order; cancellation restores reserved stock.
- Browser local storage for cart persistence.

Supabase is not live until the owner creates a project, runs `supabase/schema.sql`, fills `supabase-config.js`, and grants their user the admin role. Product imagery and initial product rows are demo placeholders. Delivery is currently 0 DH and must be configured before public launch. The newsletter table/policy exists, but the public form is still a placeholder.

## Target modules

### 1. Storefront
- Home/editorial landing page and category pages.
- Product detail pages with gallery, size/colour options, availability and care details.
- Search, sorting, filters and favourites.
- Cart, checkout, shipping options and order confirmation.
- French/Arabic with RTL layout.
- SEO metadata, accessibility and responsive performance.

### 2. Admin workspace
- Authenticated staff access and role-based permissions.
- Create/edit/archive products and variants.
- Upload and organise product images.
- Manage category collections and homepage story bubbles.
- Track stock and availability.
- Review/update orders and statuses.
- Manage delivery settings, promotional content and basic sales KPIs.
- Audit log for important changes.

### 3. Backend
- API for catalogue, inventory, customers and orders.
- Relational database with migrations.
- Secure authentication, authorisation, input validation and rate limiting.
- Image storage using a dedicated object-storage provider.
- Order notification integration (WhatsApp/email) with retry/error handling.
- Server-side price and stock validation; never trust prices sent by the browser.

### 4. Operations
- Environment-based configuration; secrets stored only in the deployment provider.
- Automated tests and CI checks.
- Error logging, backups and documented recovery.
- Privacy policy, terms, delivery/return policy and consent handling appropriate to the launch market.

## Suggested build sequence

1. **Storefront foundation** — implemented: responsive storefront, catalogue UI, filters, cart and FR/AR switch.
2. **Supabase integration and admin** — schema, auth/role gate, product CRUD, landing-page publishing and order status management implemented; owner configuration still required.
3. **Order flow** — database-backed checkout and stock validation implemented; delivery fee rules, customer notifications and cancellation/return operational process still need work.
4. **Product details and media** — size/colour variants, product detail pages and Supabase Storage upload.
5. **Production readiness** — newsletter integration, legal pages, tests, accessibility, SEO, security review and deployment.

## Data model (initial proposal)

- `Product`: id, slug, nameFr, nameAr, descriptionFr, descriptionAr, categoryId, status, createdAt, updatedAt.
- `ProductVariant`: id, productId, sku, size, colour, priceMad, stockQuantity, active.
- `ProductImage`: id, productId, storageKey, altFr, altAr, sortOrder.
- `Category`: id, slug, nameFr, nameAr, imageKey, sortOrder, active.
- `Customer`: id, name, phone, email (optional), createdAt.
- `Order`: id, customerId, status, subtotalMad, deliveryMad, totalMad, currency, addressSnapshot, createdAt.
- `OrderItem`: id, orderId, variantId, productNameSnapshot, skuSnapshot, quantity, unitPriceMad.
- `AdminUser`: id, email, passwordHash/providerId, role, createdAt.

Store money as integer minor units or a documented decimal representation; use server-side calculations for all totals. Do not store plaintext passwords.

## Definition of done for launch

- Real product and image data approved by the owner.
- Arabic copy reviewed by a fluent speaker.
- Cart and orders survive refreshes/devices through backend persistence where appropriate.
- Stock cannot become negative from concurrent orders.
- Admin routes and APIs are protected.
- Order creation and notifications are observable and recoverable on failure.
- Legal, delivery, returns and privacy pages are available.
- Automated smoke tests pass on mobile and desktop.