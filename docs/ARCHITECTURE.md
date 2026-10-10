# BOUTIBLANCA — Architecture & roadmap

## Product direction

BOUTIBLANCA is a premium-feeling Moroccan traditional clothing storefront focused on caftans, takchitas and jellabas. The experience should feel editorial and warm rather than like a generic marketplace: natural paper tones, restrained typography, generous spacing, product storytelling, and clear mobile shopping.

Languages: French (default) and Arabic (RTL). Currency: Moroccan dirham (MAD / DH).

## Current implementation

The first milestone is a zero-build static storefront:
- semantic HTML;
- responsive CSS;
- plain JavaScript for catalogue rendering, search, category filtering, language switching and cart state;
- browser local storage for the demo cart.

This keeps the first iteration easy to review and deploy. It is not yet a complete SaaS and must not be used to claim that orders, inventory or newsletter signups are persisted server-side.

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

1. **Storefront foundation** — implemented in this commit: responsive landing page, catalogue demo, filters, cart and language switch.
2. **Real catalogue model** — product detail pages, variants, product image strategy and product data validation.
3. **Backend and database** — API, persistence, stock and order lifecycle.
4. **Admin panel** — login, products/media, categories and orders.
5. **Checkout integration** — validated order creation, delivery calculation and notifications.
6. **Production readiness** — tests, accessibility, SEO, security review, policies and deployment.

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