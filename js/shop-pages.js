/* ==========================================================================
   shop-pages.js — Logique des pages filles
   (liste produits · détail produit · panier)
   Même esprit que le script du template : JavaScript natif, aucune dépendance.
   ========================================================================== */
(function () {
  'use strict';

  /* ═══════════════ 1. Outils ═══════════════ */
  var CLE = { panier: 'bt_panier_v1', favoris: 'bt_favoris_v1', promo: 'bt_promo_v1', commandes: 'bt_commandes_v1', compte: 'bt_compte_v1' };

  function lire(c, d) { try { var r = localStorage.getItem(c); return r ? JSON.parse(r) : d; } catch (e) { return d; } }
  function ecrire(c, v) { try { localStorage.setItem(c, JSON.stringify(v)); } catch (e) {} }
  function echappe(t) {
    return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fm(n) { return Math.round(Number(n) || 0).toLocaleString('fr-FR').replace(/\u202f/g, ' ').replace(/\u00a0/g, ' ') + ' ' + BOUTIQUE.devise; }
  function fc(n) { return Math.round(Number(n) || 0).toLocaleString('fr-FR').replace(/\u202f/g, ' ').replace(/\u00a0/g, ' '); }
  function ic(nom, cls, rempli) {
    return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"' + (rempli ? ' style="fill:currentColor;stroke:currentColor"' : '') +
      '><use href="#' + nom + '"/></svg>';
  }
  function etoiles(note) {
    var plein = Math.round(note), h = '';
    for (var i = 1; i <= 5; i++) h += '<svg viewBox="0 0 24 24" class="' + (i <= plein ? '' : 'empty') + '"><use href="#i-b2-star"/></svg>';
    return '<span class="stars" aria-hidden="true">' + h + '</span>';
  }
  function initiales(nom) { return String(nom || '?').trim().split(/\s+/).slice(0, 2).map(function (m) { return m.charAt(0).toUpperCase(); }).join(''); }
  function param(nom) { return new URLSearchParams(location.search).get(nom); }

  /* ═══════════════ 2. État + persistance ═══════════════ */
  var Etat = {
    panier: lire(CLE.panier, []) || [],
    favoris: lire(CLE.favoris, []) || [],
    promo: lire(CLE.promo, null),
    commandes: lire(CLE.commandes, []) || [],
    compte: lire(CLE.compte, null),
    etape: 1,
    livraison: null,
    paiement: 'Orange Money'
  };
  Etat.panier = Etat.panier.filter(function (l) { return !!getProduit(l.slug); });
  if (Etat.promo && !PROMOS[Etat.promo.code]) Etat.promo = null;

  function cleLigne(slug, choix) {
    return slug + '|' + Object.keys(choix || {}).sort().map(function (k) { return k + ':' + choix[k]; }).join('|');
  }
  function nbArticles() { return Etat.panier.reduce(function (s, l) { return s + l.qte; }, 0); }
  function sousTotal() { return Etat.panier.reduce(function (s, l) { return s + l.prix * l.qte; }, 0); }
  function remise() {
    if (!Etat.promo) return 0;
    var st = sousTotal();
    if (Etat.promo.type === 'pourcent') return Math.round(st * Etat.promo.valeur / 100);
    return Math.min(Etat.promo.valeur, st);
  }
  function frais() {
    if (!Etat.panier.length) return 0;
    return sousTotal() >= BOUTIQUE.franco ? 0 : BOUTIQUE.livraison;
  }
  function total() { return Math.max(0, sousTotal() - remise()) + frais(); }
  function sauverPanier() { ecrire(CLE.panier, Etat.panier); }
  function estFavori(slug) { return Etat.favoris.indexOf(slug) !== -1; }

  function ajouter(slug, choix, qte) {
    var p = getProduit(slug);
    if (!p || p.stock <= 0) return null;
    choix = choix || choixDefaut(p);
    qte = Math.max(1, parseInt(qte, 10) || 1);
    var cle = cleLigne(slug, choix);
    var l = Etat.panier.filter(function (x) { return x.cle === cle; })[0];
    if (l) l.qte = Math.min(l.qte + qte, p.stock);
    else Etat.panier.push({
      cle: cle, slug: slug, nom: p.nom, image: p.image, icone: p.icone,
      prix: prixUnitaire(p, choix), prixBase: p.prix, choix: choix, qte: Math.min(qte, p.stock)
    });
    sauverPanier();
    majEntete(); rendreTiroir();
    return cle;
  }
  function majQte(cle, qte) {
    var l = Etat.panier.filter(function (x) { return x.cle === cle; })[0];
    if (!l) return;
    qte = parseInt(qte, 10);
    if (!qte || qte <= 0) return retirer(cle);
    var p = getProduit(l.slug);
    l.qte = Math.min(qte, p ? Math.max(p.stock, 1) : 99);
    sauverPanier(); majEntete(); rendreTiroir();
  }
  function retirer(cle) {
    Etat.panier = Etat.panier.filter(function (x) { return x.cle !== cle; });
    sauverPanier(); majEntete(); rendreTiroir();
  }
  function vider() { Etat.panier = []; Etat.promo = null; sauverPanier(); ecrire(CLE.promo, null); majEntete(); rendreTiroir(); }
  function basculerFavori(slug) {
    var i = Etat.favoris.indexOf(slug), ajout = i === -1;
    if (ajout) Etat.favoris.push(slug); else Etat.favoris.splice(i, 1);
    ecrire(CLE.favoris, Etat.favoris); majEntete();
    return ajout;
  }

  /* ═══════════════ 3. Carte produit (markup identique au template) ═══════════════ */
  function carte(p) {
    var fav = estFavori(p.slug);
    var stock = p.stock <= 0 ? '<div class="stock out">Rupture de stock</div>'
      : p.stock <= 8 ? '<div class="stock low">Plus que ' + p.stock + ' en stock</div>'
        : '<div class="stock ok">En stock</div>';
    return '' +
      '<article class="card rv' + (p.stock <= 0 ? ' sold' : '') + '" data-p="' + p.slug + '">' +
        '<div class="thumb" style="background-image:url(\'' + p.image + '\')" data-open="' + p.slug + '" role="link" tabindex="0" aria-label="' + echappe(p.nom) + '">' +
          (p.remise ? '<span class="off">-' + p.remise + '%</span>' : '') +
          '<button class="fav' + (fav ? ' on' : '') + '" type="button" aria-label="Ajouter aux favoris" data-fav="' + p.slug + '">' +
            '<svg class="ic"><use href="#i-heart"/></svg></button>' +
          '<svg class="ic" aria-hidden="true"><use href="#' + p.icone + '"/></svg>' +
        '</div>' +
        '<div class="body">' +
          '<a class="name" href="ecommerce-produit.html?p=' + p.slug + '">' + echappe(p.nom) + '</a>' +
          '<div class="rate">' + etoiles(p.note) + '<span>' + p.note.toFixed(1).replace('.', ',') + ' (' + p.avis + ')</span></div>' +
          (p.ancienPrix ? '<div class="was">' + fm(p.ancienPrix) + '</div>' : '') +
          '<div class="prices"><div class="price">' + fm(p.prix) + '</div></div>' +
          stock +
          '<button class="add" type="button" data-add="' + p.slug + '"' + (p.stock <= 0 ? ' disabled' : '') + '>' +
            (p.stock <= 0 ? 'Indisponible' : 'Ajouter au panier') + '</button>' +
        '</div>' +
      '</article>';
  }

  /* ═══════════════ 4. En-tête : badges + recherche ═══════════════ */
  function majEntete() {
    var bag = document.querySelector('.hactions [data-bag] .dot');
    if (bag) { bag.textContent = nbArticles(); bag.style.display = nbArticles() ? 'grid' : 'none'; }
    var coeur = document.querySelector('.hactions [data-fav-count] .dot');
    if (coeur) { coeur.textContent = Etat.favoris.length; coeur.style.display = Etat.favoris.length ? 'grid' : 'none'; }
    var nomCompte = document.querySelector('.hactions [data-user] .nm');
    if (nomCompte) nomCompte.textContent = Etat.compte ? Etat.compte.prenom : '';
  }
  function brancherRecherche() {
    var form = document.querySelector('form.search');
    if (!form) return;
    var champ = form.querySelector('input');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = champ.value.trim();
      location.href = 'produits.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  /* ═══════════════ 5. Tiroir panier ═══════════════ */
  function rendreTiroir() {
    var corps = document.getElementById('dBody'), pied = document.getElementById('dFoot');
    if (!corps) return;
    if (!Etat.panier.length) {
      corps.innerHTML = '<div class="empty" style="border:0;padding:34px 6px">' + ic('i-bag') +
        '<h3>Votre panier est vide</h3><p>Ajoutez un produit pour commencer.</p></div>';
      pied.innerHTML = '<a class="btn-solid" style="width:100%" href="produits.html">Voir les produits</a>';
      return;
    }
    corps.innerHTML = Etat.panier.map(function (l) {
      return '<div class="dline">' +
        '<a class="th" href="ecommerce-produit.html?p=' + l.slug + '" style="background-image:url(\'' + l.image + '\')"></a>' +
        '<div><b>' + echappe(l.nom) + '</b><small>' + echappe(Object.keys(l.choix).map(function (k) { return l.choix[k]; }).join(' · ')) + ' · ×' + l.qte + '</small>' +
        '<button class="rm" type="button" data-del="' + l.cle + '" aria-label="Retirer">' + ic('i-b2-trash') + '</button></div>' +
        '<span class="price">' + fm(l.prix * l.qte) + '</span>' +
      '</div>';
    }).join('');
    pied.innerHTML =
      '<div class="srow"><span>Sous-total</span><b>' + fm(sousTotal()) + '</b></div>' +
      (remise() ? '<div class="srow ok"><span>Remise' + (Etat.promo ? ' (' + Etat.promo.code + ')' : '') + '</span><b>− ' + fm(remise()) + '</b></div>' : '') +
      '<div class="srow"><span>Livraison</span><b>' + (frais() ? fm(frais()) : 'Offerte') + '</b></div>' +
      '<div class="stotal"><span>Total</span><b>' + fm(total()) + '</b></div>' +
      '<div class="promo-row" style="margin-top:14px">' +
        '<a class="btn-line" style="flex:1" href="ecommerce-panier.html">Voir le panier</a>' +
        '<a class="btn-solid" style="flex:1" href="ecommerce-panier.html?etape=2">Commander</a>' +
      '</div>';
  }
  function ouvrirTiroir() {
    document.getElementById('drawer').classList.add('on');
    document.getElementById('veil').classList.add('on');
  }
  function fermerTiroir() {
    document.getElementById('drawer').classList.remove('on');
    document.getElementById('veil').classList.remove('on');
  }

  /* ═══════════════ 6. Toasts ═══════════════ */
  function toast(titre, texte, type) {
    var zone = document.getElementById('toasts');
    if (!zone) return;
    var el = document.createElement('div');
    el.className = 'toast ' + (type || '');
    el.innerHTML = ic(type === 'ko' ? 'i-b2-alert' : type === 'ok' ? 'i-b2-check' : 'i-b2-info') +
      '<span><b>' + echappe(titre) + '</b>' + (texte ? '<p>' + echappe(texte) + '</p>' : '') + '</span>';
    zone.appendChild(el);
    setTimeout(function () {
      el.style.transition = '.3s'; el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
      setTimeout(function () { el.remove(); }, 320);
    }, 3200);
  }

  /* ═══════════════ 7. Page LISTE ═══════════════ */
  function pageListe() {
    var zone = document.getElementById('plist');
    var chipsBox = document.getElementById('chips');
    var compteur = document.getElementById('count');
    var titre = document.getElementById('titre');
    var tri = document.getElementById('tri');
    var f = {
      cat: param('cat') || 'Toutes',
      q: param('q') || '',
      promo: param('promo') === '1',
      dispo: param('dispo') === '1',
      fav: param('fav') === '1',
      tri: 'populaire'
    };
    var page = 1, PAR_PAGE = 8;

    function resultats() {
      var q = f.q.trim().toLowerCase();
      var liste = CATALOGUE.filter(function (p) {
        if (f.cat !== 'Toutes' && p.cat !== f.cat) return false;
        if (f.promo && !p.ancienPrix) return false;
        if (f.dispo && p.stock <= 0) return false;
        if (f.fav && !estFavori(p.slug)) return false;
        if (!q) return true;
        return (p.nom + ' ' + p.cat + ' ' + p.court + ' ' + Object.keys(p.specs).join(' ')).toLowerCase().indexOf(q) !== -1;
      });
      var tris = {
        populaire: function (a, b) { return b.vendus - a.vendus; },
        'prix-asc': function (a, b) { return a.prix - b.prix; },
        'prix-desc': function (a, b) { return b.prix - a.prix; },
        note: function (a, b) { return b.note - a.note; }
      };
      return liste.sort(tris[f.tri] || tris.populaire);
    }

    function rendre() {
      var liste = resultats();
      var total = liste.length;
      var max = Math.ceil(total / PAR_PAGE) || 1;
      if (page > max) page = max;
      var visibles = liste.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);

      titre.textContent = f.fav ? 'Mes favoris' : f.cat === 'Toutes' ? 'Tous les produits' : f.cat;
      compteur.innerHTML = '<b>' + total + '</b> produit' + (total > 1 ? 's' : '') +
        (f.q ? ' pour « ' + echappe(f.q) + ' »' : '');

      zone.innerHTML = visibles.length ? visibles.map(carte).join('') :
        '<div class="empty" style="grid-column:1/-1">' + ic('i-search') +
        '<h3>Aucun produit trouvé</h3><p>' + (f.fav ? 'Vous n\'avez pas encore de favori : cliquez sur le cœur d\'un produit.'
          : 'Essayez un autre mot-clé ou retirez les filtres.') + '</p>' +
        '<div class="pdp-actions"><a class="btn-solid" href="produits.html">Voir tous les produits</a>' +
        '<a class="btn-line" href="ecommerce-web.html">Retour à l\'accueil boutique</a></div></div>';

      var pager = document.getElementById('pager');
      pager.innerHTML = max > 1
        ? '<button type="button" class="pg-nav" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + ' aria-label="Page précédente">← Précédent</button>' +
          Array.apply(null, Array(max)).map(function (_, i) {
            return '<button type="button" class="' + (i + 1 === page ? 'on' : '') + '" data-page="' + (i + 1) + '"' +
              (i + 1 === page ? ' aria-current="page"' : '') + '>' + (i + 1) + '</button>';
          }).join('') +
          '<button type="button" class="pg-nav" data-page="' + (page + 1) + '"' + (page >= max ? ' disabled' : '') + ' aria-label="Page suivante">Suivant →</button>' +
          '<span class="pg-info">Page ' + page + ' / ' + max + '</span>'
        : '';

      chipsBox.innerHTML = ['Toutes'].concat(CATEGORIES).concat(['Promos']).map(function (c) {
        var on = (c === 'Promos' && f.promo) || (c === f.cat && !f.promo);
        return '<a class="cat' + (c === 'Promos' ? ' hot' : '') + (on ? ' on' : '') + '" style="' + (on ? 'border-color:var(--violet-500);background:var(--lav-1);color:var(--violet-800);font-weight:600' : '') + '" ' +
          'href="produits.html' + (c === 'Toutes' ? '' : c === 'Promos' ? '?promo=1' : '?cat=' + encodeURIComponent(c)) + '">' + echappe(c) + '</a>';
      }).join('');
      reveler();
      document.getElementById('cb-promo').checked = f.promo;
      document.getElementById('cb-dispo').checked = f.dispo;
      document.getElementById('cb-fav').checked = f.fav;
    }
    _relance.liste = rendre;

    tri.addEventListener('change', function () { f.tri = tri.value; page = 1; rendre(); });
    document.getElementById('cb-promo').addEventListener('change', function (e) { f.promo = e.target.checked; page = 1; rendre(); });
    document.getElementById('cb-dispo').addEventListener('change', function (e) { f.dispo = e.target.checked; page = 1; rendre(); });
    document.getElementById('cb-fav').addEventListener('change', function (e) { f.fav = e.target.checked; page = 1; rendre(); });
    document.getElementById('pager').addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b) return;
      page = parseInt(b.getAttribute('data-page'), 10);
      rendre();
      document.getElementById('plist').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    rendre();
  }

  /* ═══════════════ 8. Page DÉTAIL ═══════════════ */
  /* Barre « Produit précédent / suivant » (même catégorie, sinon tout le catalogue) */
  function navSiblings(p) {
    var groupe = CATALOGUE.filter(function (x) { return x.cat === p.cat; });
    if (groupe.length < 2) groupe = CATALOGUE.slice();
    var i = groupe.map(function (x) { return x.slug; }).indexOf(p.slug);
    if (i < 0) return '';
    var prec = groupe[(i - 1 + groupe.length) % groupe.length];
    var suiv = groupe[(i + 1) % groupe.length];
    return '<div class="siblings">' +
      '<a class="sib" href="ecommerce-produit.html?p=' + prec.slug + '" title="' + echappe(prec.nom) + '">' +
        '<span class="sib-k">← Précédent</span><span class="sib-n">' + echappe(prec.nom) + '</span></a>' +
      '<span class="sib-c">' + (i + 1) + ' / ' + groupe.length + '</span>' +
      '<a class="sib next" href="ecommerce-produit.html?p=' + suiv.slug + '" title="' + echappe(suiv.nom) + '">' +
        '<span class="sib-k">Suivant →</span><span class="sib-n">' + echappe(suiv.nom) + '</span></a>' +
    '</div>';
  }

  function pageDetail() {
    var p = getProduit(param('p'));
    var fiches = document.getElementById('pdp');
    if (!p) { location.replace('produits.html'); return; }
    var etat = { image: 0, choix: choixDefaut(p), qte: 1, onglet: 'desc' };

    document.title = p.nom + ' — Boutique en ligne';
    document.getElementById('crumNom').textContent = p.nom;
    document.getElementById('crumCat').textContent = p.cat;
    document.getElementById('crumCat').href = 'produits.html?cat=' + encodeURIComponent(p.cat);

    function rendre() {
      var v = p.images[etat.image];
      var prix = prixUnitaire(p, etat.choix);
      var stockTxt = p.stock <= 0 ? ['out', 'Rupture de stock']
        : p.stock <= 8 ? ['low', 'Plus que ' + p.stock + ' en stock'] : ['ok', 'En stock — expédié aujourd\'hui'];

      fiches.innerHTML =
      /* ── Galerie ── */
      '<div class="pdp-gal">' +
        '<div class="g-main" style="background-image:url(\'' + p.image + '\');background-size:' + (v.zoom * 100) + '%;background-position:' + v.pos + '">' +
          (p.remise ? '<span class="off">-' + p.remise + '%</span>' : '') +
          '<button class="fav' + (estFavori(p.slug) ? ' on' : '') + '" type="button" aria-label="Ajouter aux favoris" data-fav="' + p.slug + '">' +
            '<svg class="ic"><use href="#i-heart"/></svg></button>' +
          '<button class="g-nav prev" type="button" data-gal="-1" aria-label="Image précédente">' + ic('i-chevron') + '</button>' +
          '<button class="g-nav next" type="button" data-gal="1" aria-label="Image suivante">' + ic('i-chevron') + '</button>' +
        '</div>' +
        '<div class="g-thumbs">' + p.images.map(function (im, i) {
          return '<button type="button" class="g-th' + (i === etat.image ? ' on' : '') + '" data-th="' + i +
            '" style="background-image:url(\'' + im.src + '\');background-size:' + (im.zoom * 100) + '%;background-position:' + im.pos + '">' +
            '<span>' + echappe(im.label) + '</span></button>';
        }).join('') + '</div>' +
      '</div>' +

      /* ── Informations ── */
      '<div class="pdp-info">' +
        navSiblings(p) +
        '<div class="tagline">' + ic('i-b2-tag') + '<span>' + echappe(p.cat) + ' · Réf. ' + echappe(p.ref) + '</span></div>' +
        '<h1>' + echappe(p.nom) + '</h1>' +
        '<div class="rating-row">' + etoiles(p.note) +
          '<b>' + p.note.toFixed(1).replace('.', ',') + '</b><span>(' + p.avis + ' avis)</span>' +
          '<span class="sep2"></span><span>' + p.vendus + ' vendus</span>' +
          '<span class="sep2"></span><span class="stock ' + stockTxt[0] + '">' + stockTxt[1] + '</span>' +
        '</div>' +
        '<div class="pricebox">' +
          '<span class="now">' + fm(prix) + '</span>' +
          (p.ancienPrix && prix === p.prix ? '<span class="was">' + fm(p.ancienPrix) + '</span>' : '') +
          (p.ancienPrix && prix === p.prix ? '<span class="save">Vous économisez ' + fm(p.ancienPrix - p.prix) + '</span>' : '') +
          (prix !== p.prix ? '<span style="font-size:13px;color:var(--grey)">options incluses</span>' : '') +
        '</div>' +
        (p.ancienPrix ? '<div class="flash-line">' + ic('i-bolt', '', true) + '<span>Offre flash — se termine dans</span>' +
          '<span class="count" id="flash"><b>05</b><i>:</i><b>59</b><i>:</i><b>59</b></span></div>' : '') +
        '<p class="lead">' + echappe(p.court) + '</p>' +

        (p.options || []).map(function (o, oi) {
          return '<div class="opt"><label>' + echappe(o.nom) + ' : <b data-lab="' + oi + '">' + echappe(etat.choix[o.nom]) + '</b></label>' +
            (o.type === 'swatch'
              ? '<div class="swatches">' + o.valeurs.map(function (val) {
                  var n = valeurNom(val);
                  return '<button type="button" class="swatch' + (etat.choix[o.nom] === n ? ' on' : '') + '" data-opt="' + oi + '" data-val="' + echappe(n) +
                    '" style="background:' + (val.hex || '#e5e7eb') + '" title="' + echappe(n) + '" aria-label="' + echappe(n) + '"></button>';
                }).join('') + '</div>'
              : '<div class="pills">' + o.valeurs.map(function (val) {
                  var n = valeurNom(val), ex = valeurExtra(val);
                  return '<button type="button" class="opt-pill' + (etat.choix[o.nom] === n ? ' on' : '') + '" data-opt="' + oi + '" data-val="' + echappe(n) + '">' +
                    echappe(n) + (ex ? '<small>' + (ex > 0 ? '+' : '−') + fc(Math.abs(ex)) + '</small>' : '') + '</button>';
                }).join('') + '</div>') +
          '</div>';
        }).join('') +

        '<div class="qty-row">' +
          '<div class="stepper">' +
            '<button type="button" data-qte="-1" aria-label="Diminuer">' + ic('i-b2-minus') + '</button>' +
            '<input type="number" min="1" max="' + Math.max(p.stock, 1) + '" value="' + etat.qte + '" id="qte" aria-label="Quantité">' +
            '<button type="button" data-qte="1" aria-label="Augmenter">' + ic('i-b2-plus') + '</button>' +
          '</div>' +
          '<span class="hint">Total : <b style="color:var(--pink);font-size:15px">' + fm(prix * etat.qte) + '</b></span>' +
        '</div>' +

        '<div class="pdp-actions">' +
          '<button class="btn-solid" type="button" data-add="' + p.slug + '"' + (p.stock <= 0 ? ' disabled' : '') + '>' + ic('i-bag') + ' Ajouter au panier</button>' +
          '<button class="btn-line" type="button" data-buy="' + p.slug + '"' + (p.stock <= 0 ? ' disabled' : '') + '>' + ic('i-bolt') + ' Acheter maintenant</button>' +
          '<button class="btn-line' + (estFavori(p.slug) ? ' on' : '') + '" type="button" data-fav="' + p.slug + '" aria-label="Favoris">' + ic('i-heart') + ' Favoris</button>' +
        '</div>' +

        '<div class="assurances">' +
          '<div>' + ic('i-truck') + '<span><b>Livraison offerte dès ' + fm(BOUTIQUE.franco) + '</b>Bamako 24 h · Régions 48-72 h · sinon ' + fm(BOUTIQUE.livraison) + '</span></div>' +
          '<div>' + ic('i-card') + '<span><b>Paiement Mobile Money</b>Orange Money · Moov Money · Wave · espèces à la livraison</span></div>' +
          '<div>' + ic('i-headset') + '<span><b>Support 7j/7 — ' + BOUTIQUE.telephone + '</b>Conseil produit et suivi de commande</span></div>' +
        '</div>' +
      '</div>';

      /* ── Onglets ── */
      var avis = p.avisClients || [];
      document.getElementById('tabs').innerHTML =
        '<div class="tabs">' +
          '<div class="tabs-head">' +
            ['desc:Description', 'spec:Caractéristiques', 'avis:Avis (' + avis.length + ')', 'exp:Livraison & retour'].map(function (t) {
              var parts = t.split(':');
              return '<button type="button" class="tab-btn' + (etat.onglet === parts[0] ? ' on' : '') + '" data-tab="' + parts[0] + '">' + parts[1] + '</button>';
            }).join('') +
          '</div>' +
          '<div class="tabs-body">' +
            (etat.onglet === 'desc' ? p.description.map(function (d) { return '<p>' + echappe(d) + '</p>'; }).join('') : '') +
            (etat.onglet === 'spec' ? '<table class="spec"><tbody>' + Object.keys(p.specs).map(function (k) {
              return '<tr><td>' + echappe(k) + '</td><td>' + echappe(p.specs[k]) + '</td></tr>';
            }).join('') + '</tbody></table>' : '') +
            (etat.onglet === 'avis' ? (avis.length ? avis.map(function (a) {
              return '<div class="review"><span class="av">' + initiales(a.nom) + '</span>' +
                '<div style="flex:1"><b>' + echappe(a.nom) + '</b> <small>' + echappe(a.date) + '</small>' +
                '<p>' + echappe(a.texte) + '</p></div>' + etoiles(a.note) + '</div>';
            }).join('') : '<p>Aucun avis pour le moment.</p>') : '') +
            (etat.onglet === 'exp' ? '<table class="spec"><tbody>' +
              '<tr><td>Bamako (24 h)</td><td>' + fm(BOUTIQUE.livraison) + ' — offerte dès ' + fm(BOUTIQUE.franco) + '</td></tr>' +
              '<tr><td>Autres régions (48-72 h)</td><td>' + fm(BOUTIQUE.livraisonRegion) + '</td></tr>' +
              '<tr><td>Paiement</td><td>Orange Money, Moov Money, Wave, espèces à la livraison</td></tr>' +
              '<tr><td>Retour</td><td>7 jours après réception, produit non utilisé dans son emballage</td></tr>' +
            '</tbody></table>' : '') +
          '</div>' +
        '</div>';

      /* ── Produits similaires ── */
      document.getElementById('similaires').innerHTML = produitsSimilaires(p, 4).map(carte).join('');

      /* ── Barre d'achat mobile ── */
      var bb = document.getElementById('buybar');
      bb.innerHTML = '<span class="now">' + fm(prix) + '</span>' +
        '<button class="btn-solid" type="button" data-add="' + p.slug + '">' + ic('i-bag') + ' Ajouter</button>';

      lancerFlash();
      reveler();
    }
    _relance.detail = rendre;

    /* compte à rebours « offre flash » : jusqu'à minuit */
    function lancerFlash() {
      var el = document.getElementById('flash');
      if (!el) return;
      clearInterval(lancerFlash.timer);
      function tic() {
        var fin = new Date(); fin.setHours(23, 59, 59, 999);
        var s = Math.max(0, Math.floor((fin - new Date()) / 1000));
        var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        el.innerHTML = [h, m, sec].map(function (n) { return '<b>' + String(n).padStart(2, '0') + '</b>'; }).join('<i>:</i>');
      }
      tic();
      lancerFlash.timer = setInterval(tic, 1000);
    }

    fiches.addEventListener('click', function (e) {
      var t = e.target;
      var th = t.closest('[data-th]');
      if (th) { etat.image = parseInt(th.getAttribute('data-th'), 10); rendre(); return; }
      var nav = t.closest('[data-gal]');
      if (nav) { etat.image = (etat.image + parseInt(nav.getAttribute('data-gal'), 10) + p.images.length) % p.images.length; rendre(); return; }
      var op = t.closest('[data-opt]');
      if (op) {
        var o = p.options[parseInt(op.getAttribute('data-opt'), 10)];
        etat.choix[o.nom] = op.getAttribute('data-val');
        rendre(); return;
      }
      var q = t.closest('[data-qte]');
      if (q) {
        etat.qte = Math.min(Math.max(1, etat.qte + parseInt(q.getAttribute('data-qte'), 10)), Math.max(p.stock, 1));
        rendre(); return;
      }
      var tab = t.closest('[data-tab]');
      if (tab) { etat.onglet = tab.getAttribute('data-tab'); rendre(); return; }
    });
    fiches.addEventListener('change', function (e) {
      if (e.target.id !== 'qte') return;
      etat.qte = Math.min(Math.max(1, parseInt(e.target.value, 10) || 1), Math.max(p.stock, 1));
      rendre();
    });
    document.getElementById('buybar').addEventListener('click', function (e) {
      if (e.target.closest('[data-add]')) acheter(p);
    });
    document.body.addEventListener('click', function (e) {
      var b = e.target.closest('[data-buy]');
      if (b) acheter(getProduit(b.getAttribute('data-buy')));
    });
    p._etat = etat;
    rendre();
  }

  function acheter(p) {
    var choix = p._etat ? p._etat.choix : choixDefaut(p);
    var qte = p._etat ? p._etat.qte : 1;
    ajouter(p.slug, choix, qte);
    location.href = 'ecommerce-panier.html?etape=2';
  }

  /* ═══════════════ 9. Page PANIER ═══════════════ */
  function pagePanier() {
    var zone = document.getElementById('cart');
    var e = parseInt(param('etape'), 10);
    Etat.etape = (e >= 2 && e <= 4 && Etat.panier.length) ? e : 1;

    function rendre() {
      if (Etat.etape === 4 && Etat.derniere) return rendreConfirmation();

      if (!Etat.panier.length) {
        zone.innerHTML = '<div class="empty">' + ic('i-bag') +
          '<h3>Votre panier est vide</h3><p>Parcourez le catalogue et ajoutez vos articles préférés.</p>' +
          '<div class="pdp-actions" style="margin-top:20px"><a class="btn-solid" href="produits.html">Voir les produits</a>' +
          '<a class="btn-line" href="ecommerce-web.html">Retour à l\'accueil</a></div></div>' + historique();
        return;
      }
      if (Etat.etape === 1) return rendrePanier();
      if (Etat.etape === 2) return rendreLivraison();
      if (Etat.etape === 3) return rendrePaiement();
    }

    function etapes(actif) {
      return '<div class="steps">' +
        ['Panier', 'Livraison', 'Paiement', 'Confirmation'].map(function (t, i) {
          return '<div class="' + (i + 1 <= actif ? 'on' : '') + '">' + (i + 1) + '. ' + t + '</div>';
        }).join('') + '</div>';
    }

    function resume() {
      var restant = Math.max(0, BOUTIQUE.franco - sousTotal());
      var pct = Math.min(100, Math.round(sousTotal() / BOUTIQUE.franco * 100));
      return '<div class="panel summary">' +
        '<h2>' + ic('i-b2-tag') + ' Récapitulatif</h2>' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '<p style="font-size:12.5px;color:var(--grey);margin-bottom:6px">' +
          (restant ? 'Plus que <b style="color:var(--violet-700)">' + fm(restant) + '</b> pour la livraison offerte' : 'Livraison offerte sur cette commande !') +
        '</p>' +
        '<div class="srow"><span>Sous-total (' + nbArticles() + ' article' + (nbArticles() > 1 ? 's' : '') + ')</span><b>' + fm(sousTotal()) + '</b></div>' +
        (remise() ? '<div class="srow ok"><span>Remise' + (Etat.promo ? ' (' + Etat.promo.code + ')' : '') + '</span><b>− ' + fm(remise()) + '</b></div>' : '') +
        '<div class="srow"><span>Livraison</span><b>' + (frais() ? fm(frais()) : '<span style="color:#059669">Offerte</span>') + '</b></div>' +
        '<div class="stotal"><span>Total</span><b>' + fm(total()) + '</b></div>' +
        '<div class="promo-row">' +
          '<input class="ctrl" id="promo" placeholder="Code promo" aria-label="Code promo" value="' + (Etat.promo ? Etat.promo.code : '') + '">' +
          '<button class="btn-ghost-sm" type="button" id="ok-promo">Appliquer</button>' +
        '</div>' +
        '<div class="promo-msg" id="promoMsg"></div>' +
        '<div class="pdp-actions" style="margin-top:16px">' +
          '<button class="btn-solid" style="flex:1" type="button" id="go2">' + ic('i-b2-check') + ' Commander</button>' +
        '</div>' +
        '<div class="pdp-actions" style="margin-top:10px">' +
          '<a class="btn-line" style="flex:1" href="produits.html">Continuer mes achats</a>' +
        '</div>' +
        '<p style="font-size:12px;color:var(--grey);margin-top:14px;line-height:1.7">Codes promo : <b>' +
          Object.keys(PROMOS).join(', ') + '</b>. Paiement Orange Money, Moov Money, Wave ou espèces à la livraison.</p>' +
      '</div>';
    }

    function rendrePanier() {
      zone.innerHTML = etapes(1) + '<div class="cart-grid">' +
        '<div class="panel">' +
          '<h2>' + ic('i-bag') + ' Articles</h2>' +
          Etat.panier.map(function (l) {
            var p = getProduit(l.slug);
            return '<div class="cline">' +
              '<a class="th" href="ecommerce-produit.html?p=' + l.slug + '" style="background-image:url(\'' + l.image + '\')" aria-label="' + echappe(l.nom) + '"></a>' +
              '<div>' +
                '<h3><a href="ecommerce-produit.html?p=' + l.slug + '">' + echappe(l.nom) + '</a></h3>' +
                '<div class="opts">' + Object.keys(l.choix).map(function (k) { return echappe(k + ' : ' + l.choix[k]); }).join(' · ') + '</div>' +
                '<div class="unit">Prix unitaire : ' + fm(l.prix) + (p && p.stock <= 8 ? ' · <span style="color:#b45309">stock limité (' + p.stock + ')</span>' : '') + '</div>' +
                '<div class="stepper">' +
                  '<button type="button" data-q="-1" data-cle="' + l.cle + '" aria-label="Diminuer">' + ic('i-b2-minus') + '</button>' +
                  '<input type="number" min="1" value="' + l.qte + '" data-set="' + l.cle + '" aria-label="Quantité">' +
                  '<button type="button" data-q="1" data-cle="' + l.cle + '" aria-label="Augmenter">' + ic('i-b2-plus') + '</button>' +
                '</div>' +
                '<button type="button" class="rm" data-del="' + l.cle + '">' + ic('i-b2-trash') + ' Retirer</button>' +
              '</div>' +
              '<div class="lt">' + fm(l.prix * l.qte) + '</div>' +
            '</div>';
          }).join('') +
          '<div class="pdp-actions"><button class="btn-ghost-sm" type="button" id="vider">' + ic('i-b2-trash') + ' Vider le panier</button></div>' +
        '</div>' + resume() + '</div>' + historique();
      brancherPromo();
      var g2 = document.getElementById('go2');
      if (g2) g2.addEventListener('click', function () { Etat.etape = 2; rendre(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      reveler();
      var v = document.getElementById('vider');
      if (v) v.addEventListener('click', function () { if (confirm('Vider tout le panier ?')) { vider(); rendre(); toast('Panier vidé'); } });
    }

    function recapLignes() {
      return '<div class="recap">' + Etat.panier.map(function (l) {
        return '<div class="mini"><span class="th" style="background-image:url(\'' + l.image + '\')"></span>' +
          '<span><b>' + echappe(l.nom) + '</b><small>' + echappe(Object.keys(l.choix).map(function (k) { return l.choix[k]; }).join(' · ')) + ' · ×' + l.qte + '</small></span>' +
          '<span>' + fm(l.prix * l.qte) + '</span></div>';
      }).join('') + '</div>';
    }

    function rendreLivraison() {
      zone.innerHTML = etapes(2) + '<div class="cart-grid">' +
        '<div class="panel">' +
          '<h2>' + ic('i-truck') + ' Adresse de livraison</h2>' +
          '<div class="field" id="f-nom"><label for="cNom">Nom complet</label><input class="ctrl" id="cNom" value="' + (Etat.compte ? echappe(Etat.compte.nom) : '') + '" placeholder="Ex. Ibrahim Sangaré"><div class="err">Merci d\'indiquer votre nom.</div></div>' +
          '<div class="field" id="f-tel"><label for="cTel">Téléphone</label><input class="ctrl" id="cTel" placeholder="+223 70 00 00 00"><div class="err">Numéro invalide (8 chiffres minimum).</div></div>' +
          '<div class="field" id="f-mail"><label for="cMail">Email (confirmation)</label><input class="ctrl" id="cMail" type="email" placeholder="vous@email.com"><div class="err">Adresse email invalide.</div></div>' +
          '<div class="field" id="f-ville"><label for="cVille">Ville de livraison</label>' +
            '<select class="ctrl" id="cVille"><option>Bamako</option><option>Ségou</option><option>Sikasso</option><option>Mopti</option><option>Kayes</option><option>Gao</option><option>Tombouctou</option><option>Autre ville</option></select>' +
            '<div class="err">Choisissez une ville.</div></div>' +
          '<div class="field" id="f-det"><label for="cDet">Quartier / repère</label><input class="ctrl" id="cDet" placeholder="Ex. Badalabougou, près de la pharmacie"><div class="err">Indiquez un point de repère pour le livreur.</div></div>' +
          '<div class="pdp-actions"><button class="btn-solid" style="flex:1" type="button" id="go3">' + ic('i-b2-check') + ' Continuer vers le paiement</button>' +
          '<button class="btn-line" type="button" id="back1">Retour au panier</button></div>' +
        '</div>' +
        '<div><div class="panel"><h2>' + ic('i-bag') + ' Votre commande</h2>' + recapLignes() + '</div>' + resume() + '</div>' +
      '</div>';
      brancherPromo();
      document.getElementById('go3').addEventListener('click', function () {
        var ok = true;
        function test(id, valide) { var f = document.getElementById(id); if (!f) return; f.classList.toggle('bad', !valide); if (!valide) ok = false; }
        var nom = document.getElementById('cNom').value.trim();
        var tel = document.getElementById('cTel').value.trim();
        var mail = document.getElementById('cMail').value.trim();
        var ville = document.getElementById('cVille').value;
        var det = document.getElementById('cDet').value.trim();
        test('f-nom', nom.length >= 2);
        test('f-tel', tel.replace(/\D/g, '').length >= 8);
        test('f-mail', /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail));
        test('f-ville', !!ville);
        test('f-det', det.length >= 3);
        if (!ok) { toast('Champs incomplets', 'Vérifiez les informations de livraison.', 'ko'); return; }
        Etat.livraison = { nom: nom, tel: tel, mail: mail, ville: ville, det: det };
        Etat.etape = 3; rendre(); window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      reveler();
      document.getElementById('back1').addEventListener('click', function () { Etat.etape = 1; rendre(); });
    }

    function rendrePaiement() {
      var modes = ['Orange Money', 'Moov Money', 'Wave', 'Espèces à la livraison'];
      zone.innerHTML = etapes(3) + '<div class="cart-grid">' +
        '<div class="panel">' +
          '<h2>' + ic('i-card') + ' Mode de paiement</h2>' +
          '<div class="pay-pills" id="pays">' + modes.map(function (m, i) {
            return '<button type="button" class="opt-pill' + (i === 0 ? ' on' : '') + '" data-pay="' + m + '">' + echappe(m) + '</button>';
          }).join('') + '</div>' +
          '<div id="payDetail" style="margin-top:16px">' +
            '<div class="field"><label for="payNum">Numéro Orange Money</label><input class="ctrl" id="payNum" placeholder="+223 7X XX XX XX">' +
            '<div style="font-size:12px;color:var(--grey);margin-top:6px">Une demande de confirmation sera envoyée sur ce numéro (démo : aucune transaction réelle).</div></div>' +
          '</div>' +
          '<div style="margin-top:14px;font-size:13px;color:#374151">' +
            '<b>Livraison à :</b> ' + echappe(Etat.livraison.nom) + ' · ' + echappe(Etat.livraison.tel) + '<br>' +
            echappe(Etat.livraison.det) + ', ' + echappe(Etat.livraison.ville) +
            ' <button class="btn-ghost-sm" style="margin-left:8px" type="button" id="editLiv">Modifier</button>' +
          '</div>' +
          '<div class="pdp-actions" style="margin-top:18px">' +
            '<button class="btn-solid" style="flex:1" type="button" id="pay">' + ic('i-b2-lock') + ' Payer ' + fm(total()) + '</button>' +
            '<button class="btn-line" type="button" id="back2">Retour</button>' +
          '</div>' +
        '</div>' +
        '<div><div class="panel"><h2>' + ic('i-bag') + ' Votre commande</h2>' + recapLignes() + '</div>' + resume() + '</div>' +
      '</div>';
      brancherPromo();
      document.getElementById('pays').addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-pay]');
        if (!b) return;
        Array.prototype.forEach.call(this.children, function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        Etat.paiement = b.getAttribute('data-pay');
        document.getElementById('payDetail').innerHTML = Etat.paiement === 'Espèces à la livraison'
          ? '<p style="font-size:13px;color:#374151">Préparez le montant exact : le livreur encaisse à la remise du colis.</p>'
          : '<div class="field"><label for="payNum">Numéro ' + echappe(Etat.paiement) + '</label><input class="ctrl" id="payNum" placeholder="+223 7X XX XX XX">' +
            '<div style="font-size:12px;color:var(--grey);margin-top:6px">Une demande de confirmation sera envoyée sur ce numéro (démo).</div></div>';
      });
      reveler();
      document.getElementById('back2').addEventListener('click', function () { Etat.etape = 2; rendre(); });
      document.getElementById('editLiv').addEventListener('click', function () { Etat.etape = 2; rendre(); });
      document.getElementById('pay').addEventListener('click', function () {
        var num = document.getElementById('payNum');
        if (Etat.paiement !== 'Espèces à la livraison' && num && num.value.replace(/\D/g, '').length < 8) {
          toast('Numéro manquant', 'Saisissez le numéro ' + Etat.paiement + '.', 'ko'); return;
        }
        Etat.derniere = {
          id: 'CMD-' + new Date().getFullYear() + '-' + String(Etat.commandes.length + 1).padStart(4, '0'),
          date: new Date().toISOString(),
          lignes: Etat.panier.map(function (l) { return { nom: l.nom, choix: l.choix, qte: l.qte, prix: l.prix }; }),
          sousTotal: sousTotal(), remise: remise(), promo: Etat.promo ? Etat.promo.code : null,
          livraison: frais(), total: total(),
          paiement: Etat.paiement, mobil: num ? num.value.trim() : '',
          livraison_adr: Etat.livraison
        };
        Etat.commandes.unshift(Etat.derniere);
        ecrire(CLE.commandes, Etat.commandes);
        vider();
        Etat.etape = 4;
        rendre(); window.scrollTo({ top: 0, behavior: 'smooth' });
        toast('Commande confirmée', Etat.derniere.id + ' — ' + fm(Etat.derniere.total), 'ok');
      });
    }

    function rendreConfirmation() {
      var c = Etat.derniere;
      zone.innerHTML = etapes(4) + '<div class="panel done">' +
        '<div class="badge-ok">' + ic('i-b2-check') + '</div>' +
        '<h2 style="justify-content:center;font-size:24px">Merci ' + echappe(c.livraison_adr.nom.split(' ')[0]) + ' ! Votre commande est enregistrée</h2>' +
        '<p style="color:var(--grey);font-size:14px;margin-top:8px">Numéro <b style="color:var(--violet-700)">' + c.id + '</b> · ' + fm(c.total) + ' · ' + echappe(c.paiement) + '</p>' +
        '<div style="max-width:520px;margin:22px auto 0;text-align:left">' +
          '<table class="spec"><tbody>' +
            '<tr><td>Livraison</td><td>' + echappe(c.livraison_adr.det) + ', ' + echappe(c.livraison_adr.ville) + '</td></tr>' +
            '<tr><td>Téléphone</td><td>' + echappe(c.livraison_adr.tel) + '</td></tr>' +
            '<tr><td>Délai estimé</td><td>' + (c.livraison_adr.ville.toLowerCase().indexOf('bamako') !== -1 ? '24 h' : '48 à 72 h') + '</td></tr>' +
            '<tr><td>Sous-total</td><td>' + fm(c.sousTotal) + '</td></tr>' +
            (c.remise ? '<tr><td>Remise ' + echappe(c.promo || '') + '</td><td>− ' + fm(c.remise) + '</td></tr>' : '') +
            '<tr><td>Livraison</td><td>' + (c.livraison ? fm(c.livraison) : 'Offerte') + '</td></tr>' +
            '<tr><td><b>Total payé</b></td><td><b style="color:var(--pink)">' + fm(c.total) + '</b></td></tr>' +
          '</tbody></table>' +
        '</div>' +
        '<div class="pdp-actions" style="justify-content:center;margin-top:22px">' +
          '<a class="btn-solid" href="produits.html">Continuer mes achats</a>' +
          '<a class="btn-line" href="https://wa.me/' + BOUTIQUE.whatsapp + '?text=' + encodeURIComponent('Bonjour, je souhaite suivre ma commande ' + c.id) + '" target="_blank" rel="noopener">' + ic('i-headset') + ' Suivre sur WhatsApp</a>' +
        '</div>' +
      '</div>' + historique();
      reveler();
    }

    function historique() {
      if (!Etat.commandes.length) return '';
      return '<div class="panel" style="margin-top:18px"><h2>' + ic('i-b2-info') + ' Mes commandes</h2>' +
        Etat.commandes.slice(0, 5).map(function (c) {
          return '<div class="srow" style="border-bottom:1px solid var(--line)">' +
            '<span><b>' + echappe(c.id) + '</b> · ' + new Date(c.date).toLocaleDateString('fr-FR') + ' · ' + c.lignes.length + ' article' + (c.lignes.length > 1 ? 's' : '') + '</span>' +
            '<b>' + fm(c.total) + '</b></div>';
        }).join('') + '</div>';
    }

    function brancherPromo() {
      var b = document.getElementById('ok-promo'), champ = document.getElementById('promo');
      if (!b || !champ) return;
      b.addEventListener('click', function () {
        var code = champ.value.trim().toUpperCase();
        var regle = PROMOS[code];
        var msg = document.getElementById('promoMsg');
        if (!code) { msg.className = 'promo-msg ko'; msg.textContent = 'Saisissez un code promo.'; return; }
        if (!regle) { msg.className = 'promo-msg ko'; msg.textContent = 'Code inconnu : ' + echappe(code); return; }
        if (regle.minimum && sousTotal() < regle.minimum) {
          msg.className = 'promo-msg ko'; msg.textContent = 'Valable dès ' + fm(regle.minimum) + ' d\'achat.'; return;
        }
        Etat.promo = { code: code, type: regle.type, valeur: regle.valeur };
        ecrire(CLE.promo, Etat.promo);
        rendre(); toast('Code appliqué', regle.libelle, 'ok');
      });
    }

    _relance.panier = rendre;
    rendre();
  }

  /* ═══════════════ 10. Connexion (modale démo) ═══════════════ */
  function brancherCompte() {
    var modal = document.getElementById('modal');
    var btn = document.querySelector('.hactions [data-user]');
    if (!modal || !btn) return;
    function ouvrir() {
      var box = modal.querySelector('.box');
      if (Etat.compte) {
        box.innerHTML = '<h2>Bonjour ' + echappe(Etat.compte.prenom) + '</h2>' +
          '<p class="sub">' + echappe(Etat.compte.email) + ' — ' + Etat.commandes.length + ' commande' + (Etat.commandes.length > 1 ? 's' : '') + ' · ' + Etat.favoris.length + ' favori' + (Etat.favoris.length > 1 ? 's' : '') + '</p>' +
          '<div class="demo">Espace client de démonstration : les données restent dans votre navigateur (localStorage).</div>' +
          '<div class="foot"><a class="btn-solid" style="flex:1" href="produits.html?fav=1">Mes favoris</a>' +
          '<button class="btn-line" type="button" id="out">Se déconnecter</button></div>';
      } else {
        box.innerHTML = '<h2>Se connecter</h2><p class="sub">Accédez à vos favoris et au suivi de vos commandes.</p>' +
          '<form id="cForm" style="margin-top:18px">' +
            '<div class="field"><label for="lMail">Email</label><input class="ctrl" id="lMail" type="email" placeholder="vous@email.com"></div>' +
            '<div class="field"><label for="lMdp">Mot de passe</label><input class="ctrl" id="lMdp" type="password" placeholder="••••••••"></div>' +
            '<div class="field" id="lErr" style="display:none"><div class="err" style="display:block" id="lErrTxt"></div></div>' +
            '<div class="pdp-actions"><button class="btn-solid" style="flex:1" type="submit">' + ic('i-user') + ' Se connecter</button>' +
            '<button class="btn-line" type="button" data-close>Fermer</button></div>' +
          '</form>' +
          '<div class="demo">Compte de démonstration : <code>demo@boutique.ml</code> / <code>demo1234</code> — n\'importe quel email avec un mot de passe de 4 caractères fonctionne aussi.</div>';
      }
      modal.classList.add('on');
    }
    btn.addEventListener('click', function (ev) { ev.preventDefault(); ouvrir(); });
    modal.addEventListener('click', function (ev) {
      if (ev.target === modal || ev.target.closest('[data-close]')) modal.classList.remove('on');
      if (ev.target.closest('#out')) { Etat.compte = null; ecrire(CLE.compte, null); majEntete(); modal.classList.remove('on'); toast('Déconnecté'); }
    });
    modal.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var mail = document.getElementById('lMail').value.trim();
      var mdp = document.getElementById('lMdp').value;
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail) || mdp.length < 4) {
        document.getElementById('lErr').style.display = 'block';
        document.getElementById('lErrTxt').textContent = (mdp.length < 4 ? 'Mot de passe : 4 caractères minimum.' : 'Adresse email invalide.');
        return;
      }
      var prenom = mail.split('@')[0].split(/[._-]/)[0].replace(/^\w/, function (c) { return c.toUpperCase(); });
      Etat.compte = { email: mail, nom: (document.title.indexOf('—') > 0 ? prenom : prenom), prenom: prenom };
      ecrire(CLE.compte, Etat.compte);
      majEntete();
      modal.classList.remove('on');
      toast('Connexion réussie', 'Bienvenue ' + prenom + ' !', 'ok');
    });
  }

  /* ═══════════════ 11. Événements globaux ═══════════════ */
  function brancherGlobal() {
    document.addEventListener('click', function (e) {
      var t = e.target;

      var fav = t.closest('[data-fav]');
      if (fav) {
        e.preventDefault();
        var ajout = basculerFavori(fav.getAttribute('data-fav'));
        var p = getProduit(fav.getAttribute('data-fav'));
        toast(ajout ? 'Ajouté aux favoris' : 'Retiré des favoris', p ? p.nom : '', ajout ? 'ok' : '');
        if (document.body.dataset.page === 'detail' && p) pageDetailReload();
        else if (document.body.dataset.page === 'liste') {
          fav.classList.toggle('on', ajout);
          var liste = document.getElementById('plist');
          if (liste && param('fav') === '1') pageListeReload();
        }
        return;
      }

      var add = t.closest('[data-add]');
      if (add) {
        var pr = getProduit(add.getAttribute('data-add'));
        if (!pr) return;
        var choix = pr._etat ? pr._etat.choix : choixDefaut(pr);
        var qte = pr._etat ? pr._etat.qte : 1;
        ajouter(pr.slug, choix, qte);
        toast('Ajouté au panier', pr.nom + ' — ' + fm(prixUnitaire(pr, choix) * qte), 'ok');
        return;
      }

      var supp = t.closest('[data-del]');
      if (supp) {
        retirer(supp.getAttribute('data-del'));
        toast('Article retiré');
        if (document.body.dataset.page === 'panier') pagePanierReload();
        return;
      }

      var q = t.closest('[data-q]');
      if (q) {
        var l = Etat.panier.filter(function (x) { return x.cle === q.getAttribute('data-cle'); })[0];
        if (l) { majQte(l.cle, l.qte + parseInt(q.getAttribute('data-q'), 10)); if (document.body.dataset.page === 'panier') pagePanierReload(); }
        return;
      }

      if (t.closest('[data-bag]')) { e.preventDefault(); ouvrirTiroir(); return; }
      if (t.closest('[data-fav-count]')) { e.preventDefault(); location.href = 'produits.html?fav=1'; return; }
      if (t.closest('[data-drawer-close]') || t.id === 'veil') { fermerTiroir(); return; }

      var open = t.closest('[data-open]');
      if (open) { location.href = 'ecommerce-produit.html?p=' + open.getAttribute('data-open'); return; }
    });

    document.addEventListener('change', function (e) {
      if (!e.target.matches('[data-set]')) return;
      majQte(e.target.getAttribute('data-set'), e.target.value);
      if (document.body.dataset.page === 'panier') pagePanierReload();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { fermerTiroir(); var m = document.getElementById('modal'); if (m) m.classList.remove('on'); }
      if (e.key !== 'Enter') return;
      var open = e.target.closest ? e.target.closest('[data-open]') : null;
      if (open) location.href = 'ecommerce-produit.html?p=' + open.getAttribute('data-open');
    });
  }

  /* Re-rendus ciblés */
  var _relance = { detail: null, liste: null, panier: null };
  function pageDetailReload() { if (_relance.detail) _relance.detail(); }
  function pageListeReload() { if (_relance.liste) _relance.liste(); }
  function pagePanierReload() { if (_relance.panier) _relance.panier(); }

  /* ═══════════════ 12. Ambiance (même logique que le template) ═══════════════ */
  var _io = null;
  function observateur() {
    if (_io) return _io;
    if (!('IntersectionObserver' in window)) return null;
    _io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); _io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    return _io;
  }
  /* Révèle les .rv (y compris ceux créés après le chargement : filtres, options…) */
  function reveler() {
    var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = reduit ? null : observateur();
    document.querySelectorAll('.grid .card').forEach(function (c, i) {
      if (!c.style.transitionDelay) c.style.transitionDelay = (i * 70) + 'ms';
    });
    document.querySelectorAll('.rv:not(.in):not([data-rv])').forEach(function (el) {
      el.setAttribute('data-rv', '1');
      if (!io || el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      else io.observe(el);
    });
  }
  function ambiance() {
    var barre = document.getElementById('progress');
    var planifie = false;
    function maj() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      var h = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (barre) barre.style.transform = 'scaleX(' + Math.min(1, y / h) + ')';
      document.documentElement.classList.toggle('scrolled', y > 8);
      planifie = false;
    }
    window.addEventListener('scroll', function () { if (!planifie) { planifie = true; requestAnimationFrame(maj); } }, { passive: true });
    maj();
    reveler();
  }

  /* ═══════════════ 13. Démarrage ═══════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    majEntete();
    rendreTiroir();
    brancherRecherche();
    brancherCompte();
    brancherGlobal();

    ambiance();

    var page = document.body.dataset.page;
    if (page === 'detail') {
      pageDetail();
      reveler();
    } else if (page === 'liste') {
      pageListe();
      reveler();
    } else if (page === 'panier') {
      pagePanier();
      reveler();
    }
  });
})();
