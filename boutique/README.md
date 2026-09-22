# 🛍️ Manden Baobab — Boutique en ligne (démo)

Boutique e-commerce **100 % front-end** créée comme démonstration pour le portfolio de
**Moussa N'tji Diallo** (développeur Full Stack — Laravel • React • React Native).

👉 En ligne : `boutique/index.html` (aucun build, aucune dépendance, fonctionne sur GitHub Pages).

---

## ✨ Fonctionnalités

| Écran | Ce qui est implémenté |
|---|---|
| **Accueil** | Hero, catégories, produits les plus vendus, nouveautés, avis clients, produits déjà consultés |
| **Catalogue** | 10 produits, recherche instantanée, filtres par catégorie, filtre Promo / En stock, 5 tris (popularité, prix ↑↓, notes, nouveautés) |
| **Affichage détail produit** | Galerie 3 vues (ensemble + zooms) + loupette plein écran, badges (Promo, Nouveau, Top vente…), note et nombre d'avis, prix barré + % de remise, stock en direct, options (tailles, coloris en pastilles, longueurs, gravure…), quantité, prix total recalculé en direct, réassurance, barre d'achat fixe sur mobile |
| **Onglets produit** | Description, Caractéristiques (tableau), Avis clients (dépôt d'avis noté ⭐ + recalcul de la moyenne), Livraison & retour |
| **Produits similaires** | Suggestions automatiques par catégorie |
| **Panier** | Page panier complète + tiroir latéral, modification des quantités, suppression, vidage, barre de progression « livraison offerte », codes promo, calcul sous-total / remise / livraison / total |
| **Favoris** | Cœur sur chaque carte et sur la fiche produit, page dédiée, ajout en masse au panier, persistance |
| **Login / Compte** | Connexion + inscription (validation champ par champ, email unique, mot de passe confirmé), compte de démo, boutons sociaux (démo), espace client : commandes passées, favoris, informations, points de fidélité |
| **Commande** | Tunnel en 3 étapes : livraison (validation), paiement (Orange Money / Moov Money / espèces), confirmation avec numéro de commande, récapitulatif et suivi dans le compte |
| **Divers** | Toasts, tiroir latéral, modale image, menu mobile, fil d'Ariane, titres de page dynamiques, réinitialisation de la démo |

## 🔑 Accès démo

- **Compte client :** `demo@mandenbaobab.ml` / `demo1234` (bouton « Remplir automatiquement » sur la page de connexion)
- **Codes promo :** `BAOBAB10` (-10 %), `BIENVENUE` (-2 000 FCFA dès 20 000), `WAX5000` (-5 000 FCFA dès 60 000)
- **Livraison :** 2 500 FCFA à Bamako, **offerte dès 50 000 FCFA**

## 🗂️ Structure

```
boutique/
├── index.html               # Coquille : en-tête, pied de page, tiroir panier, toasts, lightbox
├── README.md
└── assets/
    ├── css/boutique.css     # Design system (palette du portfolio : or #d4af37, dark #070b14…)
    ├── js/
    │   ├── data.js          # Produits, catégories, règles commerciales, avis
    │   ├── store.js         # État global + persistance localStorage (panier, favoris, comptes, commandes)
    │   ├── views.js         # Icônes SVG + vues/templates (accueil, catalogue, produit, panier, favoris, login, compte, commande)
    │   └── app.js           # Routeur par hash (#/produit/slug…), événements, validation, toasts
    └── img/produits/        # Visuels produits (illustrations de démonstration)
```

## 🚀 Lancer en local

Aucune installation n'est nécessaire :

1. ouvrir `index.html` dans un navigateur, **ou**
2. servir le dossier (recommandé, pour les chemins relatifs) :

```bash
python3 -m http.server 8000      # puis http://localhost:8000/boutique/
```

## 🛠️ Choix techniques

- **Vanilla JS (ES6) + CSS moderne**, zéro dépendance, zéro étape de build : idéal pour GitHub Pages.
- **Routage par hash** (`#/boutique`, `#/produit/montre-acier-dore`, `#/panier`, `#/commande`…) : les liens sont
  partageables et le bouton « précédent » du navigateur fonctionne.
- **Persistance `localStorage`** : panier, favoris, comptes, commandes, avis et codes promo survivent au rechargement.
- **Prix calculés côté client** à partir des options choisies (suppléments de taille, longueur, gravure…).
- **Échappement HTML systématique** de toutes les données affichées (`echappe()`), validation des formulaires, gestion des erreurs.
- **Responsive** mobile d'abord : grilles adaptatives, tiroir panier, barre d'achat fixe, menu déroulant.

## ⚠️ Périmètre (démo)

- Aucune transaction réelle : **pas de serveur, pas de paiement**. Le tunnel de commande simule Orange Money / Moov Money.
- Les mots de passe des comptes de démo sont *brouillés* en base64 dans le navigateur — ce n'est **pas** de la sécurité,
  uniquement une démonstration front-end.
- Les visuels produits sont des illustrations générées pour la démo.

## 🔭 Version production (une fois connectée à un back-end)

- API Laravel : produits, options, stocks, commandes, clients, avis (REST + auth Sanctum/JWT).
- Paiement Orange Money / Wave via webhook de confirmation, facture PDF et suivi de livraison.
- Back-office vendeur : gestion catalogue, stocks, commandes, statistiques (voir le projet *StockFlow* du portfolio).
- React / Next.js ou React Native pour l'app mobile, avec la même API.

---

© 2026 — Démo réalisée par **Moussa N'tji Diallo** • Bamako & Remote • Moussantjidiallo@gmail.com
