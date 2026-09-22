/* ==========================================================================
   views.js — Icônes SVG + vues (template HTML) de la boutique
   ========================================================================== */
var ICONS = {
  cart: '<circle cx="9" cy="21" r="1.4"/><circle cx="20" cy="21" r="1.4"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  right: '<path d="M9 18l6-6-6-6"/>',
  left: '<path d="M15 18l-6-6 6-6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  truck: '<rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.4"/>',
  package: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
  card: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  zoom: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8L16.5 19.5l1.8-.7L19 17z"/>',
  headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  shirt: '<path d="M16 2l4 2v6h-3v12H7V10H4V4l4-2 4 2 4-2z"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
  droplet: '<path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.3 0L12 2.7z"/>',
  bag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
  credit: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  whatsapp: '<path fill="currentColor" stroke="none" d="M12.04 2A9.9 9.9 0 0 0 3.6 17.2L2 22l4.94-1.55A9.9 9.9 0 1 0 12.04 2zm5.77 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.96 0-1.4.73-2.09 1-2.38.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.15.48.22.55.34.07.13.07.75-.17 1.43z"/>',
  facebook: '<path fill="currentColor" stroke="none" d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.29-.04-1.27-.12-2.42-.12-2.4 0-4.03 1.46-4.03 4.14v2.32H7.5V14h2.75v8h3.25z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>',
  github: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.58 4.95.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/>'
};

function ic(nom, cls) {
  var d = ICONS[nom] || ICONS.info;
  return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
}

/* ------------------------- Petits composants ------------------------- */
function etoiles(note, nb, taille) {
  var plein = Math.round(note);
  var html = '<div class="stars"' + (taille ? ' style="font-size:' + taille + '"' : '') + '>';
  for (var i = 1; i <= 5; i++) {
    html += '<span class="' + (i <= plein ? '' : 'empty-star') + '">' + ic('star') + '</span>';
  }
  html += '<b style="margin-left:3px">' + note.toFixed(1).replace('.', ',') + '</b>';
  if (nb != null) html += '<span style="margin-left:2px">(' + nb + ' avis)</span>';
  return html + '</div>';
}
function pastilleStock(produit) {
  if (produit.stock <= 0) return '<span class="stock-tag out"><i></i>Rupture de stock</span>';
  if (produit.stock <= 8) return '<span class="stock-tag low"><i></i>Plus que ' + produit.stock + ' en stock</span>';
  return '<span class="stock-tag"><i></i>En stock (' + produit.stock + ')</span>';
}
function prixHTML(produit) {
  var html = '<div class="price">' + fmCourt(produit.prix) + ' <small>' + DEVISE + '</small></div>';
  if (produit.ancienPrix) html += '<span class="price-old">' + fmCourt(produit.ancienPrix) + '</span>';
  return html;
}
function badgesProduit(produit) {
  var html = '';
  if (produit.badge) {
    var cls = 'pill-gold';
    if (produit.badge === 'Promo') cls = 'pill-red';
    if (produit.badge === 'Nouveau') cls = 'pill-blue';
    if (produit.badge === 'Bio' || produit.badge === 'Artisanal' || produit.badge === 'Fait main') cls = 'pill-green';
    html += '<span class="pill ' + cls + '">' + echappe(produit.badge) + '</span>';
  }
  if (produit.ancienPrix) html += '<span class="pill pill-red">-' + remisePct(produit) + ' %</span>';
  return html;
}

function carteProduit(produit) {
  var st = noteProduit(produit);
  var fav = estFavori(produit.id);
  return `
  <article class="pcard">
    <div class="pcard-media">
      <a href="#/produit/${produit.slug}" aria-label="${echappe(produit.nom)}">
        <img src="${produit.images[0].src}" alt="${echappe(produit.nom)}" loading="lazy" decoding="async">
      </a>
      <div class="pcard-badges">${badgesProduit(produit)}</div>
      <button class="fav-btn ${fav ? 'on' : ''}" data-action="favori" data-id="${produit.id}"
        aria-label="Ajouter aux favoris" title="${fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">${ic('heart')}</button>
      <div class="quick-add">
        <a class="btn btn-gold btn-sm btn-block" href="#/produit/${produit.slug}">${ic('eye')} Voir le produit</a>
      </div>
    </div>
    <div class="pcard-body">
      <span class="pcard-cat">${echappe(CAT_LABEL[produit.cat])}</span>
      <h3><a href="#/produit/${produit.slug}">${echappe(produit.nom)}</a></h3>
      ${etoiles(st.note, st.nb)}
      <div class="price-row">${prixHTML(produit)}</div>
      ${pastilleStock(produit)}
    </div>
  </article>`;
}

/* ------------------------- Accueil ------------------------- */
function vueAccueil() {
  var populaires = PRODUITS.slice().sort(function (a, b) { return b.vendus - a.vendus; }).slice(0, 8);
  var nouveautes = PRODUITS.filter(function (p) { return p.badge === 'Nouveau' || p.badge === 'Top vente' || p.badge === 'Fait main'; }).slice(0, 4);
  var vedette = getProduit('bazin-riche-brode') || PRODUITS[0];
  var vus = State.vus.map(getProduit).filter(Boolean);

  return `
  <div class="view">
    <section class="wrap hero">
      <div>
        <div class="eyebrow">Boutique en ligne • Bamako, Mali</div>
        <h1>Le meilleur du <span>Mali</span>, livré chez vous</h1>
        <p>Tissus bazin et bogolan, prêt-à-porter wax, cosmétiques au karité et à l'huile de baobab, tech et
        maroquinerie artisanale. Commandez en ligne, payez par Orange Money ou à la livraison, partout au Mali.</p>
        <div class="hero-cta">
          <a class="btn btn-gold btn-lg" href="#/boutique">${ic('bag')} Découvrir la boutique</a>
          <a class="btn btn-ghost btn-lg" href="#/produit/${vedette.slug}">${ic('sparkles')} Produit vedette</a>
        </div>
        <div class="hero-stats">
          <div><b>${PRODUITS.length}</b><span>produits en ligne</span></div>
          <div><b>24 h</b><span>livraison Bamako</span></div>
          <div><b>4,7/5</b><span>note moyenne</span></div>
          <div><b>100 %</b><span>paiement sécurisé</span></div>
        </div>
      </div>
      <div class="hero-collage">
        <a href="#/boutique?cat=tissus"><img src="assets/img/produits/bazin.jpg" alt="Bazin riche brodé" loading="lazy" decoding="async"><span>Bazin &amp; Wax</span></a>
        <a href="#/produit/ecouteurs-sans-fil-pro"><img src="assets/img/produits/ecouteurs.jpg" alt="Écouteurs sans fil" loading="lazy" decoding="async"><span>Tech &amp; Audio</span></a>
        <a href="#/produit/beurre-karite-pur"><img src="assets/img/produits/karite.jpg" alt="Beurre de karité" loading="lazy" decoding="async"><span>Cosmétiques</span></a>
        <a href="#/produit/sac-cuir-artisanal"><img src="assets/img/produits/sac-cuir.jpg" alt="Sac en cuir artisanal" loading="lazy" decoding="async"><span>Maroquinerie artisanale</span></a>
      </div>
    </section>

    <section class="wrap" style="margin-top:8px">
      <div class="reassure">
        <div>${ic('truck')}<span><b>Livraison rapide</b><small>Bamako en 24 h, régions 48-72 h</small></span></div>
        <div>${ic('phone')}<span><b>Paiement mobile</b><small>Orange Money, Moov Money ou à la livraison</small></span></div>
        <div>${ic('shield')}<span><b>Achat protégé</b><small>Garantie 7 jours, retour simple</small></span></div>
        <div>${ic('whatsapp')}<span><b>Support WhatsApp</b><small>Conseil et suivi de commande en direct</small></span></div>
      </div>
    </section>

    <section class="wrap" style="margin-top:34px">
      <div class="section-head">
        <div><h2>Catégories</h2><p>Parcourez la boutique par univers</p></div>
      </div>
      <div class="cats">
        ${CATEGORIES.map(function (c) {
          var nb = PRODUITS.filter(function (p) { return p.cat === c.id; }).length;
          return `<a class="cat-card" href="#/boutique?cat=${c.id}">
            <span class="ico">${ic(c.icone)}</span>
            <b>${c.nom}</b>
            <small>${c.desc} • ${nb} produit${nb > 1 ? 's' : ''}</small>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="wrap">
      <div class="section-head">
        <div><h2>Les plus vendus</h2><p>Les coups de cœur de nos clients</p></div>
        <a class="link-more" href="#/boutique">Voir tout le catalogue ${ic('arrow')}</a>
      </div>
      <div class="grid-products">${populaires.map(carteProduit).join('')}</div>
    </section>

    <section class="wrap">
      <div class="section-head">
        <div><h2>Nouveautés &amp; pièces artisanales</h2><p>Sélection du moment</p></div>
      </div>
      <div class="grid-products">${nouveautes.map(carteProduit).join('')}</div>
    </section>

    <section class="wrap">
      <div class="section-head">
        <div><h2>Avis clients</h2><p>Des clients satisfaits partout au Mali</p></div>
      </div>
      <div class="grid-products" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
        ${TEMOIGNAGES.map(function (t) {
          return `<div class="panel">
            <div class="row" style="gap:12px;align-items:center">
              <span class="avatar">${initiales(t.nom)}</span>
              <span><b style="font-size:12.5px;color:#fff">${echappe(t.nom)}</b><br><small class="muted" style="font-size:10.5px">${echappe(t.ville)}</small></span>
            </div>
            <div class="mt-8">${etoiles(t.note)}</div>
            <p class="mt-8" style="font-size:12.5px;color:#cbd5e1;line-height:1.75">« ${echappe(t.texte)} »</p>
          </div>`;
        }).join('')}
      </div>
    </section>

    ${vus.length ? `<section class="wrap">
      <div class="section-head"><div><h2>Déjà consultés</h2><p>Reprenez où vous étiez</p></div></div>
      <div class="grid-products">${vus.map(carteProduit).join('')}</div>
    </section>` : ''}

    <section class="wrap">
      <div class="demo-strip">
        ${ic('info')}
        <span>
          <b>Boutique de démonstration — projet portfolio</b>
          <p>Panier, favoris, recherche, filtres, paiement et comptes clients sont fonctionnels et persistants
          (localStorage). Aucune transaction réelle n'est effectuée : c'est une démonstration front-end par
          Moussa N'tji Diallo, développeur Full Stack.</p>
        </span>
        <a class="btn btn-line" href="../index.html">Retour au portfolio ${ic('arrow')}</a>
      </div>
    </section>
  </div>`;
}

/* ------------------------- Catalogue ------------------------- */
function produitsFiltres() {
  var f = State.filtres;
  var q = f.q.trim().toLowerCase();
  var liste = PRODUITS.filter(function (p) {
    if (f.cat !== 'tous' && p.cat !== f.cat) return false;
    if (f.promo && !p.ancienPrix) return false;
    if (f.stock && p.stock <= 0) return false;
    if (!q) return true;
    var cible = (p.nom + ' ' + p.court + ' ' + CAT_LABEL[p.cat] + ' ' + Object.keys(p.caracteristiques).join(' ')).toLowerCase();
    return cible.indexOf(q) !== -1;
  });
  var tris = {
    populaire: function (a, b) { return b.vendus - a.vendus; },
    'prix-asc': function (a, b) { return a.prix - b.prix; },
    'prix-desc': function (a, b) { return b.prix - a.prix; },
    note: function (a, b) { return noteProduit(b).note - noteProduit(a).note; },
    nouveau: function (a, b) { return (b.badge === 'Nouveau') - (a.badge === 'Nouveau'); }
  };
  return liste.sort(tris[f.tri] || tris.populaire);
}

function vueBoutique() {
  var f = State.filtres;
  var liste = produitsFiltres();
  return `
  <div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Catalogue</span>${f.cat !== 'tous' ? ic('right') + '<span>' + CAT_LABEL[f.cat] + '</span>' : ''}</div>
    <div class="section-head" style="margin-top:6px">
      <div>
        <h2>${f.cat === 'tous' ? 'Tous les produits' : echappe(CAT_LABEL[f.cat])}</h2>
        <p>${liste.length} produit${liste.length > 1 ? 's' : ''} affiché${liste.length > 1 ? 's' : ''}${f.q ? ' pour « ' + echappe(f.q) + ' »' : ''}</p>
      </div>
    </div>

    <div class="toolbar">
      <div class="chips">
        <button class="chip ${f.cat === 'tous' ? 'active' : ''}" data-action="filtre-cat" data-cat="tous">Tout</button>
        ${CATEGORIES.map(function (c) {
          return `<button class="chip ${f.cat === c.id ? 'active' : ''}" data-action="filtre-cat" data-cat="${c.id}">${c.nom}</button>`;
        }).join('')}
      </div>
      <div class="row" style="gap:8px">
        <label class="check-row"><input type="checkbox" data-action="filtre-promo" ${f.promo ? 'checked' : ''}> Promo</label>
        <label class="check-row"><input type="checkbox" data-action="filtre-stock" ${f.stock ? 'checked' : ''}> En stock</label>
        <select class="input select-sm" data-action="tri">
          <option value="populaire" ${f.tri === 'populaire' ? 'selected' : ''}>Plus vendus</option>
          <option value="prix-asc" ${f.tri === 'prix-asc' ? 'selected' : ''}>Prix croissant</option>
          <option value="prix-desc" ${f.tri === 'prix-desc' ? 'selected' : ''}>Prix décroissant</option>
          <option value="note" ${f.tri === 'note' ? 'selected' : ''}>Mieux notés</option>
          <option value="nouveau" ${f.tri === 'nouveau' ? 'selected' : ''}>Nouveautés</option>
        </select>
      </div>
    </div>

    ${liste.length
      ? `<div class="grid-products">${liste.map(carteProduit).join('')}</div>`
      : `<div class="empty">${ic('search')}<h3>Aucun produit trouvé</h3>
          <p>Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          <div class="mt-16"><button class="btn btn-gold" data-action="reset-filtres">Réinitialiser les filtres</button></div></div>`}

    <div class="demo-strip">
      ${ic('info')}
      <span><b>Filtres, recherche et tri fonctionnels</b>
      <p>La recherche explore le nom, la catégorie, la description et les caractéristiques techniques des produits.</p></span>
    </div>
  </div>`;
}

/* ------------------------- Fiche produit ------------------------- */
function vueProduit(produit) {
  var etat = State.produit || {};
  var choix = etat.choix || choixDefaut(produit);
  var qte = etat.qte || 1;
  var onglet = etat.onglet || 'description';
  var idx = etat.image || 0;
  var images = produit.images;
  var image = images[idx] || images[0];
  var st = noteProduit(produit);
  var prix = prixUnitaire(produit, choix);
  var similaires = PRODUITS.filter(function (p) { return p.cat === produit.cat && p.id !== produit.id; }).slice(0, 4);
  var avis = avisDe(produit);

  var styleImg = "background-image:url('" + image.src + "');background-size:" + (image.zoom * 100) + "%;background-position:" + image.pos;

  return `
  <div class="view wrap">
    <div class="breadcrumb">
      <a href="#/">Accueil</a>${ic('right')}
      <a href="#/boutique">Catalogue</a>${ic('right')}
      <a href="#/boutique?cat=${produit.cat}">${echappe(CAT_LABEL[produit.cat])}</a>${ic('right')}
      <span style="color:#e2e8f0">${echappe(produit.nom)}</span>
    </div>

    <div class="product">
      <div class="gallery">
        <div class="gallery-main">
          <div class="gal-badge">${badgesProduit(produit)}</div>
          <div id="galImg" class="gal-img zoom-img" style="${styleImg}" data-full="${image.src}"
            role="img" aria-label="${echappe(produit.nom)} — ${echappe(image.label)}"></div>
          ${images.length > 1 ? `
            <button class="gal-nav prev" data-action="gal-prev" aria-label="Image précédente">${ic('left')}</button>
            <button class="gal-nav next" data-action="gal-next" aria-label="Image suivante">${ic('right')}</button>` : ''}
          <span class="gal-zoom-hint">${ic('zoom')} Cliquez pour agrandir</span>
        </div>
        <div class="thumbs">
          ${images.map(function (im, i) {
            return `<button class="thumb ${i === idx ? 'active' : ''}" data-action="gal-img" data-index="${i}" title="${echappe(im.label)}">
              <img src="${im.src}" alt="${echappe(im.label)}" loading="lazy"><span>${echappe(im.label)}</span></button>`;
          }).join('')}
        </div>
      </div>

      <div class="product-info">
        <div class="eyebrow">${echappe(CAT_LABEL[produit.cat])} • Réf. ${produit.id}</div>
        <h1 class="mt-8">${echappe(produit.nom)}</h1>
        <div class="product-meta">
          ${etoiles(st.note, st.nb)}
          <span>• ${produit.vendus} vendus</span>
          ${pastilleStock(produit)}
        </div>
        <div class="price-block">
          <span class="price-lg">${fmCourt(prix)} ${DEVISE}</span>
          ${prix !== produit.prix ? `<span class="muted" style="font-size:11.5px">(base ${fmCourt(produit.prix)} ${DEVISE} + options)</span>` : ''}
          ${produit.ancienPrix && prix === produit.prix ? `<span class="price-old" style="font-size:14px">${fmCourt(produit.ancienPrix)} ${DEVISE}</span>` : ''}
          ${produit.ancienPrix && prix === produit.prix ? `<span class="save-pill">Vous économisez ${fmCourt(produit.ancienPrix - produit.prix)} ${DEVISE}</span>` : ''}
        </div>
        <p class="short-desc">${echappe(produit.court)}</p>

        ${(produit.options || []).map(function (o) {
          return `<div class="opt-group">
            <label>${echappe(o.nom)} : <b>${echappe(choix[o.nom])}</b></label>
            <div class="${o.type === 'swatch' ? 'swatches' : 'pills'}">
              ${o.valeurs.map(function (v) {
                var nom = valeurNom(v);
                var actif = choix[o.nom] === nom;
                if (o.type === 'swatch') {
                  return `<button class="swatch ${actif ? 'active' : ''}" data-action="option" data-option="${echappe(o.nom)}" data-valeur="${echappe(nom)}"
                    style="background:${v.hex || '#334155'}" title="${echappe(nom)}" aria-label="${echappe(nom)}"></button>`;
                }
                return `<button class="opt ${actif ? 'active' : ''}" data-action="option" data-option="${echappe(o.nom)}" data-valeur="${echappe(nom)}">
                  ${echappe(nom)}${valeurExtra(v) ? ' <span style="color:#facc15">' + (valeurExtra(v) > 0 ? '+' : '−') + fmCourt(Math.abs(valeurExtra(v))) + '</span>' : ''}
                </button>`;
              }).join('')}
            </div>
          </div>`;
        }).join('')}

        <div class="qty-row">
          <div class="qty">
            <button data-action="qte-moins" aria-label="Diminuer">${ic('minus')}</button>
            <input id="qteInput" type="number" min="1" max="${produit.stock}" value="${qte}" data-action="qte-set" aria-label="Quantité">
            <button data-action="qte-plus" aria-label="Augmenter">${ic('plus')}</button>
          </div>
          <span class="muted" style="font-size:11.5px">Total : <b style="color:var(--gold)">${fm(prix * qte)}</b></span>
        </div>

        <div class="buy-actions">
          <button class="btn btn-gold btn-lg" data-action="ajouter" data-slug="${produit.slug}">${ic('cart')} Ajouter au panier</button>
          <button class="btn btn-green btn-lg" data-action="acheter" data-slug="${produit.slug}">${ic('arrow')} Acheter maintenant</button>
          <button class="icon-btn ${estFavori(produit.id) ? 'on' : ''}" data-action="favori" data-id="${produit.id}"
            title="Favoris" aria-label="Ajouter aux favoris" style="${estFavori(produit.id) ? 'color:#fca5a5;border-color:rgba(248,113,113,.55)' : ''}">${ic('heart')}</button>
        </div>

        <div class="trust">
          <div>${ic('truck')}<span><b>Livraison 24 h à Bamako</b>Offerte dès ${fm(REGLES.francoDePort)} d'achat • ${fm(REGLES.livraisonStandard)} sinon</span></div>
          <div>${ic('phone')}<span><b>Paiement Orange Money / Moov Money</b>Ou paiement en espèces à la livraison</span></div>
          <div>${ic('shield')}<span><b>Garantie 7 jours</b>Produit non conforme ? Échange ou remboursement</span></div>
          <div>${ic('whatsapp')}<span><b>Une question ?</b>WhatsApp ${BOUTIQUE.telephone} — réponse en moins d'1 h</span></div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <div class="tab-head">
        <button class="tab-btn ${onglet === 'description' ? 'active' : ''}" data-action="onglet" data-onglet="description">Description</button>
        <button class="tab-btn ${onglet === 'caracteristiques' ? 'active' : ''}" data-action="onglet" data-onglet="caracteristiques">Caractéristiques</button>
        <button class="tab-btn ${onglet === 'avis' ? 'active' : ''}" data-action="onglet" data-onglet="avis">Avis (${avis.length})</button>
        <button class="tab-btn ${onglet === 'livraison' ? 'active' : ''}" data-action="onglet" data-onglet="livraison">Livraison &amp; retour</button>
      </div>
      <div class="tab-body">
        ${onglet === 'description' ? `
          ${produit.description.map(function (p) { return '<p>' + echappe(p) + '</p>'; }).join('<div style="height:12px"></div>')}
          <div class="mt-16 pills">
            ${Object.keys(produit.caracteristiques).slice(0, 3).map(function (k) {
              return '<span class="pill" style="border-color:var(--line-gold);color:var(--gold)">' + echappe(k) + '</span>';
            }).join('')}
          </div>` : ''}

        ${onglet === 'caracteristiques' ? `
          <table class="spec-table"><tbody>
            ${Object.keys(produit.caracteristiques).map(function (k) {
              return '<tr><td>' + echappe(k) + '</td><td>' + echappe(produit.caracteristiques[k]) + '</td></tr>';
            }).join('')}
          </tbody></table>` : ''}

        ${onglet === 'avis' ? `
          <div class="row" style="justify-content:space-between;align-items:flex-start">
            <div>${etoiles(st.note, st.nb, '15px')}<p class="muted mt-8" style="font-size:11.5px">Basé sur ${st.nb} avis vérifiés</p></div>
            <button class="btn btn-line btn-sm" data-action="ouvrir-avis-form">${ic('edit')} Donner mon avis</button>
          </div>
          <div id="avisFormBox" class="hidden mt-16">
            <div class="review-form">
              <div>
                <label class="muted" style="font-size:10.5px;letter-spacing:1.4px;text-transform:uppercase;font-weight:800">Votre note</label>
                <div class="star-picker mt-8" id="starPicker">
                  ${[1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-action="etoile" data-note="' + n + '">' + ic('star') + '</button>'; }).join('')}
                </div>
              </div>
              <input class="input" id="avisNom" placeholder="Votre nom" value="${State.user ? echappe(State.user.nom) : ''}">
              <textarea class="input" id="avisTexte" rows="3" placeholder="Partagez votre expérience sur ce produit..."></textarea>
              <div class="row"><button class="btn btn-gold" data-action="envoyer-avis" data-id="${produit.id}">Publier mon avis</button>
              <button class="btn btn-ghost" data-action="fermer-avis-form">Annuler</button></div>
            </div>
          </div>
          <div class="mt-16">
            ${avis.map(function (a) {
              return `<div class="review">
                <span class="avatar">${initiales(a.nom)}</span>
                <div class="grow">
                  <div class="row" style="justify-content:space-between">
                    <span><b>${echappe(a.nom)}</b> ${a.local ? '<span class="pill pill-green" style="margin-left:6px">Votre avis</span>' : ''}<br><small>${echappe(a.date)}</small></span>
                    <span>${etoiles(a.note)}</span>
                  </div>
                  <p>${echappe(a.texte)}</p>
                </div>
              </div>`;
            }).join('')}
          </div>` : ''}

        ${onglet === 'livraison' ? `
          <table class="spec-table"><tbody>
            <tr><td>Bamako (24 h)</td><td>${fm(REGLES.livraisonStandard)} — offerte dès ${fm(REGLES.francoDePort)}</td></tr>
            <tr><td>Autres régions (48-72 h)</td><td>${fm(REGLES.livraisonRegion)}</td></tr>
            <tr><td>Paiement</td><td>Orange Money, Moov Money, espèces à la livraison</td></tr>
            <tr><td>Retour</td><td>7 jours après réception, produit non utilisé dans son emballage</td></tr>
            <tr><td>Garantie</td><td>Défaut de fabrication pris en charge (voir fiche produit)</td></tr>
          </tbody></table>
          <p class="mt-16">Une question sur la livraison ? Écrivez-nous sur WhatsApp au <b style="color:#fff">${BOUTIQUE.telephone}</b> ou par email à ${BOUTIQUE.email}.</p>` : ''}
      </div>
    </div>

    ${similaires.length ? `<section>
      <div class="section-head"><div><h2>Produits similaires</h2><p>Dans la même catégorie</p></div></div>
      <div class="grid-products">${similaires.map(carteProduit).join('')}</div>
    </section>` : ''}
  </div>

  <div class="buybar">
    <span class="price">${fmCourt(prix)} ${DEVISE}</span>
    <button class="btn btn-gold" data-action="ajouter" data-slug="${produit.slug}">${ic('cart')} Ajouter</button>
  </div>`;
}

/* ------------------------- Panier (page) ------------------------- */
function lignesPanierHTML(compact) {
  return State.panier.map(function (l) {
    var p = getProduit(l.id);
    var opts = Object.keys(l.choix).map(function (k) { return k + ' : ' + l.choix[k]; }).join(' • ');
    if (compact) {
      return `<div class="mini-line">
        <img src="${l.image}" alt="${echappe(l.nom)}">
        <span><b>${echappe(l.nom)}</b><small>${echappe(opts)}</small>
        <small style="color:var(--gold);font-weight:800;display:block;margin-top:4px">${l.qte} × ${fmCourt(l.prix)} ${DEVISE}</small></span>
        <button class="rm" data-action="retirer" data-cle="${l.cle}" title="Retirer">${ic('trash')}</button>
      </div>`;
    }
    return `<div class="cart-line">
      <a href="#/produit/${l.slug}"><img src="${l.image}" alt="${echappe(l.nom)}"></a>
      <div>
        <h4><a href="#/produit/${l.slug}">${echappe(l.nom)}</a></h4>
        <div class="opts">${echappe(opts)}</div>
        <div class="unit">Prix unitaire : ${fm(l.prix)} ${p && p.stock <= 8 ? '• <span style="color:#facc15">stock limité (' + p.stock + ')</span>' : ''}</div>
        <div class="qty">
          <button data-action="ligne-moins" data-cle="${l.cle}" aria-label="Diminuer">${ic('minus')}</button>
          <input type="number" min="1" value="${l.qte}" data-action="ligne-qte" data-cle="${l.cle}" aria-label="Quantité">
          <button data-action="ligne-plus" data-cle="${l.cle}" aria-label="Augmenter">${ic('plus')}</button>
        </div>
      </div>
      <div>
        <div class="line-total">${fm(lignePrix(l))}</div>
        <br><button class="rm" data-action="retirer" data-cle="${l.cle}">${ic('trash')} Retirer</button>
      </div>
    </div>`;
  }).join('');
}

function resumeHTML() {
  var st = sousTotal(), remise = montantRemise(), liv = fraisLivraison();
  var restant = Math.max(0, REGLES.francoDePort - st);
  var pct = Math.min(100, Math.round(st / REGLES.francoDePort * 100));
  return `<div class="panel summary">
    <h3>${ic('package')} Récapitulatif</h3>
    <div class="progress"><i style="width:${pct}%"></i></div>
    <p class="muted mt-8" style="font-size:11px">
      ${restant > 0 ? 'Plus que <b style="color:var(--gold)">' + fm(restant) + '</b> pour la livraison offerte' : '🎉 Livraison offerte sur cette commande !'}
    </p>
    <div class="mt-16">
      <div class="srow"><span>Sous-total (${nombreArticles()} article${nombreArticles() > 1 ? 's' : ''})</span><b>${fm(st)}</b></div>
      ${remise ? `<div class="srow"><span>Remise ${State.promo ? '(' + State.promo.code + ')' : ''}</span><b style="color:#6ee7b7">− ${fm(remise)}</b></div>` : ''}
      <div class="srow"><span>Livraison</span><b>${liv ? fm(liv) : '<span style="color:#6ee7b7">Offerte</span>'}</b></div>
      <div class="stotal"><span>Total à payer</span><b>${fmCourt(Math.max(0, st - remise) + liv)} ${DEVISE}</b></div>
    </div>
    <div class="promo-row mt-16">
      <input class="input" id="promoInput" placeholder="Code promo" value="${State.promo ? State.promo.code : ''}">
      <button class="btn btn-ghost btn-sm" data-action="promo">${ic('tag')} Appliquer</button>
    </div>
    <div class="mt-8">
      <button class="btn btn-green btn-block mt-8" data-action="checkout">${ic('checkCircle')} Valider la commande</button>
      <a class="btn btn-ghost btn-block mt-8" href="#/boutique">${ic('bag')} Continuer mes achats</a>
    </div>
    <p class="muted mt-16" style="font-size:10.5px;line-height:1.7">
      Codes promo disponibles : <b style="color:#fde68a">${Object.keys(REGLES.promos).join(', ')}</b>.
      Paiement Orange Money, Moov Money ou espèces à la livraison.
    </p>
  </div>`;
}

function vuePanier() {
  if (!State.panier.length) {
    return `<div class="view wrap">
      <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Panier</span></div>
      <div class="empty" style="margin-top:20px">
        ${ic('cart')}
        <h3>Votre panier est vide</h3>
        <p>Parcourez le catalogue et ajoutez vos articles préférés.</p>
        <div class="mt-24 row" style="justify-content:center">
          <a class="btn btn-gold" href="#/boutique">${ic('bag')} Voir le catalogue</a>
          <a class="btn btn-ghost" href="#/favoris">${ic('heart')} Mes favoris</a>
        </div>
      </div>
    </div>`;
  }
  return `<div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Panier</span></div>
    <div class="section-head" style="margin-top:6px">
      <div><h2>Mon panier</h2><p>${nombreArticles()} article${nombreArticles() > 1 ? 's' : ''} • ${fm(sousTotal())}</p></div>
      <button class="btn btn-danger btn-sm" data-action="vider-panier">${ic('trash')} Vider le panier</button>
    </div>
    <div class="cart-layout">
      <div class="panel">
        <h3>${ic('cart')} Articles</h3>
        ${lignesPanierHTML(false)}
        <div class="mt-16 row">
          <a class="btn btn-ghost btn-sm" href="#/boutique">${ic('left')} Ajouter d'autres articles</a>
        </div>
      </div>
      <div>${resumeHTML()}</div>
    </div>
  </div>`;
}

/* ------------------------- Favoris ------------------------- */
function vueFavoris() {
  var liste = produitsFavoris();
  return `<div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Favoris</span></div>
    <div class="section-head" style="margin-top:6px">
      <div><h2>Ma liste d'envies</h2><p>${liste.length} produit${liste.length > 1 ? 's' : ''} enregistré${liste.length > 1 ? 's' : ''}</p></div>
      ${liste.length ? `<div class="row">
        <button class="btn btn-gold btn-sm" data-action="favoris-vers-panier">${ic('cart')} Tout ajouter au panier</button>
      </div>` : ''}
    </div>
    ${liste.length
      ? `<div class="grid-products">${liste.map(carteProduit).join('')}</div>`
      : `<div class="empty">${ic('heart')}<h3>Aucun favori pour le moment</h3>
          <p>Cliquez sur le cœur d'un produit pour l'enregistrer et le retrouver ici, même après avoir fermé la page.</p>
          <div class="mt-24"><a class="btn btn-gold" href="#/boutique">${ic('bag')} Découvrir les produits</a></div></div>`}
  </div>`;
}

/* ------------------------- Login / Inscription ------------------------- */
function vueLogin(mode) {
  mode = mode === 'inscription' ? 'inscription' : 'connexion';
  return `<div class="view wrap">
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="eyebrow">Espace client</div>
        <h1 class="mt-8">${mode === 'inscription' ? 'Créer mon compte' : 'Se connecter'}</h1>
        <p>${mode === 'inscription'
          ? 'Créez votre compte pour suivre vos commandes et retrouver vos favoris.'
          : 'Accédez à vos commandes, vos favoris et vos informations de livraison.'}</p>

        <div class="tab-switch">
          <button class="${mode === 'connexion' ? 'active' : ''}" data-action="auth-tab" data-mode="connexion">Connexion</button>
          <button class="${mode === 'inscription' ? 'active' : ''}" data-action="auth-tab" data-mode="inscription">Inscription</button>
        </div>

        <div id="authErreur" class="field err" style="display:none;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.35);border-radius:12px;padding:11px 13px;margin-bottom:14px"></div>

        <form id="authForm" novalidate>
          ${mode === 'inscription' ? `
          <div class="field" id="f-nom">
            <label for="nom">Nom complet</label>
            <div class="wrap-input">${ic('user')}<input class="input" id="nom" name="nom" placeholder="Ex. Moussa Diallo" autocomplete="name"></div>
            <div class="err">Merci d'indiquer votre nom (2 caractères minimum).</div>
          </div>` : ''}
          <div class="field" id="f-email">
            <label for="email">Adresse email</label>
            <div class="wrap-input">${ic('mail')}<input class="input" id="email" name="email" type="email" placeholder="vous@email.com" autocomplete="email"></div>
            <div class="err">Adresse email invalide.</div>
          </div>
          <div class="field" id="f-mdp">
            <label for="mdp">Mot de passe</label>
            <div class="wrap-input">${ic('lock')}<input class="input" id="mdp" name="mdp" type="password" placeholder="••••••••" autocomplete="${mode === 'inscription' ? 'new-password' : 'current-password'}"></div>
            <div class="err">${mode === 'inscription' ? '6 caractères minimum.' : 'Mot de passe requis.'}</div>
          </div>
          ${mode === 'inscription' ? `
          <div class="field" id="f-mdp2">
            <label for="mdp2">Confirmer le mot de passe</label>
            <div class="wrap-input">${ic('lock')}<input class="input" id="mdp2" name="mdp2" type="password" placeholder="••••••••" autocomplete="new-password"></div>
            <div class="err">Les deux mots de passe ne correspondent pas.</div>
          </div>` : ''}
          <div class="row" style="justify-content:space-between">
            <label class="check-row"><input type="checkbox" id="souvenir" ${mode === 'connexion' ? 'checked' : ''}> Se souvenir de moi</label>
            ${mode === 'connexion' ? '<button type="button" class="link-more" data-action="mdp-oublie">Mot de passe oublié ?</button>' : ''}
          </div>
          <button class="btn btn-gold btn-block btn-lg mt-16" type="submit">
            ${ic(mode === 'inscription' ? 'sparkles' : 'logout')} ${mode === 'inscription' ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>

        <div class="row mt-16" style="gap:8px">
          <button class="btn btn-ghost btn-sm grow" data-action="social" data-reseau="Google">Google</button>
          <button class="btn btn-ghost btn-sm grow" data-action="social" data-reseau="Facebook">Facebook</button>
          <button class="btn btn-ghost btn-sm grow" data-action="social" data-reseau="Apple">Apple</button>
        </div>

        <div class="demo-box">
          <b>Compte de démonstration</b>
          <p>Email : <code>demo@mandenbaobab.ml</code><br>Mot de passe : <code>demo1234</code></p>
          <button class="btn btn-line btn-sm mt-8" type="button" data-action="login-demo">Remplir automatiquement</button>
          <p style="margin-top:10px">Les comptes créés ici sont stockés uniquement dans votre navigateur (démo front-end, aucun serveur).</p>
        </div>
      </div>
    </div>
  </div>`;
}

/* ------------------------- Compte client ------------------------- */
function vueCompte() {
  if (!State.user) return vueLogin('connexion');
  var cmds = commandesUtilisateur();
  var favs = produitsFavoris();
  return `<div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Mon compte</span></div>
    <div class="section-head" style="margin-top:6px">
      <div class="account-head">
        <span class="avatar">${initiales(State.user.nom)}</span>
        <div>
          <h2 class="serif" style="font-size:30px">${echappe(State.user.nom)}</h2>
          <p>${echappe(State.user.email)} • Client${cmds.length > 1 ? ' fidèle' : ''}</p>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" data-action="deconnexion">${ic('logout')} Se déconnecter</button>
    </div>

    <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:20px">
      <div class="panel center"><b style="font-size:22px;color:var(--gold);font-family:'Cormorant Garamond',serif;display:block">${cmds.length}</b><small class="muted">commande${cmds.length > 1 ? 's' : ''}</small></div>
      <div class="panel center"><b style="font-size:22px;color:var(--gold);font-family:'Cormorant Garamond',serif;display:block">${favs.length}</b><small class="muted">favori${favs.length > 1 ? 's' : ''}</small></div>
      <div class="panel center"><b style="font-size:22px;color:var(--gold);font-family:'Cormorant Garamond',serif;display:block">${nombreArticles()}</b><small class="muted">article${nombreArticles() > 1 ? 's' : ''} au panier</small></div>
      <div class="panel center"><b style="font-size:22px;color:var(--gold);font-family:'Cormorant Garamond',serif;display:block">${fmCourant()}</b><small class="muted">montant des achats</small></div>
    </div>

    <div class="cart-layout">
      <div class="panel">
        <h3>${ic('package')} Mes commandes</h3>
        ${cmds.length ? cmds.map(function (c) {
          return `<div class="order">
            <div class="order-top">
              <b>Commande ${c.id}</b>
              <span class="status ${c.statut.indexOf('Payée') === 0 ? 'livr' : 'prep'}">${echappe(c.statut)}</span>
            </div>
            <p class="muted" style="font-size:11px;margin-top:6px">${dateFr(c.date)} • ${c.adresse.ville} • ${echappe(c.paiement)}</p>
            <ul>
              ${c.lignes.map(function (l) {
                return '<li><span>' + echappe(l.nom) + ' <small class="muted">' + echappe(Object.keys(l.choix).map(function (k) { return l.choix[k]; }).join(' • ')) + '</small> ×' + l.qte + '</span><b>' + fm(l.prix * l.qte) + '</b></li>';
              }).join('')}
            </ul>
            <div class="srow" style="display:flex;justify-content:space-between;font-size:12.5px;padding:10px 0;border-top:1px solid var(--line);margin-top:8px">
              <span class="muted">Total payé</span><b style="color:var(--gold)">${fm(c.total)}</b>
            </div>
          </div>`;
        }).join('') : `<div class="empty" style="border:none;background:none">${ic('package')}<h3>Aucune commande</h3><p>Vos commandes apparaîtront ici après validation du panier.</p>
          <div class="mt-16"><a class="btn btn-gold" href="#/boutique">${ic('bag')} Commencer mes achats</a></div></div>`}
      </div>
      <div>
        <div class="panel">
          <h3>${ic('heart')} Mes favoris</h3>
          ${favs.length ? favs.map(function (p) {
            return `<div class="mini-line">
              <img src="${p.images[0].src}" alt="${echappe(p.nom)}">
              <span><b><a href="#/produit/${p.slug}">${echappe(p.nom)}</a></b><small>${fm(p.prix)}</small></span>
              <a class="btn btn-gold btn-sm" href="#/produit/${p.slug}">${ic('cart')}</a>
            </div>`;
          }).join('') : `<p class="muted" style="font-size:12px">Aucun favori enregistré. <a href="#/boutique" style="color:var(--gold)">Parcourir le catalogue →</a></p>`}
        </div>
        <div class="panel">
          <h3>${ic('user')} Mes informations</h3>
          <table class="spec-table"><tbody>
            <tr><td>Nom</td><td>${echappe(State.user.nom)}</td></tr>
            <tr><td>Email</td><td>${echappe(State.user.email)}</td></tr>
            <tr><td>Ville de livraison</td><td>${cmds.length ? echappe(cmds[0].adresse.ville) : BOUTIQUE.ville}</td></tr>
            <tr><td>Fidélité</td><td>${cmds.length ? Math.min(100, cmds.length * 10) : 0} points</td></tr>
          </tbody></table>
          <button class="btn btn-ghost btn-sm btn-block mt-16" data-action="infos-demo">${ic('edit')} Modifier (démo)</button>
        </div>
      </div>
    </div>
  </div>`;
}
function fmCourant() {
  return fm(State.commandes.reduce(function (s, c) { return c.email === (State.user && State.user.email) ? s + c.total : s; }, 0));
}

/* ------------------------- Commande (checkout) ------------------------- */
function vueCommande(etape) {
  etape = etape || 1;
  var ok = {
    1: State.panier.length > 0,
    2: State.panier.length > 0
  };
  if (!State.panier.length) return vuePanier();

  var recap = `<div class="panel">
    <h3>${ic('package')} Votre commande</h3>
    ${State.panier.map(function (l) {
      return `<div class="mini-line">
        <img src="${l.image}" alt="">
        <span><b>${echappe(l.nom)}</b><small>${echappe(Object.keys(l.choix).map(function (k) { return l.choix[k]; }).join(' • '))} • ×${l.qte}</small></span>
        <b style="color:var(--gold);font-size:12px">${fm(lignePrix(l))}</b>
      </div>`;
    }).join('')}
    <div class="srow mt-16" style="display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0"><span class="muted">Sous-total</span><b>${fm(sousTotal())}</b></div>
    ${montantRemise() ? `<div class="srow" style="display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0"><span class="muted">Remise ${State.promo ? State.promo.code : ''}</span><b style="color:#6ee7b7">− ${fm(montantRemise())}</b></div>` : ''}
    <div class="srow" style="display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0"><span class="muted">Livraison</span><b>${fraisLivraison() ? fm(fraisLivraison()) : 'Offerte'}</b></div>
    <div class="stotal"><span>Total</span><b>${fmCourt(totalAPayer())} ${DEVISE}</b></div>
  </div>`;

  var etapes = `<div class="tab-switch" style="cursor:default">
      <button class="${etape === 1 ? 'active' : ''}">1. Livraison</button>
      <button class="${etape === 2 ? 'active' : ''}">2. Paiement</button>
      <button class="${etape === 3 ? 'active' : ''}">3. Confirmation</button>
    </div>`;

  if (etape === 3) {
    var c = State.commandeFaite;
    if (!c) return vuePanier();
    return `<div class="view wrap">
      <div class="auth-wrap" style="max-width:640px">
        <div class="auth-card center">
          <div style="width:70px;height:70px;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;
            background:linear-gradient(135deg,rgba(16,185,129,.22),rgba(16,185,129,.08));border:1px solid rgba(16,185,129,.4);color:#6ee7b7">
            <span style="display:block;width:34px;height:34px">${ic('checkCircle')}</span>
          </div>
          <h1 class="serif">Commande confirmée !</h1>
          <p>Merci ${echappe(c.client)}. Votre commande <b style="color:var(--gold)">${c.id}</b> a bien été enregistrée.</p>
          <div class="panel mt-24" style="text-align:left">
            <table class="spec-table"><tbody>
              <tr><td>Numéro</td><td><b>${c.id}</b></td></tr>
              <tr><td>Montant</td><td><b style="color:var(--gold)">${fm(c.total)}</b></td></tr>
              <tr><td>Paiement</td><td>${echappe(c.paiement)}</td></tr>
              <tr><td>Livraison</td><td>${echappe(c.adresse.ville)} — ${echappe(c.adresse.details)}</td></tr>
              <tr><td>Délai estimé</td><td>${c.adresse.ville.toLowerCase().indexOf('bamako') !== -1 ? '24 h' : '48 à 72 h'}</td></tr>
              <tr><td>Statut</td><td>${echappe(c.statut)}</td></tr>
            </tbody></table>
          </div>
          <div class="row mt-24" style="justify-content:center">
            <a class="btn btn-gold" href="#/compte">${ic('user')} Suivre ma commande</a>
            <a class="btn btn-ghost" href="#/boutique">${ic('bag')} Continuer mes achats</a>
            <a class="btn btn-ghost" href="https://wa.me/${BOUTIQUE.whatsapp}?text=Bonjour%2C%20je%20souhaite%20suivre%20ma%20commande%20${c.id}" target="_blank" rel="noopener">${ic('whatsapp')} WhatsApp</a>
          </div>
        </div>
      </div>
    </div>`;
  }

  return `<div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<a href="#/panier">Panier</a>${ic('right')}<span>Commande</span></div>
    <div class="section-head" style="margin-top:6px"><div><h2>Finaliser ma commande</h2><p>Paiement mobile ou espèces à la livraison</p></div></div>
    <div class="cart-layout">
      <div class="panel">
        ${etapes}
        ${etape === 1 ? `
          <h3>${ic('truck')} Adresse de livraison</h3>
          <div class="field" id="c-nom"><label>Nom complet</label><input class="input" id="cNom" value="${State.user ? echappe(State.user.nom) : ''}" placeholder="Ex. Aïssata Traoré"><div class="err">Nom requis.</div></div>
          <div class="field" id="c-tel"><label>Téléphone</label><input class="input" id="cTel" placeholder="+223 70 00 00 00"><div class="err">Numéro invalide (8 chiffres minimum).</div></div>
          <div class="field" id="c-mail2"><label>Email (confirmation)</label><input class="input" id="cEmail" type="email" value="${State.user ? echappe(State.user.email) : ''}" placeholder="vous@email.com"><div class="err">Email invalide.</div></div>
          <div class="field" id="c-ville"><label>Ville</label>
            <select class="input" id="cVille">
              <option>Bamako</option><option>Ségou</option><option>Sikasso</option><option>Kayes</option>
              <option>Mopti</option><option>Gao</option><option>Tombouctou</option><option>Autre ville</option>
            </select><div class="err">Ville requise.</div>
          </div>
          <div class="field" id="c-det"><label>Quartier / repère</label><input class="input" id="cDetails" placeholder="Ex. Badalabougou, près du marché"><div class="err">Indiquez un repère pour le livreur.</div></div>
          <button class="btn btn-gold btn-block btn-lg mt-8" data-action="vers-paiement">${ic('arrow')} Continuer vers le paiement</button>
        ` : `
          <h3>${ic('card')} Mode de paiement</h3>
          <div class="pills" id="paiementPills">
            ${['Orange Money', 'Moov Money', 'Espèces à la livraison'].map(function (m, i) {
              return `<button class="opt ${i === 0 ? 'active' : ''}" data-action="paiement" data-mode="${m}">${echappe(m)}</button>`;
            }).join('')}
          </div>
          <div class="mt-16" id="paiementDetail">
            <div class="field"><label>Numéro ${'Orange Money'}</label><input class="input" id="cNumMobile" placeholder="+223 7X XX XX XX"><div class="hint">Vous recevrez une demande de confirmation sur votre téléphone.</div></div>
          </div>
          <label class="check-row mt-16"><input type="checkbox" id="cConditions" checked> J'accepte les conditions de vente et la politique de retour (7 jours).</label>
          <div class="row mt-24">
            <button class="btn btn-ghost" data-action="retour-livraison">${ic('left')} Retour</button>
            <button class="btn btn-green btn-lg grow" data-action="confirmer-commande">${ic('lock')} Payer ${fm(totalAPayer())}</button>
          </div>
        `}
      </div>
      <div>${recap}
        <div class="panel">
          <h3>${ic('shield')} Paiement sécurisé</h3>
          <p class="muted" style="font-size:11.5px;line-height:1.75">
            Démonstration : aucun paiement réel n'est effectué. Sur la version de production, cette étape est
            branchée sur l'API Orange Money / Wave côté serveur (Laravel) avec webhook de confirmation.
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

/* ------------------------- À propos ------------------------- */
function vueAPropos() {
  return `<div class="view wrap">
    <div class="breadcrumb"><a href="#/">Accueil</a>${ic('right')}<span>Contact</span></div>
    <div class="section-head" style="margin-top:6px"><div><h2>Contact &amp; service client</h2><p>Réponse en moins d'une heure (jours ouvrés)</p></div></div>
    <div class="cart-layout">
      <div class="panel">
        <h3>${ic('mail')} Écrivez-nous</h3>
        <div class="field"><label>Nom</label><input class="input" id="kNom" placeholder="Votre nom" value="${State.user ? echappe(State.user.nom) : ''}"></div>
        <div class="field"><label>Email</label><input class="input" id="kEmail" type="email" placeholder="vous@email.com" value="${State.user ? echappe(State.user.email) : ''}"></div>
        <div class="field"><label>Message</label><textarea class="input" id="kMsg" rows="5" placeholder="Votre question sur un produit, une commande, une livraison..."></textarea></div>
        <button class="btn btn-gold" data-action="envoyer-message">${ic('mail')} Envoyer le message</button>
      </div>
      <div>
        <div class="panel">
          <h3>${ic('phone')} Coordonnées</h3>
          <table class="spec-table"><tbody>
            <tr><td>Téléphone / WhatsApp</td><td><a href="tel:${BOUTIQUE.telephone.replace(/\s/g, '')}" style="color:var(--gold)">${BOUTIQUE.telephone}</a></td></tr>
            <tr><td>Email</td><td>${BOUTIQUE.email}</td></tr>
            <tr><td>Boutique</td><td>${BOUTIQUE.ville}</td></tr>
            <tr><td>Horaires</td><td>Lun-Sam, 8 h - 19 h</td></tr>
            <tr><td>Livraison</td><td>Bamako 24 h • Régions 48-72 h</td></tr>
          </tbody></table>
          <div class="row mt-16">
            <a class="btn btn-green btn-sm" href="https://wa.me/${BOUTIQUE.whatsapp}" target="_blank" rel="noopener">${ic('whatsapp')} WhatsApp</a>
            <a class="btn btn-ghost btn-sm" href="mailto:${BOUTIQUE.email}">${ic('mail')} Email</a>
          </div>
        </div>
        <div class="panel">
          <h3>${ic('info')} À propos de cette démo</h3>
          <p class="muted" style="font-size:11.5px;line-height:1.8">
            Manden Baobab est une boutique de démonstration créée pour le portfolio de
            <b style="color:#fff">Moussa N'tji Diallo</b>, développeur Full Stack (Laravel • React • React Native).
            Toutes les fonctionnalités — catalogue, filtres, fiche produit, panier, codes promo, favoris,
            comptes clients et commandes — tournent côté navigateur avec persistance locale.
          </p>
          <div class="row mt-16">
            <a class="btn btn-line btn-sm" href="../index.html">${ic('arrow')} Voir le portfolio</a>
            <a class="btn btn-ghost btn-sm" href="../img/cv/CV-Moussa-Ntji-Diallo-Ultra-Premium.pdf" download>${ic('download')} CV PDF</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ------------------------- 404 ------------------------- */
function vue404() {
  return `<div class="view wrap">
    <div class="empty" style="margin-top:30px">
      ${ic('alert')}
      <h3>Page introuvable</h3>
      <p>La page demandée n'existe pas (ou plus). Revenez à l'accueil de la boutique.</p>
      <div class="mt-24 row" style="justify-content:center">
        <a class="btn btn-gold" href="#/">${ic('home')} Accueil boutique</a>
        <a class="btn btn-ghost" href="#/boutique">${ic('bag')} Catalogue</a>
      </div>
    </div>
  </div>`;
}
