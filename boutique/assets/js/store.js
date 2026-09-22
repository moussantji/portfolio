/* ==========================================================================
   store.js — État global de la boutique + persistance localStorage
   (Démo front-end : aucune donnée n'est envoyée sur un serveur)
   ========================================================================== */
var CLE = {
  panier: 'mb_panier_v1',
  favoris: 'mb_favoris_v1',
  comptes: 'mb_comptes_v1',
  session: 'mb_session_v1',
  commandes: 'mb_commandes_v1',
  avis: 'mb_avis_v1',
  promo: 'mb_promo_v1',
  vus: 'mb_vus_v1'
};

var State = {
  panier: [],
  favoris: [],
  comptes: [],
  user: null,
  commandes: [],
  avis: [],       // avis ajoutés localement par l'utilisateur
  promo: null,
  vus: [],        // derniers produits consultés
  filtres: { cat: 'tous', tri: 'populaire', q: '' },
  panierOuvert: false
};

/* ------------------------- Utilitaires ------------------------- */
function lire(cle, defaut) {
  try {
    var raw = localStorage.getItem(cle);
    return raw ? JSON.parse(raw) : defaut;
  } catch (e) { return defaut; }
}
function ecrire(cle, valeur) {
  try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch (e) { /* mode privé / quota */ }
}

/* Prix : 27500 → "27 500 FCFA" */
function fm(n) {
  var v = Math.round(Number(n) || 0);
  return v.toLocaleString('fr-FR').replace(/\u202f/g, ' ') + ' ' + DEVISE;
}
function fmCourt(n) {
  return (Math.round(Number(n) || 0)).toLocaleString('fr-FR').replace(/\u202f/g, ' ');
}
function dateFr(iso) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) { return iso; }
}
function echappe(txt) {
  return String(txt == null ? '' : txt)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function initiales(nom) {
  return String(nom || '?').trim().split(/\s+/).slice(0, 2)
    .map(function (m) { return m.charAt(0).toUpperCase(); }).join('');
}
function maintenantIso() { return new Date().toISOString(); }

/* Encodage minimal du mot de passe (démo uniquement — ce n'est PAS de la sécurité) */
function brouille(mdp) { try { return btoa(unescape(encodeURIComponent('mb::' + mdp))); } catch (e) { return 'mb::' + mdp; } }

/* ------------------------- Accès produits ------------------------- */
function getProduit(ref) {
  if (!ref) return null;
  return PRODUITS.filter(function (p) { return p.slug === ref || p.id === ref; })[0] || null;
}
function valeurNom(v) { return typeof v === 'string' ? v : v.nom; }
function valeurExtra(v) { return typeof v === 'string' ? 0 : (v.extra || 0); }

/* Choix par défaut : premier valeur de chaque option */
function choixDefaut(produit) {
  var choix = {};
  (produit.options || []).forEach(function (o) { choix[o.nom] = valeurNom(o.valeurs[0]); });
  return choix;
}
/* Prix unitaire = prix de base + suppléments des options choisies */
function prixUnitaire(produit, choix) {
  var total = produit.prix;
  (produit.options || []).forEach(function (o) {
    var sel = choix ? choix[o.nom] : null;
    o.valeurs.forEach(function (v) { if (valeurNom(v) === sel) total += valeurExtra(v); });
  });
  return total;
}
function cleLigne(id, choix) {
  var parts = Object.keys(choix || {}).sort().map(function (k) { return k + ':' + choix[k]; });
  return id + '|' + parts.join('|');
}
function noteProduit(produit) {
  var extra = State.avis.filter(function (a) { return a.produitId === produit.id; });
  if (!extra.length) return { note: produit.note, nb: produit.avis };
  var somme = produit.note * produit.avis;
  extra.forEach(function (a) { somme += a.note; });
  var nb = produit.avis + extra.length;
  return { note: Math.round((somme / nb) * 10) / 10, nb: nb };
}
function estNouveau(produit) { return produit.badge === 'Nouveau' || produit.vendus < 70; }
function enPromo(produit) { return !!produit.ancienPrix; }
function remisePct(produit) {
  if (!produit.ancienPrix) return 0;
  return Math.round((1 - produit.prix / produit.ancienPrix) * 100);
}

/* ------------------------- Panier ------------------------- */
function lignePrix(l) { return l.prix * l.qte; }
function sousTotal() { return State.panier.reduce(function (s, l) { return s + lignePrix(l); }, 0); }
function nombreArticles() { return State.panier.reduce(function (s, l) { return s + l.qte; }, 0); }

function ajouterAuPanier(produit, choix, qte) {
  choix = choix || choixDefaut(produit);
  qte = Math.max(1, parseInt(qte, 10) || 1);
  var cle = cleLigne(produit.id, choix);
  var existante = State.panier.filter(function (l) { return l.cle === cle; })[0];
  if (existante) {
    existante.qte = Math.min(existante.qte + qte, Math.max(produit.stock, 1));
  } else {
    State.panier.push({
      cle: cle, id: produit.id, slug: produit.slug, nom: produit.nom,
      image: produit.images[0].src, prix: prixUnitaire(produit, choix),
      prixBase: produit.prix, choix: choix, qte: Math.min(qte, Math.max(produit.stock, 1))
    });
  }
  sauverPanier();
  return cle;
}
function majQuantite(cle, qte) {
  var l = State.panier.filter(function (x) { return x.cle === cle; })[0];
  if (!l) return;
  qte = parseInt(qte, 10) || 1;
  if (qte <= 0) return retirerDuPanier(cle);
  var produit = getProduit(l.id);
  l.qte = Math.min(qte, produit ? Math.max(produit.stock, 1) : 99);
  sauverPanier();
}
function retirerDuPanier(cle) {
  State.panier = State.panier.filter(function (x) { return x.cle !== cle; });
  sauverPanier();
}
function viderPanier() {
  State.panier = []; State.promo = null;
  sauverPanier(); ecrire(CLE.promo, null);
}
function sauverPanier() { ecrire(CLE.panier, State.panier); }

/* ------------------------- Promo / livraison / total ------------------------- */
function appliquerPromo(code) {
  var c = String(code || '').trim().toUpperCase();
  if (!c) return { ok: false, msg: 'Saisissez un code promo.' };
  var regle = REGLES.promos[c];
  if (!regle) return { ok: false, msg: 'Code promo inconnu : ' + echappe(c) };
  if (regle.minimum && sousTotal() < regle.minimum) {
    return { ok: false, msg: 'Ce code est valable dès ' + fm(regle.minimum) + ' d\'achat.' };
  }
  State.promo = { code: c, type: regle.type, valeur: regle.valeur };
  ecrire(CLE.promo, State.promo);
  return { ok: true, msg: 'Code ' + c + ' appliqué — ' + regle.libelle };
}
function montantRemise() {
  if (!State.promo) return 0;
  var st = sousTotal();
  if (State.promo.type === 'pourcent') return Math.round(st * State.promo.valeur / 100);
  return Math.min(State.promo.valeur, st);
}
function fraisLivraison() {
  if (!State.panier.length) return 0;
  return sousTotal() >= REGLES.francoDePort ? 0 : REGLES.livraisonStandard;
}
function totalAPayer() { return Math.max(0, sousTotal() - montantRemise()) + fraisLivraison(); }

/* ------------------------- Favoris ------------------------- */
function basculerFavori(id) {
  var i = State.favoris.indexOf(id);
  var ajoute = i === -1;
  if (ajoute) State.favoris.push(id); else State.favoris.splice(i, 1);
  ecrire(CLE.favoris, State.favoris);
  return ajoute;
}
function estFavori(id) { return State.favoris.indexOf(id) !== -1; }
function produitsFavoris() {
  return State.favoris.map(getProduit).filter(Boolean);
}

/* ------------------------- Comptes ------------------------- */
function inscrire(nom, email, mdp) {
  email = String(email || '').trim().toLowerCase();
  if (State.comptes.some(function (c) { return c.email === email; }))
    return { ok: false, msg: 'Un compte existe déjà avec cet email.' };
  var compte = { nom: nom.trim(), email: email, mdp: brouille(mdp), cree: maintenantIso() };
  State.comptes.push(compte);
  ecrire(CLE.comptes, State.comptes);
  ouvrirSession(compte);
  return { ok: true, msg: 'Bienvenue ' + compte.nom + ' ! Votre compte est créé.' };
}
function connecter(email, mdp) {
  email = String(email || '').trim().toLowerCase();
  var compte = State.comptes.filter(function (c) { return c.email === email; })[0];
  if (!compte) return { ok: false, msg: 'Aucun compte trouvé avec cet email.' };
  if (compte.mdp !== brouille(mdp)) return { ok: false, msg: 'Mot de passe incorrect.' };
  ouvrirSession(compte);
  return { ok: true, msg: 'Content de vous revoir, ' + compte.nom + ' !' };
}
function ouvrirSession(compte) {
  State.user = { nom: compte.nom, email: compte.email };
  ecrire(CLE.session, State.user);
}
function deconnecter() {
  State.user = null;
  ecrire(CLE.session, null);
}
function estConnecte() { return !!State.user; }
function commandesUtilisateur() {
  if (!State.user) return [];
  return State.commandes.filter(function (c) { return c.email === State.user.email; });
}

/* ------------------------- Commandes ------------------------- */
function numeroCommande() {
  var annee = new Date().getFullYear();
  var n = State.commandes.length + 1;
  return 'MB-' + annee + '-' + String(n).padStart(4, '0');
}
function passerCommande(info) {
  if (!State.panier.length) return { ok: false, msg: 'Votre panier est vide.' };
  if (!estConnecte()) return { ok: false, msg: 'Connectez-vous pour valider la commande.' };
  var commande = {
    id: numeroCommande(),
    date: maintenantIso(),
    email: State.user.email,
    client: State.user.nom,
    lignes: State.panier.map(function (l) { return { nom: l.nom, qte: l.qte, prix: l.prix, choix: l.choix }; }),
    sousTotal: sousTotal(),
    remise: montantRemise(),
    promo: State.promo ? State.promo.code : null,
    livraison: fraisLivraison(),
    total: totalAPayer(),
    paiement: info.paiement,
    adresse: info,
    statut: info.paiement === 'Espèces à la livraison' ? 'En préparation' : 'Payée — en préparation'
  };
  State.commandes.unshift(commande);
  ecrire(CLE.commandes, State.commandes);
  viderPanier();
  return { ok: true, commande: commande };
}

/* ------------------------- Avis clients ------------------------- */
function ajouterAvis(produitId, note, texte, nom) {
  State.avis.unshift({
    produitId: produitId, note: Number(note) || 5, texte: texte,
    nom: nom || (State.user ? State.user.nom : 'Client Manden Baobab'),
    date: dateFr(maintenantIso()), local: true
  });
  ecrire(CLE.avis, State.avis);
}
function avisDe(produit) {
  var locaux = State.avis.filter(function (a) { return a.produitId === produit.id; });
  return locaux.concat(produit.avisClients || []);
}

/* ------------------------- Produits vus ------------------------- */
function marquerVu(id) {
  State.vus = [id].concat(State.vus.filter(function (x) { return x !== id; })).slice(0, 6);
  ecrire(CLE.vus, State.vus);
}

/* ------------------------- Cycle de vie ------------------------- */
function initialiserStore() {
  State.panier = lire(CLE.panier, []) || [];
  State.favoris = lire(CLE.favoris, []) || [];
  State.comptes = lire(CLE.comptes, []) || [];
  State.commandes = lire(CLE.commandes, []) || [];
  State.avis = lire(CLE.avis, []) || [];
  State.promo = lire(CLE.promo, null);
  State.vus = lire(CLE.vus, []) || [];
  State.user = lire(CLE.session, null);

  /* Compte de démonstration toujours disponible */
  if (!State.comptes.some(function (c) { return c.email === 'demo@mandenbaobab.ml'; })) {
    State.comptes.push({ nom: 'Client Démo', email: 'demo@mandenbaobab.ml', mdp: brouille('demo1234'), cree: maintenantIso() });
    ecrire(CLE.comptes, State.comptes);
  }
  /* Le panier ne doit garder que des produits existants */
  State.panier = State.panier.filter(function (l) { return !!getProduit(l.id); });
  if (State.promo && !REGLES.promos[State.promo.code]) State.promo = null;
}
function reinitialiserDemo() {
  Object.keys(CLE).forEach(function (k) { try { localStorage.removeItem(CLE[k]); } catch (e) {} });
  location.hash = '#/';
  location.reload();
}
