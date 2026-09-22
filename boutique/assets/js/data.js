/* ==========================================================================
   data.js — Catalogue de la boutique (données locales, aucune API requise)
   Montants en FCFA (XOF)
   ========================================================================== */
const DEVISE = 'FCFA';

const BOUTIQUE = {
  nom: 'Manden Baobab',
  baseline: 'Boutique en ligne',
  telephone: '+223 82 01 95 83',
  whatsapp: '+22382019583',
  email: 'Moussantjidiallo@gmail.com',
  ville: 'Bamako, Mali'
};

/* Règles commerciales */
const REGLES = {
  livraisonStandard: 2500,        // FCFA — Bamako
  livraisonRegion: 4500,          // FCFA — autres régions
  francoDePort: 50000,            // livraison offerte à partir de ce montant
  promos: {
    BAOBAB10:  { type: 'pourcent', valeur: 10, libelle: '-10 % sur tout le panier' },
    BIENVENUE: { type: 'montant',  valeur: 2000, libelle: '-2 000 FCFA (min. 20 000 FCFA)', minimum: 20000 },
    WAX5000:   { type: 'montant',  valeur: 5000, libelle: '-5 000 FCFA (min. 60 000 FCFA)', minimum: 60000 }
  }
};

/* Catégories */
const CATEGORIES = [
  { id: 'tissus',       nom: 'Tissus & Wax',        icone: 'scissors',  desc: 'Bazin, bogolan, wax' },
  { id: 'pret-porter',  nom: 'Prêt-à-porter',       icone: 'shirt',     desc: 'Ensembles, boubous' },
  { id: 'tech',         nom: 'Tech & Audio',        icone: 'headphones',desc: 'Écouteurs, casques' },
  { id: 'cosmetiques',  nom: 'Cosmétiques',         icone: 'droplet',   desc: 'Karité, baobab' },
  { id: 'accessoires',  nom: 'Maroquinerie',        icone: 'bag',       desc: 'Sacs, montres' }
];

const CAT_LABEL = CATEGORIES.reduce(function (acc, c) { acc[c.id] = c.nom; return acc; }, {});

/* --------------------------------------------------------------------------
   Produits
   options : [{ nom, type:'pill'|'swatch', valeurs:[{nom, extra?, hex?}] }]
   images  : [{ src, label, zoom, pos }]  → galerie (zoom/pos = cadrage détail)
   -------------------------------------------------------------------------- */
const PRODUITS = [
  {
    id: 'P001', slug: 'bazin-riche-brode',
    nom: 'Bazin Riche Brodé — 5 mètres',
    cat: 'tissus',
    prix: 27500, ancienPrix: 34000,
    badge: 'Top vente', note: 4.8, avis: 46, stock: 12, vendus: 210,
    court: 'Bazin riche brodé main, fils dorés, qualité getzner — idéal cérémonies et grandes occasions.',
    description: [
      "Le bazin riche brodé est la pièce maîtresse des grandes cérémonies maliennes : baptêmes, mariages, tabaski. Chaque pièce est brodée main par nos artisans partenaires de Bamako, puis teintée avec des colorants stables qui ne déteignent pas au lavage.",
      "Le tissu se travaille facilement : il se repasse à haute température et tient parfaitement les plissés et les grands boubous. Vendu par pièce de 5 mètres, il suffit pour un ensemble complet homme ou une tenue femme trois pièces."
    ],
    caracteristiques: {
      'Matière': 'Coton damassé 100 % (bazin riche)',
      'Dimensions': '5 m × 1,20 m — broderie fil doré',
      'Fabrication': 'Brodé main à Bamako, Mali',
      'Entretien': 'Lavage main eau tiède, repassage à chaud',
      'Coloris disponibles': 'Ivoire, bleu roi, bordeaux, vert émeraude',
      'Livraison': 'Bamako 24 h • Régions 48-72 h • Offerte dès 50 000 FCFA'
    },
    options: [
      { nom: 'Longueur', type: 'pill', valeurs: [
        { nom: '3 mètres', extra: -9000 },
        { nom: '5 mètres', extra: 0 },
        { nom: '10 mètres', extra: 23000 }
      ] },
      { nom: 'Coloris', type: 'swatch', valeurs: [
        { nom: 'Ivoire', hex: '#f3e7cf' },
        { nom: 'Bleu roi', hex: '#1e3a8a' },
        { nom: 'Bordeaux', hex: '#7f1d1d' },
        { nom: 'Vert émeraude', hex: '#065f46' }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/bazin.jpg', label: "Vue d'ensemble", zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/bazin.jpg', label: 'Broderie', zoom: 1.9, pos: '35% 40%' },
      { src: 'assets/img/produits/bazin.jpg', label: 'Matière', zoom: 2.6, pos: '70% 60%' }
    ],
    avisClients: [
      { nom: 'Aïssata T.', note: 5, date: '12 août 2026', texte: "Qualité vraiment au-dessus, la broderie est régulière. J'ai cousu un grand boubou pour mon frère, effet magnifique." },
      { nom: 'Modibo K.', note: 4.5, date: '28 juillet 2026', texte: 'Bon rapport qualité/prix, livraison rapide à Bamako en 24 h comme promis.' }
    ]
  },
  {
    id: 'P002', slug: 'bogolan-segou',
    nom: 'Bogolan Authentique de Ségou — 4 m',
    cat: 'tissus',
    prix: 18000, badge: 'Artisanal', note: 4.7, avis: 31, stock: 8, vendus: 96,
    court: 'Bogolan teint à la main avec de la boue fermentée, motifs traditionnels bambara de Ségou.',
    description: [
      "Le bogolan (« bogo » = boue, « lan » = avec) est un tissu traditionnel malien teinté à l'aide de boue fermentée riche en fer. Chaque motif raconte une histoire : la fécondité, la protection, la sagesse.",
      "Nos pièces proviennent d'un atelier coopératif de Ségou : teinture naturelle, motifs peints à la main, aucune reproduction industrielle. Deux pièces ne sont jamais parfaitement identiques — c'est la signature du vrai bogolan."
    ],
    caracteristiques: {
      'Matière': 'Coton tissé main, teinture naturelle (boue + décoction de n\'galamata)',
      'Dimensions': '4 m × 1 m',
      'Origine': 'Coopérative artisanale de Ségou, Mali',
      'Entretien': 'Lavage main séparé les 3 premiers lavages, séchage à l\'ombre',
      'Utilisation': 'Vêtements, décoration, tapisserie murale',
      'Livraison': 'Bamako 24 h • Régions 48-72 h'
    },
    options: [
      { nom: 'Format', type: 'pill', valeurs: [
        { nom: '2 mètres', extra: -7000 },
        { nom: '4 mètres', extra: 0 }
      ] },
      { nom: 'Motif', type: 'pill', valeurs: [
        { nom: 'Géométrique' }, { nom: 'Bambara classique' }, { nom: 'Étoiles' }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/bogolan.jpg', label: "Vue d'ensemble", zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/bogolan.jpg', label: 'Motifs', zoom: 1.8, pos: '40% 35%' },
      { src: 'assets/img/produits/bogolan.jpg', label: 'Trame', zoom: 2.5, pos: '65% 70%' }
    ],
    avisClients: [
      { nom: 'Fatoumata D.', note: 5, date: '3 août 2026', texte: 'Le vrai bogolan de Ségou, odeur de terre et couleurs superbes. Je recommande à 100 %.' }
    ]
  },
  {
    id: 'P003', slug: 'ensemble-wax-homme',
    nom: 'Ensemble Wax Homme — 3 pièces',
    cat: 'pret-porter',
    prix: 32000, ancienPrix: 38000, badge: 'Promo', note: 4.6, avis: 58, stock: 15, vendus: 132,
    court: 'Ensemble wax taillé main : veste, pantalon et chemise assortie. Coupe moderne, finitions surpiquées.',
    description: [
      "Ensemble trois pièces en wax africain haut de gamme, confectionné par nos tailleurs partenaires. La veste est entièrement doublée, le pantalon monté avec ceinture renforcée et la chemise assortie coupe droite.",
      "Coupe moderne légèrement ajustée, idéale pour les cérémonies mais aussi pour le bureau. Précisez votre taille : du S au XXL, ou envoyez vos mesures sur WhatsApp pour du sur-mesure."
    ],
    caracteristiques: {
      'Matière': 'Wax coton 100 % (175 g/m²), doublure polyester',
      'Composition du lot': '1 veste + 1 pantalon + 1 chemise',
      'Tailles': 'S, M, L, XL, XXL (sur-mesure sur demande)',
      'Confection': 'Tailleur partenaire — Bamako',
      'Entretien': 'Lavage machine 30 °C, retourner avant lavage',
      'Livraison': 'Bamako 24 h • Régions 48-72 h • Retour 7 jours'
    },
    options: [
      { nom: 'Taille', type: 'pill', valeurs: [
        { nom: 'S' }, { nom: 'M' }, { nom: 'L' }, { nom: 'XL' }, { nom: 'XXL', extra: 2500 }
      ] },
      { nom: 'Coloris', type: 'swatch', valeurs: [
        { nom: 'Bleu/jaune', hex: '#0e5fa8' },
        { nom: 'Terre/ocre', hex: '#b45309' },
        { nom: 'Noir/argent', hex: '#1f2937' }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/ensemble-wax.jpg', label: 'Ensemble', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/ensemble-wax.jpg', label: 'Motif wax', zoom: 1.85, pos: '45% 30%' },
      { src: 'assets/img/produits/ensemble-wax.jpg', label: 'Détail couture', zoom: 2.4, pos: '60% 65%' }
    ],
    avisClients: [
      { nom: 'Ibrahim S.', note: 5, date: '18 août 2026', texte: 'Coupe impeccable, tout le monde m\'a demandé où je l\'avais acheté au mariage.' },
      { nom: 'Cheick O.', note: 4, date: '2 août 2026', texte: 'Très beau tissu. Prévoir une taille au-dessus si vous aimez ample.' }
    ]
  },
  {
    id: 'P004', slug: 'montre-acier-dore',
    nom: 'Montre Acier Doré — Classic',
    cat: 'accessoires',
    prix: 45000, badge: 'Nouveau', note: 4.9, avis: 22, stock: 6, vendus: 44,
    court: 'Montre homme acier inoxydable finition dorée, verre minéral anti-rayures, étanche 3 ATM.',
    description: [
      "Une montre habillée au design intemporel : boîtier acier inoxydable 40 mm, finition dorée brossée, cadran à index appliqués et bracelet ajustable à maillons pleins.",
      "Mouvement quartz japonais précis, verre minéral durci anti-rayures et étanchéité 3 ATM (résiste aux éclaboussures). Livrée dans un écrin avec garantie 12 mois."
    ],
    caracteristiques: {
      'Boîtier': 'Acier inoxydable 40 mm, finition dorée',
      'Mouvement': 'Quartz japonais (précision ±15 s/mois)',
      'Verre': 'Minéral durci anti-rayures',
      'Étanchéité': '3 ATM — éclaboussures',
      'Bracelet': 'Acier, maillons ajustables, fermoir déployant',
      'Garantie': '12 mois + écrin offert'
    },
    options: [
      { nom: 'Cadran', type: 'swatch', valeurs: [
        { nom: 'Noir', hex: '#0b1220' },
        { nom: 'Champagne', hex: '#c8a951' },
        { nom: 'Blanc', hex: '#e5e7eb' }
      ] },
      { nom: 'Gravure', type: 'pill', valeurs: [
        { nom: 'Sans gravure' }, { nom: 'Gravure offerte (+2 jours)', extra: 0 }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/montre.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/montre.jpg', label: 'Cadran', zoom: 2, pos: '45% 45%' },
      { src: 'assets/img/produits/montre.jpg', label: 'Bracelet', zoom: 2.4, pos: '70% 70%' }
    ],
    avisClients: [
      { nom: 'Souleymane B.', note: 5, date: '20 août 2026', texte: 'Elle fait vraiment haut de gamme, le poids est rassurant. Emballage soigné.' }
    ]
  },
  {
    id: 'P005', slug: 'ecouteurs-sans-fil-pro',
    nom: 'Écouteurs Sans Fil Pro',
    cat: 'tech',
    prix: 19500, ancienPrix: 24000, badge: 'Promo', note: 4.5, avis: 87, stock: 24, vendus: 305,
    court: 'Bluetooth 5.3, réduction de bruit active, 32 h d\'autonomie avec le boîtier, écoute multipoint.',
    description: [
      "Écouteurs true wireless Bluetooth 5.3 avec réduction de bruit active (ANC) et mode transparence. Transducteurs 13 mm pour des basses profondes et des voix nettes.",
      "Autonomie 8 h par charge, jusqu'à 32 h avec le boîtier de charge USB-C. Compatibles appels clairs (4 micros + réduction de bruit d'appel) et connexion simultanée sur 2 appareils."
    ],
    caracteristiques: {
      'Connectivité': 'Bluetooth 5.3 — portée 10 m',
      'Autonomie': '8 h (écouteurs) + 24 h (boîtier) = 32 h',
      'Fonctions': 'ANC hybride, mode transparence, 4 micros',
      'Charge': 'USB-C, 10 min = 2 h d\'écoute',
      'Résistance': 'IPX5 (transpiration, pluie légère)',
      'Garantie': '6 mois'
    },
    options: [
      { nom: 'Coloris', type: 'swatch', valeurs: [
        { nom: 'Noir', hex: '#111827' },
        { nom: 'Blanc', hex: '#e5e7eb' }
      ] },
      { nom: 'Pack', type: 'pill', valeurs: [
        { nom: 'Standard' }, { nom: '+ coque de protection', extra: 1500 }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/ecouteurs.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/ecouteurs.jpg', label: 'Boîtier', zoom: 1.8, pos: '40% 45%' },
      { src: 'assets/img/produits/ecouteurs.jpg', label: 'Détail', zoom: 2.6, pos: '70% 55%' }
    ],
    avisClients: [
      { nom: 'Mariam C.', note: 5, date: '25 août 2026', texte: 'Le son est vraiment bon pour ce prix, la réduction de bruit marche bien en taxi.' },
      { nom: 'Drissa M.', note: 4, date: '10 août 2026', texte: 'Bonne autonomie, l\'appairage est instantané avec mon téléphone.' }
    ]
  },
  {
    id: 'P006', slug: 'casque-audio-premium',
    nom: 'Casque Audio Premium ANC',
    cat: 'tech',
    prix: 38000, note: 4.7, avis: 40, stock: 9, vendus: 118,
    court: 'Casque circum-aural over-ear, réduction de bruit hybride, coussinets mémoire de forme, 40 h.',
    description: [
      "Casque over-ear avec transducteurs 40 mm et réduction de bruit hybride sur 4 niveaux. Coussinets en mousse à mémoire de forme et arceau ajustable pour un confort longue durée.",
      "Autonomie 40 h en ANC, charge rapide USB-C, mode filaire de secours via jack 3,5 mm fourni. Idéal pour le travail, les voyages et les écoutes de précision."
    ],
    caracteristiques: {
      'Type': 'Circum-aural fermé, transducteurs 40 mm',
      'Réduction de bruit': 'Hybride 4 niveaux (ANC)',
      'Autonomie': '40 h (ANC activé)',
      'Connectivité': 'Bluetooth 5.3 + jack 3,5 mm fourni',
      'Poids': '255 g — coussinets mémoire de forme',
      'Garantie': '6 mois'
    },
    options: [
      { nom: 'Coloris', type: 'swatch', valeurs: [
        { nom: 'Noir mat', hex: '#0f1115' },
        { nom: 'Sable', hex: '#d6c7a8' }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/casque.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/casque.jpg', label: 'Coussinets', zoom: 2, pos: '35% 55%' },
      { src: 'assets/img/produits/casque.jpg', label: 'Détail finition', zoom: 2.6, pos: '65% 40%' }
    ],
    avisClients: [
      { nom: 'Aminata K.', note: 5, date: '14 août 2026', texte: 'Je l\'utilise tous les jours au bureau, très confortable et l\'isolation est excellente.' }
    ]
  },
  {
    id: 'P007', slug: 'power-bank-20000',
    nom: 'Power Bank 20 000 mAh — Charge rapide',
    cat: 'tech',
    prix: 15000, note: 4.4, avis: 63, stock: 30, vendus: 268,
    court: '20 000 mAh, charge rapide 22,5 W, 2 USB-A + USB-C, écran LED, câble tressé offert.',
    description: [
      "Batterie externe 20 000 mAh réelle avec charge rapide 22,5 W : rechargez un téléphone jusqu'à 4 fois. Deux ports USB-A et un port USB-C entrée/sortie pour recharger plusieurs appareils en même temps.",
      "Écran LED affichant le pourcentage restant, protections contre la surcharge et la surchauffe. Câble USB tressé inclus. Parfait pour les coupures de courant et les déplacements."
    ],
    caracteristiques: {
      'Capacité': '20 000 mAh (74 Wh)',
      'Puissance': '22,5 W max — charge rapide QC/PD',
      'Ports': '2 × USB-A + 1 × USB-C (entrée/sortie)',
      'Écran': 'LED avec pourcentage restant',
      'Sécurité': 'Protection surcharge, surchauffe, court-circuit',
      'Inclus': 'Câble USB tressé + notice'
    },
    options: [
      { nom: 'Modèle', type: 'pill', valeurs: [
        { nom: 'Noir 20 000 mAh' },
        { nom: 'Blanc 20 000 mAh' },
        { nom: '30 000 mAh', extra: 6500 }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/powerbank.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/powerbank.jpg', label: 'Connectique', zoom: 2, pos: '40% 55%' },
      { src: 'assets/img/produits/powerbank.jpg', label: 'Câble inclus', zoom: 2.4, pos: '70% 60%' }
    ],
    avisClients: [
      { nom: 'Oumar T.', note: 4, date: '6 août 2026', texte: 'Recharge bien 3-4 fois mon téléphone. Un peu lourde mais c\'est normal pour la capacité.' }
    ]
  },
  {
    id: 'P008', slug: 'beurre-karite-pur',
    nom: 'Beurre de Karité Pur — 500 g',
    cat: 'cosmetiques',
    prix: 7500, badge: 'Bio', note: 4.9, avis: 74, stock: 40, vendus: 412,
    court: 'Karité brut non raffiné, pressé et baratté à la main au Mali. Nourrit peau, cheveux et lèvres.',
    description: [
      "Beurre de karité 100 % pur, non raffiné, sans parfum ni conservateur ajouté. Issu des noix de karité récoltées et barattées manuellement par les femmes de la coopérative de Sikasso.",
      "Riche en vitamines A, E et F, il nourrit intensément les peaux sèches, répare les cheveux cassants et protège les lèvres et les talons. Texture onctueuse qui fond au contact de la peau."
    ],
    caracteristiques: {
      'Composition': '100 % beurre de karité brut (Vitellaria paradoxa)',
      'Poids': '500 g — pot en verre réutilisable',
      'Origine': 'Coopérative féminine de Sikasso, Mali',
      'Usage': 'Peau, cheveux, lèvres, massage bébé',
      'Sans': 'Parfum, conservateur, huile minérale',
      'Conservation': '24 mois — stocker à l\'abri de la chaleur'
    },
    options: [
      { nom: 'Format', type: 'pill', valeurs: [
        { nom: '250 g', extra: -3500 },
        { nom: '500 g', extra: 0 },
        { nom: '1 kg', extra: 6000 }
      ] },
      { nom: 'Parfum', type: 'pill', valeurs: [
        { nom: 'Neutre' }, { nom: 'Vanille' }, { nom: 'Fleur d\'oranger' }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/karite.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/karite.jpg', label: 'Texture', zoom: 2, pos: '38% 50%' },
      { src: 'assets/img/produits/karite.jpg', label: 'Noix de karité', zoom: 2.4, pos: '72% 62%' }
    ],
    avisClients: [
      { nom: 'Kadiatou S.', note: 5, date: '27 août 2026', texte: 'Le meilleur karité que j\'ai acheté en ligne. Odeur brute authentique, mes cheveux adorent.' },
      { nom: 'Awa B.', note: 5, date: '15 août 2026', texte: 'Texture très riche, parfait pour l\'hiver. Le pot va durer longtemps.' }
    ]
  },
  {
    id: 'P009', slug: 'huile-baobab-pressee',
    nom: 'Huile de Baobab Pressée à Froid — 100 ml',
    cat: 'cosmetiques',
    prix: 9000, note: 4.8, avis: 29, stock: 18, vendus: 154,
    court: 'Huile de baobab pure pressée à froid, verre ambré UV. Anti-âge, peaux sensibles, cheveux.',
    description: [
      "L'huile de baobab est extraite des graines du fruit du baobab, l'arbre emblématique du Mali. Pressée à froid, elle conserve ses acides gras essentiels (oméga 3, 6, 9) et sa vitamine E antioxydante.",
      "Pénétrante sans laisser de film gras, elle hydrate, nourrit et protège. Excellente pour le visage, le contour des yeux, les cheveux secs et les massages."
    ],
    caracteristiques: {
      'Composition': 'Huile de baobab 100 % pure, pressée à froid',
      'Format': 'Flacon verre ambré 100 ml + compte-gouttes',
      'Origine': 'Graines de baobab du Mali (Kayes)',
      'Bienfaits': 'Hydratation, antioxydant, éclat, cuir chevelu',
      'Conservation': '18 mois après ouverture, à l\'abri de la lumière'
    },
    options: [
      { nom: 'Format', type: 'pill', valeurs: [
        { nom: '100 ml' }, { nom: '200 ml', extra: 7000 }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/huile-baobab.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/huile-baobab.jpg', label: 'Flacon', zoom: 2, pos: '45% 40%' },
      { src: 'assets/img/produits/huile-baobab.jpg', label: 'Détail', zoom: 2.6, pos: '70% 65%' }
    ],
    avisClients: [
      { nom: 'Nafissatou D.', note: 5, date: '21 août 2026', texte: 'Texture légère, parfaite pour mon visage mixte. La peau est plus lumineuse.' }
    ]
  },
  {
    id: 'P010', slug: 'sac-cuir-artisanal',
    nom: 'Sac en Cuir Artisanal — Authentique',
    cat: 'accessoires',
    prix: 34000, ancienPrix: 40000, badge: 'Fait main', note: 4.9, avis: 25, stock: 5, vendus: 61,
    court: 'Cuir pleine fleur tanné et cousu main, doublure coton wax, bandoulière ajustable. Pièce unique.',
    description: [
      "Sac à main en cuir pleine fleur, découpé et cousu main dans notre atelier. Le tannage et les finitions sont réalisés traditionnellement, ce qui donne à chaque pièce des nuances uniques.",
      "Doublure intérieure en coton wax, poche zippée de sécurité, bandoulière ajustable et amovible. Dimensions pensées pour le quotidien : ordinateur 13\" possible."
    ],
    caracteristiques: {
      'Matière': 'Cuir de bovin pleine fleur, tannage traditionnel',
      'Doublure': 'Coton wax imprimé fait main',
      'Dimensions': '32 × 24 × 11 cm — anse + bandoulière',
      'Rangements': '1 poche zippée, 2 poches plates',
      'Fabrication': 'Atelier artisanal — Bamako',
      'Entretien': 'Cire incolore 1 fois/mois, éviter l\'eau prolongée'
    },
    options: [
      { nom: 'Coloris', type: 'swatch', valeurs: [
        { nom: 'Cognac', hex: '#a1613a' },
        { nom: 'Noir', hex: '#111827' },
        { nom: 'Marron foncé', hex: '#5b3a20' }
      ] },
      { nom: 'Finition', type: 'pill', valeurs: [
        { nom: 'Couture simple' }, { nom: 'Couture + initiales (+2 j)', extra: 3000 }
      ] }
    ],
    images: [
      { src: 'assets/img/produits/sac-cuir.jpg', label: 'Vue produit', zoom: 1, pos: 'center' },
      { src: 'assets/img/produits/sac-cuir.jpg', label: 'Grain du cuir', zoom: 2, pos: '40% 45%' },
      { src: 'assets/img/produits/sac-cuir.jpg', label: 'Coutures', zoom: 2.6, pos: '68% 55%' }
    ],
    avisClients: [
      { nom: 'Bintou K.', note: 5, date: '19 août 2026', texte: 'Cuir superbe, finitions très propres. C\'est ma deuxième commande chez Manden Baobab.' }
    ]
  }
];

/* Bandeau promo (accueil) */
const BANDEAU = [
  { icone: 'truck', texte: 'Livraison offerte dès 50 000 FCFA' },
  { icone: 'phone', texte: 'Paiement Orange Money & Moov Money' },
  { icone: 'shield', texte: 'Garantie 7 jours — retour simple' }
];

/* Avis affichés sur l'accueil */
const TEMOIGNAGES = [
  { nom: 'Fatoumata D.', ville: 'Bamako', note: 5, texte: 'Commande reçue en 24 h, le tissu est encore plus beau en vrai. Le paiement Orange Money est super pratique.' },
  { nom: 'Oumar T.', ville: 'Ségou', note: 5, texte: 'J\'ai commandé le karité et les écouteurs. Emballage soigné et le service client répond vite sur WhatsApp.' },
  { nom: 'Mariam C.', ville: 'Kayes', note: 4.5, texte: 'Site simple à utiliser, même sur un petit téléphone. J\'ai mis mes articles en favoris pour plus tard.' }
];
