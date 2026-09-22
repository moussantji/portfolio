/* ==========================================================================
   app.js — Routage (hash), interactions, panier latéral, toasts
   ========================================================================== */
State.produit = null;      // état de la fiche produit (image, choix, quantité, onglet)
State.etapeCommande = 1;
State.commandeFaite = null;

/* ------------------------- Utilitaires route ------------------------- */
function parseQuery(qs) {
  var out = {};
  String(qs || '').split('&').forEach(function (paire) {
    if (!paire) return;
    var kv = paire.split('=');
    out[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
  });
  return out;
}
function segmentsHash() {
  var brut = (location.hash || '#/').replace(/^#\/?/, '');
  var parties = brut.split('?');
  return { segs: parties[0].split('/').filter(Boolean), query: parseQuery(parties[1]) };
}
function routeActuelle() {
  var s = segmentsHash().segs;
  if (!s.length) return 'accueil';
  if (s[0] === 'boutique') return 'boutique';
  if (s[0] === 'produit') return 'produit';
  if (s[0] === 'panier') return 'panier';
  if (s[0] === 'favoris') return 'favoris';
  if (s[0] === 'connexion') return 'connexion';
  if (s[0] === 'inscription') return 'inscription';
  if (s[0] === 'compte') return 'compte';
  if (s[0] === 'commande') return 'commande';
  if (s[0] === 'contact') return 'contact';
  return '404';
}

/* ------------------------- Rendu ------------------------- */
function htmlVue(route, segs, query) {
  switch (route) {
    case 'accueil': return vueAccueil();
    case 'boutique':
      if (query.cat && CAT_LABEL[query.cat]) State.filtres.cat = query.cat;
      if (query.q != null) State.filtres.q = query.q;
      return vueBoutique();
    case 'produit': {
      var produit = getProduit(segs[1]);
      if (!produit) return vue404();
      if (!State.produit || State.produit.slug !== produit.slug) {
        State.produit = { slug: produit.slug, choix: choixDefaut(produit), qte: 1, image: 0, onglet: 'description' };
        marquerVu(produit.id);
      }
      return vueProduit(produit);
    }
    case 'panier': return vuePanier();
    case 'favoris': return vueFavoris();
    case 'connexion': return State.user ? vueCompte() : vueLogin('connexion');
    case 'inscription': return State.user ? vueCompte() : vueLogin('inscription');
    case 'compte': return State.user ? vueCompte() : vueLogin('connexion');
    case 'commande': {
      if (!State.panier.length && State.etapeCommande !== 3) return vuePanier();
      return vueCommande(State.etapeCommande);
    }
    case 'contact': return vueAPropos();
    default: return vue404();
  }
}

function rendre(defiler) {
  var s = segmentsHash();
  var route = routeActuelle();
  var zone = document.getElementById('app');
  var produit = null;
  if (route === 'produit') produit = getProduit(s.segs[1]);
  if (route === 'produit' && State.produit) State.produit.slug = produit.slug;

  zone.innerHTML = htmlVue(route, s.segs, s.query);

  /* Titre de l'onglet */
  var titres = {
    accueil: 'Manden Baobab — Boutique en ligne',
    boutique: 'Catalogue — Manden Baobab',
    panier: 'Mon panier — Manden Baobab',
    favoris: 'Mes favoris — Manden Baobab',
    connexion: 'Connexion — Manden Baobab',
    inscription: 'Inscription — Manden Baobab',
    compte: 'Mon compte — Manden Baobab',
    commande: 'Commande — Manden Baobab',
    contact: 'Contact — Manden Baobab'
  };
  document.title = (produit ? produit.nom + ' — Manden Baobab' : (titres[route] || 'Manden Baobab')) + ' | Démo portfolio';

  /* Fil d'ariane FR sur les liens du menu */
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (a) {
    var cible = (a.getAttribute('href') || '').replace('#/', '');
    a.classList.toggle('active', cible === route || (route === 'produit' && cible === 'boutique'));
  });

  synchroEntete();
  majTiroir();

  if (defiler !== false) window.scrollTo({ top: 0, behavior: 'auto' });
}
function rafraichir() { rendre(false); }

/* ------------------------- Entête : compteurs + compte ------------------------- */
function synchroEntete() {
  var nbPanier = nombreArticles();
  var nbFavoris = State.favoris.length;

  document.querySelectorAll('[data-count="panier"]').forEach(function (el) {
    el.textContent = nbPanier;
    el.classList.toggle('empty', nbPanier === 0);
  });
  document.querySelectorAll('[data-count="favoris"]').forEach(function (el) {
    el.textContent = nbFavoris;
    el.classList.toggle('empty', nbFavoris === 0);
  });

  var nom = document.querySelector('#compteLabel');
  if (nom) nom.textContent = State.user ? State.user.nom.split(' ')[0] : 'Connexion';
  var avatar = document.querySelector('#compteAvatar');
  if (avatar) {
    avatar.innerHTML = State.user ? initiales(State.user.nom) : ic('user');
    if (State.user) avatar.style.background = 'linear-gradient(135deg,rgba(212,175,55,.4),rgba(56,189,248,.35))';
  }
  var lienCompte = document.querySelector('#compteBtn');
  if (lienCompte) lienCompte.setAttribute('href', State.user ? '#/compte' : '#/connexion');
}

/* ------------------------- Tiroir panier ------------------------- */
function majTiroir() {
  var corps = document.getElementById('drawerBody');
  var pied = document.getElementById('drawerFoot');
  if (!corps) return;
  if (!State.panier.length) {
    corps.innerHTML = `<div class="center" style="padding:40px 10px">
      <span style="display:inline-grid;place-items:center;width:56px;height:56px;border-radius:50%;background:rgba(212,175,55,.12);border:1px solid var(--line-gold);color:var(--gold)">${ic('cart')}</span>
      <p class="muted mt-16" style="font-size:12.5px">Votre panier est vide.</p>
      <a class="btn btn-gold btn-sm mt-16" href="#/boutique" data-action="fermer-tiroir">Découvrir les produits</a>
    </div>`;
    pied.innerHTML = '';
    return;
  }
  corps.innerHTML = lignesPanierHTML(true);
  var st = sousTotal(), remise = montantRemise(), liv = fraisLivraison();
  pied.innerHTML = `
    <div class="srow"><span>Sous-total</span><b>${fm(st)}</b></div>
    ${remise ? `<div class="srow"><span>Remise ${State.promo ? State.promo.code : ''}</span><b style="color:#6ee7b7">− ${fm(remise)}</b></div>` : ''}
    <div class="srow"><span>Livraison</span><b>${liv ? fm(liv) : 'Offerte'}</b></div>
    <div class="stotal"><span>Total</span><b>${fmCourt(st - remise + liv)} ${DEVISE}</b></div>
    <div class="row mt-16">
      <a class="btn btn-gold grow" href="#/panier" data-action="fermer-tiroir">${ic('cart')} Voir le panier</a>
      <a class="btn btn-green grow" href="#/commande" data-action="fermer-tiroir">${ic('checkCircle')} Commander</a>
    </div>`;
}
function ouvrirTiroir() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.classList.add('no-scroll');
}
function fermerTiroir() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/* ------------------------- Toasts ------------------------- */
function toast(titre, message, type) {
  var zone = document.getElementById('toasts');
  var el = document.createElement('div');
  el.className = 'toast ' + (type || '');
  el.innerHTML = ic(type === 'err' ? 'alert' : type === 'ok' ? 'checkCircle' : 'info') +
    '<span><b>' + titre + '</b>' + (message ? '<p>' + message + '</p>' : '') + '</span>';
  zone.appendChild(el);
  setTimeout(function () {
    el.style.transition = '.3s'; el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    setTimeout(function () { el.remove(); }, 320);
  }, 3400);
}

/* ------------------------- Visionneuse image ------------------------- */
function ouvrirImage(src, alt) {
  var m = document.getElementById('lightbox');
  m.querySelector('img').src = src;
  m.querySelector('img').alt = alt || 'Aperçu';
  m.classList.add('open');
}
function fermerImage() { document.getElementById('lightbox').classList.remove('open'); }

/* ------------------------- Ajouter au panier ------------------------- */
function ajouterDepuisProduit(produit, choix, qte) {
  if (produit.stock <= 0) { toast('Rupture de stock', 'Ce produit sera bientôt de retour.', 'err'); return; }
  ajouterAuPanier(produit, choix, qte);
  majTiroir();
  synchroEntete();
  toast('Ajouté au panier', produit.nom + ' — ' + fm(prixUnitaire(produit, choix) * (qte || 1)), 'ok');
  ouvrirTiroir();
}

/* ------------------------- Événements ------------------------- */
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-action]');
  if (!el) return;
  var a = el.getAttribute('data-action');
  var slug, produit;

  switch (a) {
    /* --- Favoris --- */
    case 'favori': {
      var id = el.getAttribute('data-id');
      var ajoute = basculerFavori(id);
      toast(ajoute ? 'Ajouté aux favoris' : 'Retiré des favoris',
        ajoute ? 'Retrouvez-le dans la page Favoris.' : null, ajoute ? 'ok' : '');
      rafraichir();
      break;
    }
    /* --- Panier --- */
    case 'ajouter': {
      slug = el.getAttribute('data-slug');
      produit = getProduit(slug);
      if (!produit) break;
      var choix = (State.produit && State.produit.slug === produit.slug) ? State.produit.choix : choixDefaut(produit);
      var qte = (State.produit && State.produit.slug === produit.slug) ? State.produit.qte : 1;
      ajouterDepuisProduit(produit, choix, qte);
      break;
    }
    case 'acheter': {
      slug = el.getAttribute('data-slug');
      produit = getProduit(slug);
      if (!produit) break;
      var c2 = (State.produit && State.produit.slug === produit.slug) ? State.produit.choix : choixDefaut(produit);
      var q2 = (State.produit && State.produit.slug === produit.slug) ? State.produit.qte : 1;
      ajouterAuPanier(produit, c2, q2);
      majTiroir(); synchroEntete();
      location.hash = '#/commande';
      break;
    }
    case 'ouvrir-tiroir': ouvrirTiroir(); break;
    case 'fermer-tiroir': fermerTiroir(); break;
    case 'retirer': {
      retirerDuPanier(el.getAttribute('data-cle'));
      toast('Article retiré', null, '');
      rafraichir(); majTiroir();
      break;
    }
    case 'ligne-plus':
    case 'ligne-moins': {
      var cle = el.getAttribute('data-cle');
      var ligne = State.panier.filter(function (x) { return x.cle === cle; })[0];
      if (!ligne) break;
      majQuantite(cle, ligne.qte + (a === 'ligne-plus' ? 1 : -1));
      rafraichir(); majTiroir();
      break;
    }
    case 'vider-panier':
      if (confirm('Vider entièrement votre panier ?')) {
        viderPanier(); toast('Panier vidé', null, ''); rafraichir(); majTiroir();
      }
      break;
    case 'promo': {
      var champ = document.getElementById('promoInput');
      var res = appliquerPromo(champ ? champ.value : '');
      toast(res.ok ? 'Code promo appliqué' : 'Code refusé', res.msg, res.ok ? 'ok' : 'err');
      if (res.ok) { rafraichir(); majTiroir(); }
      break;
    }
    case 'checkout':
      State.etapeCommande = 1;
      if (!estConnecte()) {
        toast('Connexion requise', 'Connectez-vous ou créez un compte pour finaliser la commande.', '');
        location.hash = '#/connexion';
      } else {
        location.hash = '#/commande';
      }
      break;
    case 'favoris-vers-panier': {
      produitsFavoris().forEach(function (p) { ajouterAuPanier(p, choixDefaut(p), 1); });
      majTiroir(); synchroEntete(); rafraichir();
      toast('Favoris ajoutés au panier', nombreArticles() + ' article(s) au total', 'ok');
      break;
    }

    /* --- Fiche produit --- */
    case 'gal-img':
      State.produit.image = parseInt(el.getAttribute('data-index'), 10) || 0;
      rafraichir();
      break;
    case 'gal-prev':
    case 'gal-next': {
      var p0 = getProduit(State.produit.slug);
      var n = p0.images.length;
      State.produit.image = ((State.produit.image || 0) + (a === 'gal-next' ? 1 : -1) + n) % n;
      rafraichir();
      break;
    }
    case 'option': {
      State.produit.choix[el.getAttribute('data-option')] = el.getAttribute('data-valeur');
      rafraichir();
      break;
    }
    case 'qte-plus':
    case 'qte-moins': {
      var prod = getProduit(State.produit.slug);
      var delta = a === 'qte-plus' ? 1 : -1;
      State.produit.qte = Math.min(Math.max(1, (State.produit.qte || 1) + delta), Math.max(prod.stock, 1));
      rafraichir();
      break;
    }
    case 'onglet':
      State.produit.onglet = el.getAttribute('data-onglet');
      rafraichir();
      break;
    case 'ouvrir-avis-form':
      document.getElementById('avisFormBox').classList.remove('hidden');
      break;
    case 'fermer-avis-form':
      document.getElementById('avisFormBox').classList.add('hidden');
      break;
    case 'etoile': {
      var note = parseInt(el.getAttribute('data-note'), 10);
      el.parentNode.setAttribute('data-note', note);
      Array.prototype.forEach.call(el.parentNode.children, function (b, i) {
        b.classList.toggle('on', i < note);
      });
      break;
    }
    case 'envoyer-avis': {
      var picker = document.getElementById('starPicker');
      var noteChoisie = parseInt(picker.getAttribute('data-note') || '0', 10);
      var texte = document.getElementById('avisTexte').value.trim();
      var nomSaisi = document.getElementById('avisNom').value.trim();
      if (!texte) { toast('Avis incomplet', 'Merci d\'écrire quelques mots.', 'err'); break; }
      ajouterAvis(el.getAttribute('data-id'), noteChoisie || 5, texte, nomSaisi);
      toast('Merci pour votre avis !', 'Il est maintenant publié sur la fiche produit.', 'ok');
      rafraichir();
      break;
    }

    /* --- Filtres catalogue --- */
    case 'filtre-cat':
      State.filtres.cat = el.getAttribute('data-cat');
      location.hash = '#/boutique';
      rafraichir();
      break;
    case 'reset-filtres':
      State.filtres = { cat: 'tous', tri: 'populaire', q: '', promo: false, stock: false };
      var champRecherche = document.getElementById('searchInput');
      if (champRecherche) champRecherche.value = '';
      rendre(false);
      break;

    /* --- Authentification --- */
    case 'auth-tab':
      location.hash = el.getAttribute('data-mode') === 'inscription' ? '#/inscription' : '#/connexion';
      break;
    case 'login-demo': {
      document.getElementById('email').value = 'demo@mandenbaobab.ml';
      document.getElementById('mdp').value = 'demo1234';
      toast('Compte de démo rempli', 'Cliquez sur « Se connecter ».', '');
      break;
    }
    case 'mdp-oublie': {
      var em = (document.getElementById('email') || {}).value;
      toast('Mot de passe oublié', em ? 'Un lien serait envoyé à ' + em + ' (démo : non implémenté).' : 'Saisissez d\'abord votre email.', '');
      break;
    }
    case 'social':
      toast('Connexion ' + el.getAttribute('data-reseau'), 'Disponible uniquement dans la version connectée à un serveur.', '');
      break;
    case 'deconnexion':
      deconnecter();
      toast('Déconnecté', 'À bientôt sur Manden Baobab !', 'ok');
      location.hash = '#/';
      break;
    case 'infos-demo':
      toast('Édition du profil', 'Fonction de démonstration — non modifiable ici.', '');
      break;

    /* --- Commande --- */
    case 'vers-paiement': {
      if (!validerLivraison()) break;
      State.etapeCommande = 2;
      rafraichir();
      break;
    }
    case 'retour-livraison':
      State.etapeCommande = 1;
      rafraichir();
      break;
    case 'paiement': {
      Array.prototype.forEach.call(el.parentNode.children, function (b) { b.classList.remove('active'); });
      el.classList.add('active');
      State.modePaiement = el.getAttribute('data-mode');
      var det = document.getElementById('paiementDetail');
      if (det) {
        det.innerHTML = State.modePaiement === 'Espèces à la livraison'
          ? '<p class="muted" style="font-size:11.5px">Préparez le montant exact, le livreur encaisse à la remise du colis.</p>'
          : '<div class="field"><label>Numéro ' + State.modePaiement + '</label><input class="input" id="cNumMobile" placeholder="+223 7X XX XX XX"><div class="hint">Vous recevrez une demande de confirmation sur votre téléphone.</div></div>';
      }
      break;
    }
    case 'confirmer-commande': {
      var conditions = document.getElementById('cConditions');
      if (conditions && !conditions.checked) { toast('Conditions non acceptées', 'Merci de cocher la case conditions de vente.', 'err'); break; }
      var mode = State.modePaiement || 'Orange Money';
      var num = document.getElementById('cNumMobile');
      if (mode !== 'Espèces à la livraison' && num && num.value.trim().length < 8) {
        toast('Numéro manquant', 'Saisissez le numéro ' + mode + ' (8 chiffres minimum).', 'err'); break;
      }
      var res = passerCommande(Object.assign({}, State.infosLivraison, { paiement: mode, mobile: num ? num.value.trim() : '' }));
      if (!res.ok) { toast('Commande impossible', res.msg, 'err'); break; }
      State.commandeFaite = res.commande;
      State.etapeCommande = 3;
      synchroEntete(); majTiroir();
      rafraichir();
      toast('Commande confirmée !', 'Numéro ' + res.commande.id + ' — ' + fm(res.commande.total), 'ok');
      break;
    }

    /* --- Contact --- */
    case 'envoyer-message': {
      var msg = document.getElementById('kMsg');
      if (!msg || msg.value.trim().length < 5) { toast('Message vide', 'Écrivez quelques mots avant d\'envoyer.', 'err'); break; }
      toast('Message envoyé (démo)', 'Sur la version en ligne, il part vers le back-office Laravel.', 'ok');
      msg.value = '';
      break;
    }

    /* --- Navigation / modale --- */
    case 'burger':
      document.getElementById('mobileNav').classList.toggle('open');
      break;
  }
});

/* Clic sur une image de la galerie → plein écran */
document.addEventListener('click', function (e) {
  var img = e.target.closest('.zoom-img');
  if (img) ouvrirImage(img.getAttribute('data-full') || img.src, img.getAttribute('aria-label') || img.alt);
  if (e.target.id === 'lightbox' || e.target.closest('#lightbox .close')) fermerImage();
  if (e.target.id === 'overlay') fermerTiroir();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { fermerImage(); fermerTiroir(); }
});

/* Champs : changement de quantité, tri, cases à cocher */
document.addEventListener('change', function (e) {
  var el = e.target.closest('[data-action]');
  if (!el) return;
  var a = el.getAttribute('data-action');
  if (a === 'ligne-qte') {
    majQuantite(el.getAttribute('data-cle'), el.value);
    rafraichir(); majTiroir();
  } else if (a === 'qte-set') {
    var prod = getProduit(State.produit.slug);
    State.produit.qte = Math.min(Math.max(1, parseInt(el.value, 10) || 1), Math.max(prod.stock, 1));
    rafraichir();
  } else if (a === 'tri') {
    State.filtres.tri = el.value;
    rafraichir();
  } else if (a === 'filtre-promo') {
    State.filtres.promo = el.checked;
    rafraichir();
  } else if (a === 'filtre-stock') {
    State.filtres.stock = el.checked;
    rafraichir();
  }
});

/* Recherche instantanée */
document.addEventListener('input', function (e) {
  if (e.target.id !== 'searchInput') return;
  State.filtres.q = e.target.value;
  if (routeActuelle() !== 'boutique') location.hash = '#/boutique';
  else rafraichir();
});
document.addEventListener('keydown', function (e) {
  if (e.target.id === 'searchInput' && e.key === 'Enter') {
    e.preventDefault();
    if (routeActuelle() !== 'boutique') location.hash = '#/boutique'; else rafraichir();
  }
});

/* Formulaire de connexion / inscription */
document.addEventListener('submit', function (e) {
  if (e.target.id !== 'authForm') return;
  e.preventDefault();
  var mode = routeActuelle() === 'inscription' ? 'inscription' : 'connexion';
  var nom = (document.getElementById('nom') || {}).value || '';
  var email = (document.getElementById('email') || {}).value || '';
  var mdp = (document.getElementById('mdp') || {}).value || '';
  var mdp2 = (document.getElementById('mdp2') || {}).value || '';
  var boite = document.getElementById('authErreur');
  var ok = true;

  function marque(id, valide) {
    var f = document.getElementById(id);
    if (!f) return;
    f.classList.toggle('invalid', !valide);
    if (!valide) ok = false;
  }
  if (mode === 'inscription') marque('f-nom', nom.trim().length >= 2);
  marque('f-email', /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim()));
  marque('f-mdp', mode === 'inscription' ? mdp.length >= 6 : mdp.length > 0);
  if (mode === 'inscription') marque('f-mdp2', mdp === mdp2 && mdp2.length > 0);

  if (!ok) {
    boite.style.display = 'block';
    boite.textContent = 'Veuillez corriger les champs en rouge.';
    return;
  }
  boite.style.display = 'none';

  var res = mode === 'inscription' ? inscrire(nom, email, mdp) : connecter(email, mdp);
  if (!res.ok) {
    boite.style.display = 'block';
    boite.textContent = res.msg;
    return;
  }
  toast(res.ok ? 'Connexion réussie' : '', res.msg, 'ok');
  synchroEntete();
  var suite = sessionStorage.getItem('mb_apres_login');
  sessionStorage.removeItem('mb_apres_login');
  location.hash = suite || '#/compte';
});

/* Validation de l'étape livraison */
function validerLivraison() {
  var ok = true;
  function test(idChamp, idBox, valide) {
    var f = document.getElementById(idBox);
    if (!f) return;
    f.classList.toggle('invalid', !valide);
    if (!valide) ok = false;
  }
  var nom = document.getElementById('cNom').value.trim();
  var tel = document.getElementById('cTel').value.trim();
  var email = document.getElementById('cEmail').value.trim();
  var ville = document.getElementById('cVille').value;
  var details = document.getElementById('cDetails').value.trim();
  test('cNom', 'c-nom', nom.length >= 2);
  test('cTel', 'c-tel', tel.replace(/\D/g, '').length >= 8);
  test('cEmail', 'c-mail2', /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email));
  test('cVille', 'c-ville', !!ville);
  test('cDetails', 'c-det', details.length >= 3);
  if (!ok) { toast('Champs incomplets', 'Merci de vérifier les informations de livraison.', 'err'); return false; }
  State.infosLivraison = { nom: nom, tel: tel, email: email, ville: ville, details: details };
  State.modePaiement = State.modePaiement || 'Orange Money';
  return true;
}

/* ------------------------- Démarrage ------------------------- */
window.addEventListener('hashchange', function () { rendre(); });
window.addEventListener('DOMContentLoaded', demarrer);
var demarre = false;
function demarrer() {
  if (demarre) return;
  demarre = true;
  initialiserStore();
  State.modePaiement = 'Orange Money';
  var champ = document.getElementById('searchInput');
  if (champ) champ.value = State.filtres.q || '';
  rendre();
}
if (document.readyState !== 'loading') demarrer();
