# 📸 Visuels des projets

Dossier des visuels utilisés dans `index.html` (section « Projets réalisés »).

## E-commerce — 8 visuels

### Visuels produit (mise en scène PC / Mobile)
| Fichier | Format | Usage |
|---|---|---|
| `ecommerce-ultra-pc-mobile-combined.jpg` | 4:3 | Visuel principal — MacBook Pro + iPhone 15 Pro (carte « E-commerce — Site + App ») |
| `ecommerce-pc-ultra-1.jpg` | 16:9 | Vitrine web `#MégaSoldes` |
| `ecommerce-pc-ultra-2.jpg` | 16:9 | Dashboard vendeur |
| `ecommerce-mobile-ultra-1.jpg` | 9:16 | Accueil application mobile |
| `ecommerce-mobile-ultra-2.jpg` | 9:16 | Panier application mobile |

### Captures de l'application (écrans réels)
| Fichier | Usage |
|---|---|
| `ecommerce-real-1.jpg` | Accueil — `#MégaSoldes`, 15 501 FCFA |
| `ecommerce-real-2.jpg` | Fiche produit — 48 795 FCFA (entretien auto) |
| `ecommerce-real-3.jpg` | Panier — total 141 066 FCFA |

## Autres projets

| Fichier | Projet |
|---|---|
| `stockflow-real-1.jpg` | StockFlow — plateforme licences (16:9) |
| `stockflow-real-2.jpg` | StockFlow — application mobile (16:9) |
| `stockflow-real-3.jpg` | StockFlow — dashboard (16:9) |
| `stockflow.jpg` | StockFlow — aperçu |
| `mandenbaoubab-real.jpg` | Manden Baobab — boutique mobile (9:16) |
| `immobilio.jpg` | Immobilio — plateforme immobilière |
| `voiture.jpg` | Voiture — marketplace |
| `couture.jpg` | Atelier Couture |
| `medical.jpg` | Cabinet Médical |
| `crystal-iptv.jpg` | Crystal IPTV |
| `crystal-ott.jpg` | CrystalOTT |
| `ecommerce.jpg` | Visuel de secours E-commerce (fallback) |

## Formats des cadres (carrousel)

| Format | Classe | Hauteur | Projets |
|---|---|---|---|
| Web 16:9 | `card-web` | 200 px | StockFlow, Immobilio, Voiture, Agence, Couture, Médical, IPTV, OTT |
| Mobile 9:16 | `card-mobile` | 320 px | E-commerce Mobile, Manden Baobab |
| Combiné 4:3 | `card-combined` | 260 px | E-commerce — Site + App |

Les cadres 4:3 et 9:16 affichent l'écran **entier** (`object-fit:contain`), les cadres 16:9 recadrent légèrement (`object-fit:cover`).
