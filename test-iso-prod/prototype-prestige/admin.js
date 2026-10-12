// ==========================================================================
// BOUTIBLANCA ADMIN — STUDIO NO-CODE JS
// Gestion des Thèmes, Photos, Pages, WhatsApp & Catalogue
// ==========================================================================

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const PRESET_PALETTES = {
  gold: {
    goldPrimary: "#c5a059",
    bgCanvas: "#faf7f2",
    textMain: "#1d1a16",
    accentColor: "#1b3b2e",
    fontSerif: '"Playfair Display", "Cinzel", Georgia, serif'
  },
  ebony: {
    goldPrimary: "#dfba73",
    bgCanvas: "#12100e",
    textMain: "#faf7f2",
    accentColor: "#9a742f",
    fontSerif: '"Cinzel", "Playfair Display", serif'
  },
  emerald: {
    goldPrimary: "#c5a059",
    bgCanvas: "#f4f7f5",
    textMain: "#161412",
    accentColor: "#18382b",
    fontSerif: '"Playfair Display", "Cinzel", Georgia, serif'
  },
  majorelle: {
    goldPrimary: "#e0b464",
    bgCanvas: "#f6f8fb",
    textMain: "#101524",
    accentColor: "#172d54",
    fontSerif: '"Playfair Display", "Cinzel", Georgia, serif'
  },
  terracotta: {
    goldPrimary: "#c5a059",
    bgCanvas: "#fbf8f5",
    textMain: "#1c1512",
    accentColor: "#a44c34",
    fontSerif: '"Playfair Display", "Cinzel", Georgia, serif'
  }
};

function showToast(msg = "Modifications enregistrées avec succès !") {
  const toast = $("#admin-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// GESTION DES ONGLETS
function initTabs() {
  $$(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      $$(".nav-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      $$(".view-section").forEach(sec => sec.classList.remove("active"));
      const targetSec = $(`#view-${tab}`);
      if (targetSec) targetSec.classList.add("active");

      const titles = {
        theme: "Studio Thème & Couleurs",
        content: "Contenus & Photos Storefront",
        pages: "Éditeur de Pages No-Code",
        products: "Catalogue des 20 Articles",
        orders: "Commandes Clients",
        preview: "Aperçu Boutique en Direct"
      };
      $("#topbar-title").textContent = titles[tab] || "Administration";

      if (tab === "preview") refreshPreviewFrame();
    });
  });
}

// CHARGEMENT ET SAUVEGARDE DU THÈME NO-CODE
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

  // Lier color picker avec champ texte
  function bindPicker(pickerId, hexId) {
    $(`#${pickerId}`).addEventListener("input", (e) => {
      $(`#${hexId}`).value = e.target.value;
      saveTheme();
    });
    $(`#${hexId}`).addEventListener("change", (e) => {
      $(`#${pickerId}`).value = e.target.value;
      saveTheme();
    });
  }

  bindPicker("picker-gold", "hex-gold");
  bindPicker("picker-bg", "hex-bg");
  bindPicker("picker-text", "hex-text");
  bindPicker("picker-accent", "hex-accent");

  $("#select-font").addEventListener("change", saveTheme);

  // Clic sur une palette prédéfinie
  $$(".preset-card").forEach(card => {
    card.addEventListener("click", () => {
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
    });
  });
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

// CHARGEMENT ET SAUVEGARDE DES CONTENUS ET PHOTOS
function initContentStudio() {
  const savedContent = JSON.parse(localStorage.getItem("boutiblanca_content_settings") || "null");
  if (savedContent) {
    if (savedContent.announcementText) $("#announcement-input").value = savedContent.announcementText;
    if (savedContent.whatsappNumber) $("#whatsapp-input").value = savedContent.whatsappNumber;
    if (savedContent.heroTitle) $("#hero-title-input").value = savedContent.heroTitle;
    if (savedContent.heroDesc) $("#hero-desc-input").value = savedContent.heroDesc;
    if (savedContent.heroImage) $("#hero-image-input").value = savedContent.heroImage;
  }

  // Clic sur une photo prédéfinie
  $$(".photo-preset-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      $$(".photo-preset-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      $("#hero-image-input").value = thumb.src;
      saveContent();
      showToast("Nouvelle photo Hero appliquée en 1 clic !");
    });
  });

  $("#hero-image-input").addEventListener("change", saveContent);
  $("#announcement-input").addEventListener("change", saveContent);
  $("#whatsapp-input").addEventListener("change", saveContent);
  $("#hero-title-input").addEventListener("change", saveContent);
  $("#hero-desc-input").addEventListener("change", saveContent);
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

// ÉDITEUR DE PAGES NO-CODE
function initPagesStudio() {
  const form = $("#nocode-page-builder-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = $("#builder-page-title").value.trim();
      const slug = $("#builder-page-slug").value.trim();
      const cover = $("#builder-page-cover").value.trim();
      const category = $("#builder-page-category").value;
      const message = $("#builder-page-message").value.trim();

      const newPage = {
        id: "page-" + Date.now(),
        title,
        slug,
        cover,
        category,
        message,
        createdAt: new Date().toLocaleDateString("fr-MA")
      };

      const pages = JSON.parse(localStorage.getItem("boutiblanca_nocode_pages") || "[]");
      pages.push(newPage);
      localStorage.setItem("boutiblanca_nocode_pages", JSON.stringify(pages));

      form.reset();
      renderPagesList();
      showToast(`Landing page « ${title} » créée avec succès !`);
    });
  }

  renderPagesList();
}

function renderPagesList() {
  const container = $("#admin-pages-list");
  if (!container) return;
  const pages = JSON.parse(localStorage.getItem("boutiblanca_nocode_pages") || "[]");

  if (pages.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; color: var(--admin-muted); font-size: 12px; padding: 15px 0;">Aucune page créée pour l'instant. Utilisez le formulaire ci-dessus pour lancer votre première landing page.</p>`;
    return;
  }

  container.innerHTML = pages.map(p => `
    <div style="border: 1px solid var(--admin-line); border-radius: var(--radius-sm); padding: 16px; background: #fff;">
      <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 10px;">
        <img src="${p.cover}" alt="${p.title}" style="width: 50px; height: 65px; object-fit: cover; border-radius: 4px;" />
        <div>
          <h4 style="font-size: 14px; margin-bottom: 3px;">${p.title}</h4>
          <span style="font-size: 11px; color: var(--admin-muted);">URL : /${p.slug} · Filtre : ${p.category}</span>
        </div>
      </div>
      <p style="font-size: 11px; color: var(--admin-muted); margin-bottom: 12px; line-height: 1.5;">${p.message || "Sélection spéciale"}</p>
      <div style="display: flex; gap: 8px;">
        <a class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" href="./index.html#collection" target="_blank">Aperçu ↗</a>
        <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px; background: #8b3426;" onclick="deleteNocodePage('${p.id}')">Supprimer</button>
      </div>
    </div>
  `).join("");
}

window.deleteNocodePage = function(id) {
  let pages = JSON.parse(localStorage.getItem("boutiblanca_nocode_pages") || "[]");
  pages = pages.filter(p => p.id !== id);
  localStorage.setItem("boutiblanca_nocode_pages", JSON.stringify(pages));
  renderPagesList();
  showToast("Page supprimée.");
};

// CATALOGUE DES 20 PRODUITS
function initProductsStudio() {
  const tbody = $("#admin-products-table-body");
  if (!tbody) return;

  // Récupérer les 20 produits
  const list = window.INITIAL_PRODUCTS_FOR_ADMIN || [
    { id: "caftan-jawhara-royal", name: "Caftan Royal Jawhara", category: "Caftan", price: 3200, badge: "Broderie Skalli Or", image: "https://i.pinimg.com/originals/b0/82/9a/b0829aff252d5c80d5798fd5d9fae49a.jpg" },
    { id: "caftan-mobra-emeraude", name: "Caftan Mobra Émeraude", category: "Caftan", price: 2850, badge: "Velours Royal", image: "https://i.pinimg.com/736x/1d/5a/f1/1d5af1b27361dacfc665bf12d078436f.jpg" },
    { id: "caftan-bleu-majorelle", name: "Caftan Saphir Majorelle", category: "Caftan", price: 2600, badge: "Édition Prestige", image: "https://www.shutterstock.com/shutterstock/photos/2266636325/display_1500/stock-photo-caftan-marocain-caftan-arabe-culture-traditionnel-maroc-2266636325.jpg" },
    { id: "caftan-nude-poudre", name: "Caftan Nude Perlé", category: "Caftan", price: 2950, badge: "Coup de Cœur", image: "https://nalou.fr/wp-content/uploads/2024/07/caftan-marocain-2.jpg" },
    { id: "takchita-princesse-blanche", name: "Takchita Blanche & Or", category: "Takchita", price: 4600, badge: "Haute Couture", image: "https://i.pinimg.com/736x/93/f1/3d/93f13df4035c63fec4ba8f0a59644bc9.jpg" },
    { id: "takchita-brocart-saphir", name: "Takchita Brocart Saphir", category: "Takchita", price: 3950, badge: "Pièce Unique", image: "https://s-media-cache-ak0.pinimg.com/736x/d6/9a/4b/d69a4bd68f9626b43c3dafdcc9f2cccf.jpg" },
    { id: "takchita-rubis-imperial", name: "Takchita Rubis Impérial", category: "Takchita", price: 4200, badge: "Édition Limitée", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80" },
    { id: "takchita-reine-saba", name: "Takchita Ivoire Céleste", category: "Takchita", price: 4800, badge: "Prestige Cérémonie", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" },
    { id: "jellaba-randa-amande", name: "Jellaba Randa Vert Amande", category: "Jellaba", price: 1250, badge: "Fait Main", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" },
    { id: "jellaba-sousdi-blanche", name: "Jellaba Sousdi Pure Blanche", category: "Jellaba", price: 980, badge: "Intemporel", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80" },
    { id: "jellaba-velours-nocturne", name: "Jellaba Velours Nuit", category: "Jellaba", price: 1450, badge: "Hiver Élégant", image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=800&q=80" },
    { id: "jellaba-lin-terracotta", name: "Jellaba Lin Terre de Sienne", category: "Jellaba", price: 890, badge: "Tendance 2026", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: "foulard-soie-zellige", name: "Foulard Soie Motif Zellige", category: "Foulard", price: 380, badge: "100% Soie Pure", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80" },
    { id: "foulard-mousseline-dore", name: "Foulard Mousseline Liseré Doré", category: "Foulard", price: 290, badge: "Doux & Léger", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
    { id: "foulard-medina-emeraude", name: "Foulard Médina Satin Émeraude", category: "Foulard", price: 350, badge: "Reflets Satinés", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80" },
    { id: "foulard-ceremonie-ivoire", name: "Foulard Cérémonie Ivoire & Perles", category: "Foulard", price: 420, badge: "Finition Perles", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80" },
    { id: "chale-cachemire-tarz", name: "Châle Cachemire Tarz Fassi", category: "Châle", price: 650, badge: "Broderie Artisanale", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80" },
    { id: "chale-pashmina-dore", name: "Châle Pashmina Moucharabieh", category: "Châle", price: 520, badge: "Chaleur & Prestige", image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80" },
    { id: "selham-royal-laine", name: "Selham Royal Laine Blanche", category: "Châle", price: 1850, badge: "Apparat Traditionnel", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" },
    { id: "gandora-soie-aqqad", name: "Gandora Chic Soie & Aqqad", category: "Châle", price: 790, badge: "Confort Royal", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80" }
  ];

  tbody.innerHTML = list.map(item => `
    <tr>
      <td>
        <div class="td-product-info">
          <img class="td-img" src="${item.image}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <div style="font-size: 11px; color: var(--admin-muted);">${item.id}</div>
          </div>
        </div>
      </td>
      <td>${item.category}</td>
      <td><strong>${item.price} DH</strong></td>
      <td><span style="background: rgba(197, 160, 89, 0.15); color: #8a6519; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 700;">${item.badge}</span></td>
      <td>
        <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="promptEditPrice('${item.id}', ${item.price})">Ajuster Prix</button>
      </td>
    </tr>
  `).join("");
}

window.promptEditPrice = function(id, oldPrice) {
  const newPrice = prompt(`Nouveau prix en DH pour ${id} :`, oldPrice);
  if (newPrice && !isNaN(newPrice)) {
    showToast(`Prix de ${id} mis à jour : ${newPrice} DH`);
  }
};

// RAFRAÎCHISSEMENT DU CADRE D'APERÇU DIRECT
function refreshPreviewFrame() {
  const iframe = $("#live-preview-iframe");
  if (iframe) {
    iframe.src = "./index.html?ts=" + Date.now();
  }
}

// INITIALISATION GLOBALE
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initThemeStudio();
  initContentStudio();
  initPagesStudio();
  initProductsStudio();

  $("#btn-save-all-top").addEventListener("click", () => {
    saveTheme();
    saveContent();
    showToast("Toutes vos modifications No-Code ont été appliquées !");
  });

  const btnRefresh = $("#btn-refresh-preview");
  if (btnRefresh) btnRefresh.addEventListener("click", refreshPreviewFrame);
});
