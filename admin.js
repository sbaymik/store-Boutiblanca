/* ==========================================================================
   BOUTIBLANCA ADMIN — PRODUCTION LOGIC
   Supabase Auth & RLS Tables + Studio No-Code (Thème, Photos, Pages)
   ========================================================================== */

const CFG = window.BOUTIBLANCA_CONFIG || {};
const ready = Boolean(window.supabase && CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && !CFG.SUPABASE_URL.includes("TON-PROJET") && !CFG.SUPABASE_ANON_KEY.includes("COLLE_ICI"));
const client = ready ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY) : null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let products = [], pages = [], orders = [], currentUser = null;

const PRESET_PALETTES = {
  gold: { goldPrimary: "#c5a059", bgCanvas: "#faf7f2", textMain: "#1d1a16", accentColor: "#1b3b2e", fontSerif: '"Playfair Display", "Cinzel", Georgia, serif' },
  ebony: { goldPrimary: "#dfba73", bgCanvas: "#12100e", textMain: "#faf7f2", accentColor: "#9a742f", fontSerif: '"Cinzel", "Playfair Display", serif' },
  emerald: { goldPrimary: "#c5a059", bgCanvas: "#f4f7f5", textMain: "#161412", accentColor: "#18382b", fontSerif: '"Playfair Display", "Cinzel", Georgia, serif' },
  majorelle: { goldPrimary: "#e0b464", bgCanvas: "#f6f8fb", textMain: "#101524", accentColor: "#172d54", fontSerif: '"Playfair Display", "Cinzel", Georgia, serif' },
  terracotta: { goldPrimary: "#c5a059", bgCanvas: "#fbf8f5", textMain: "#1c1512", accentColor: "#a44c34", fontSerif: '"Playfair Display", "Cinzel", Georgia, serif' }
};

function showToast(msg = "Modifications enregistrées avec succès !") {
  const toast = $("#admin-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

const message = (text, error = false) => {
  const el = $("#global-message");
  if (!el) return;
  el.textContent = text;
  el.style.color = error ? "#9a4b32" : "#32633d";
};

const fail = (error) => {
  console.error(error);
  message(error?.message || "Une erreur est survenue.", true);
};

function safeSlug(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 150);
}

function escapeHtml(s = "") {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// BASCULE DE VUES
function setView(name) {
  $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + name));
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  
  const titles = {
    overview: "Vue d'ensemble",
    theme: "Studio Thème & Couleurs",
    content: "Photos & Contenus Hero",
    pages: "Landing Pages No-Code",
    products: "Catalogue Produits",
    orders: "Commandes Clients",
    preview: "Aperçu en Direct"
  };
  $("#view-title").textContent = titles[name] || name;

  if (name === "products") loadProducts();
  if (name === "pages") loadPages();
  if (name === "orders") loadOrders();
  if (name === "preview") refreshPreviewFrame();
}

// AUTHENTIFICATION SUPABASE ADMIN OBLIGATOIRE
async function ensureAdmin(session) {
  currentUser = session?.user || null;
  if (!currentUser) {
    $("#auth-screen").hidden = false;
    $("#admin-app").hidden = true;
    return false;
  }

  try {
    const { data, error } = await client.from("admin_profiles").select("role,display_name").eq("id", currentUser.id).maybeSingle();
    if (error) throw error;
    if (!data || data.role !== "admin") {
      await client.auth.signOut();
      $("#auth-message").textContent = "Ce compte n'a pas le rôle administrateur dans admin_profiles.";
      $("#auth-screen").hidden = false;
      $("#admin-app").hidden = true;
      return false;
    }
    $("#auth-screen").hidden = true;
    $("#admin-app").hidden = false;
    $("#admin-email").textContent = data.display_name || currentUser.email || "Administrateur";
    await refreshOverview();
    return true;
  } catch (err) {
    console.error(err);
    $("#auth-message").textContent = err.message || "Erreur de vérification des droits.";
    $("#auth-screen").hidden = false;
    $("#admin-app").hidden = true;
    return false;
  }
}

// RAFRAÎCHISSEMENT DES STATS D'ACCUEIL
async function refreshOverview() {
  if (!client) return;
  try {
    const [p, l, o] = await Promise.all([
      client.from("products").select("id", { count: "exact", head: true }),
      client.from("landing_pages").select("id", { count: "exact", head: true }).eq("is_published", true),
      client.from("orders").select("id", { count: "exact", head: true })
    ]);
    $("#metric-products").textContent = p.count ?? 0;
    $("#metric-pages").textContent = l.count ?? 0;
    $("#metric-orders").textContent = o.count ?? 0;
  } catch (e) {
    fail(e);
  }
}

// GESTION DU CATALOGUE PRODUITS
async function loadProducts() {
  if (!client) return;
  try {
    const { data, error } = await client.from("products").select("*").order("updated_at", { ascending: false });
    if (error) return fail(error);
    products = data || [];
    const tbody = $("#products-table");
    if (!products.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding:20px; text-align:center; color:var(--admin-muted);">Aucun produit en base. Cliquez sur « Nouveau Produit » pour en ajouter.</td></tr>';
      return;
    }
    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div class="td-product-info">
            <img class="td-img" src="${escapeHtml(p.image_url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200')}" alt="${escapeHtml(p.name_fr)}" />
            <div>
              <strong>${escapeHtml(p.name_fr)}</strong><br>
              <small style="color:var(--admin-muted);">${escapeHtml(p.slug)}</small>
            </div>
          </div>
        </td>
        <td>${escapeHtml(p.category)}</td>
        <td><strong>${Number(p.price_mad).toLocaleString("fr-MA")} DH</strong></td>
        <td>${p.stock}</td>
        <td><span class="status ${p.is_published ? 'published' : 'draft'}">${p.is_published ? 'En ligne' : 'Brouillon'}</span></td>
        <td>
          <div style="display:flex; gap:8px;">
            <button class="btn-secondary" style="padding:6px 12px; font-size:11px;" data-edit-product="${p.id}">Modifier</button>
            <button class="btn-secondary" style="padding:6px 12px; font-size:11px; background:#8a3224;" data-delete-product="${p.id}">Supprimer</button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-edit-product]").forEach(b => b.onclick = () => editProduct(b.dataset.editProduct));
    tbody.querySelectorAll("[data-delete-product]").forEach(b => b.onclick = () => deleteProduct(b.dataset.deleteProduct));
  } catch (e) {
    fail(e);
  }
}

function showProductForm(p = null) {
  $("#product-form").hidden = false;
  $("#product-form-title").textContent = p ? "Modifier le produit" : "Nouveau produit";
  $("#product-id").value = p?.id || "";
  $("#product-name").value = p?.name_fr || "";
  $("#product-name-ar").value = p?.name_ar || "";
  $("#product-slug").value = p?.slug || "";
  $("#product-category").value = p?.category || "Caftan";
  $("#product-price").value = p?.price_mad ?? "";
  $("#product-stock").value = p?.stock ?? 1;
  $("#product-image").value = p?.image_url || "";
  $("#product-badge").value = p?.badge || "";
  $("#product-description").value = p?.description_fr || "";
  $("#product-description-ar").value = p?.description_ar || "";
  $("#product-published").checked = p?.is_published ?? true;
  $("#product-form").scrollIntoView({ behavior: "smooth", block: "start" });
}

function editProduct(id) {
  showProductForm(products.find(p => p.id === id));
}

function hideProductForm() {
  $("#product-form").hidden = true;
  $("#product-form").reset();
  $("#product-id").value = "";
}

async function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p || !confirm(`Supprimer définitivement « ${p.name_fr} » ?`)) return;
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) return fail(error);
  showToast("Produit supprimé.");
  await loadProducts();
  await refreshOverview();
}

async function saveProduct(event) {
  event.preventDefault();
  const id = $("#product-id").value;
  const name = $("#product-name").value.trim();
  const record = {
    name_fr: name,
    name_ar: $("#product-name-ar").value.trim(),
    slug: safeSlug($("#product-slug").value || name),
    category: $("#product-category").value,
    price_mad: Number($("#product-price").value),
    stock: Number($("#product-stock").value),
    image_url: $("#product-image").value.trim() || null,
    badge: $("#product-badge").value.trim(),
    description_fr: $("#product-description").value.trim(),
    description_ar: $("#product-description-ar").value.trim(),
    is_published: $("#product-published").checked
  };

  const result = id
    ? await client.from("products").update(record).eq("id", id)
    : await client.from("products").insert(record);

  if (result.error) return fail(result.error);
  showToast("Produit enregistré avec succès.");
  hideProductForm();
  await loadProducts();
  await refreshOverview();
}

// GESTION DES LANDING PAGES NO-CODE
async function loadPages() {
  const list = $("#pages-list");
  if (!list) return;

  // Depuis Supabase
  let loadedPages = [];
  if (client) {
    try {
      const { data } = await client.from("landing_pages").select("*").order("updated_at", { ascending: false });
      if (data) loadedPages = data;
    } catch {}
  }

  // Fusion avec pages No-Code locales
  const localPages = JSON.parse(localStorage.getItem("boutiblanca_nocode_pages") || "[]");
  const allPages = [...localPages, ...loadedPages];

  if (!allPages.length) {
    list.innerHTML = '<p style="grid-column:1/-1; color:var(--admin-muted); font-size:12px;">Aucune page créée pour l\'instant.</p>';
    return;
  }

  list.innerHTML = allPages.map(p => `
    <article style="background:#fff; border:1px solid var(--admin-line); border-radius:var(--radius-sm); padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:8px;">
        <h4 style="font-size:15px; font-weight:700;">${escapeHtml(p.title)}</h4>
        <span class="status published">En ligne</span>
      </div>
      <p style="font-size:11px; color:var(--admin-muted); margin-bottom:12px;">URL : /${escapeHtml(p.slug)}</p>
      <div style="display:flex; gap:8px;">
        <a class="btn-secondary" style="padding:6px 12px; font-size:11px;" href="./index.html#collection" target="_blank">Aperçu ↗</a>
      </div>
    </article>
  `).join("");
}

function initPagesStudio() {
  const form = $("#nocode-page-builder-form");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = $("#builder-page-title").value.trim();
      const slug = safeSlug($("#builder-page-slug").value || title);
      const cover = $("#builder-page-cover").value.trim();
      const category = $("#builder-page-category").value;
      const message = $("#builder-page-message").value.trim();

      const newPage = { id: "page-" + Date.now(), title, slug, cover, category, message, createdAt: new Date().toLocaleDateString("fr-MA") };
      const localPages = JSON.parse(localStorage.getItem("boutiblanca_nocode_pages") || "[]");
      localPages.push(newPage);
      localStorage.setItem("boutiblanca_nocode_pages", JSON.stringify(localPages));

      form.reset();
      loadPages();
      showToast(`Landing page « ${title} » créée avec succès !`);
    };
  }
}

// GESTION DES COMMANDES SUPABASE
async function loadOrders() {
  if (!client) return;
  try {
    const { data, error } = await client.from("orders").select("*").order("created_at", { ascending: false }).limit(100);
    if (error) return fail(error);
    orders = data || [];
    const tbody = $("#orders-table");
    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="7" style="padding:20px; text-align:center; color:var(--admin-muted);">Aucune commande en attente.</td></tr>';
      return;
    }
    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${escapeHtml(o.order_number || o.id.slice(0, 8))}</strong></td>
        <td>${escapeHtml(o.customer_name)}</td>
        <td><a href="https://wa.me/${escapeHtml(o.customer_phone).replace(/\D/g, '')}" target="_blank" style="color:#25d366; font-weight:700;">💬 ${escapeHtml(o.customer_phone)}</a></td>
        <td><strong>${Number(o.total_mad).toLocaleString("fr-MA")} DH</strong></td>
        <td>
          <select data-order-status="${o.id}" style="padding:5px 8px; font-size:11px;">
            <option ${o.status === "pending" ? "selected" : ""} value="pending">À confirmer</option>
            <option ${o.status === "confirmed" ? "selected" : ""} value="confirmed">Confirmée</option>
            <option ${o.status === "preparing" ? "selected" : ""} value="preparing">En préparation</option>
            <option ${o.status === "shipped" ? "selected" : ""} value="shipped">Expédiée</option>
            <option ${o.status === "delivered" ? "selected" : ""} value="delivered">Livrée</option>
            <option ${o.status === "cancelled" ? "selected" : ""} value="cancelled">Annulée</option>
          </select>
        </td>
        <td>${new Date(o.created_at).toLocaleDateString("fr-MA")}</td>
        <td><button class="btn-secondary" style="padding:5px 10px; font-size:10px;" data-view-order="${o.id}">Détails</button></td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-order-status]").forEach(s => s.onchange = async () => {
      const { error } = await client.from("orders").update({ status: s.value }).eq("id", s.dataset.orderStatus);
      if (error) fail(error);
      else showToast("Statut mis à jour.");
    });

    tbody.querySelectorAll("[data-view-order]").forEach(b => b.onclick = () => {
      const o = orders.find(x => x.id === b.dataset.viewOrder);
      alert(`Client : ${o.customer_name}\nTéléphone : ${o.customer_phone}\nVille : ${o.city || "Maroc"}\nAdresse : ${o.shipping_address}\nArticles : ${JSON.stringify(o.items, null, 2)}`);
    });
  } catch (e) {
    fail(e);
  }
}

// STUDIO THÈME NO-CODE
function initThemeStudio() {
  const savedTheme = JSON.parse(localStorage.getItem("boutiblanca_theme_settings") || "null") || PRESET_PALETTES.gold;
  $("#picker-gold").value = savedTheme.goldPrimary;
  $("#hex-gold").value = savedTheme.goldPrimary;
  $("#picker-bg").value = savedTheme.bgCanvas;
  $("#hex-bg").value = savedTheme.bgCanvas;
  $("#picker-text").value = savedTheme.textMain;
  $("#hex-text").value = savedTheme.textMain;
  $("#picker-accent").value = savedTheme.accentColor;
  $("#hex-accent").value = savedTheme.accentColor;
  $("#select-font").value = savedTheme.fontSerif;

  function bindPicker(pId, hId) {
    $(`#${pId}`).oninput = (e) => $(`#${hId}`).value = e.target.value;
    $(`#${hId}`).onchange = (e) => $(`#${pId}`).value = e.target.value;
  }
  bindPicker("picker-gold", "hex-gold");
  bindPicker("picker-bg", "hex-bg");
  bindPicker("picker-text", "hex-text");
  bindPicker("picker-accent", "hex-accent");

  $$(".preset-card").forEach(card => {
    card.onclick = () => {
      const p = PRESET_PALETTES[card.dataset.preset];
      if (!p) return;
      $$(".preset-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      $("#picker-gold").value = p.goldPrimary;
      $("#hex-gold").value = p.goldPrimary;
      $("#picker-bg").value = p.bgCanvas;
      $("#hex-bg").value = p.bgCanvas;
      $("#picker-text").value = p.textMain;
      $("#hex-text").value = p.textMain;
      $("#picker-accent").value = p.accentColor;
      $("#hex-accent").value = p.accentColor;
      $("#select-font").value = p.fontSerif;
      saveTheme();
      showToast(`Palette « ${card.querySelector(".preset-name").textContent} » appliquée !`);
    };
  });

  $("#btn-save-theme").onclick = () => {
    saveTheme();
    showToast("Thème enregistré et appliqué à la boutique !");
  };
}

function saveTheme() {
  const theme = {
    goldPrimary: $("#hex-gold").value.trim(),
    bgCanvas: $("#hex-bg").value.trim(),
    textMain: $("#hex-text").value.trim(),
    accentColor: $("#hex-accent").value.trim(),
    fontSerif: $("#select-font").value
  };
  localStorage.setItem("boutiblanca_theme_settings", JSON.stringify(theme));
  refreshPreviewFrame();
}

// STUDIO PHOTOS & CONTENUS NO-CODE
function initContentStudio() {
  const savedContent = JSON.parse(localStorage.getItem("boutiblanca_content_settings") || "null");
  if (savedContent) {
    if (savedContent.announcementText) $("#announcement-input").value = savedContent.announcementText;
    if (savedContent.whatsappNumber) $("#whatsapp-input").value = savedContent.whatsappNumber;
    if (savedContent.heroTitle) $("#hero-title-input").value = savedContent.heroTitle;
    if (savedContent.heroDesc) $("#hero-desc-input").value = savedContent.heroDesc;
    if (savedContent.heroImage) $("#hero-image-input").value = savedContent.heroImage;
  }

  $$(".photo-preset-thumb").forEach(thumb => {
    thumb.onclick = () => {
      $$(".photo-preset-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      $("#hero-image-input").value = thumb.src;
      saveContent();
      showToast("Nouvelle photo Hero appliquée en 1 clic !");
    };
  });

  $("#btn-save-content").onclick = () => {
    saveContent();
    showToast("Contenus enregistrés et synchronisés avec la boutique !");
  };
}

function saveContent() {
  const content = {
    announcementText: $("#announcement-input").value.trim(),
    whatsappNumber: $("#whatsapp-input").value.trim(),
    heroTitle: $("#hero-title-input").value.trim(),
    heroDesc: $("#hero-desc-input").value.trim(),
    heroImage: $("#hero-image-input").value.trim()
  };
  localStorage.setItem("boutiblanca_content_settings", JSON.stringify(content));
  refreshPreviewFrame();
}

function refreshPreviewFrame() {
  const iframe = $("#live-preview-iframe");
  if (iframe) iframe.src = "./index.html?ts=" + Date.now();
}

// ÉCOUTEURS D'INITIALISATION
document.addEventListener("DOMContentLoaded", async () => {
  initThemeStudio();
  initContentStudio();
  initPagesStudio();

  $$(".nav-item").forEach(b => b.onclick = () => setView(b.dataset.view));
  $$("[data-go]").forEach(b => b.onclick = () => setView(b.dataset.go));

  $("#login-form").onsubmit = async (e) => {
    e.preventDefault();
    if (!ready) {
      $("#auth-message").textContent = "Configurez SUPABASE_URL et SUPABASE_ANON_KEY dans supabase-config.js.";
      return;
    }
    $("#auth-message").textContent = "Connexion en cours…";
    const { data, error } = await client.auth.signInWithPassword({
      email: $("#email").value.trim(),
      password: $("#password").value
    });
    if (error) {
      $("#auth-message").textContent = error.message;
      return;
    }
    await ensureAdmin(data.session);
  };

  $("#logout-button").onclick = async () => {
    if (client) await client.auth.signOut();
    location.reload();
  };

  $("#new-product").onclick = () => showProductForm();
  $("#cancel-product").onclick = hideProductForm;
  $("#cancel-product-2").onclick = hideProductForm;
  $("#product-form").onsubmit = saveProduct;
  $("#product-name").oninput = () => {
    if (!$("#product-id").value) $("#product-slug").value = safeSlug($("#product-name").value);
  };

  const btnRefresh = $("#btn-refresh-preview");
  if (btnRefresh) btnRefresh.onclick = refreshPreviewFrame;

  // Vérification de la session active
  if (client) {
    const { data: { session } } = await client.auth.getSession();
    if (session) {
      await ensureAdmin(session);
    } else {
      $("#auth-screen").hidden = false;
      $("#admin-app").hidden = true;
    }
    client.auth.onAuthStateChange((_evt, sess) => {
      if (!sess) {
        $("#auth-screen").hidden = false;
        $("#admin-app").hidden = true;
      }
    });
  }
});
