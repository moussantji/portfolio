# 📱 GUIDE 100% TÉLÉPHONE - Mettre APK sur GitHub sans PC

## Tu as besoin de :
- Ton téléphone avec l'APK e-commerce
- Chrome sur ton téléphone
- Compte GitHub connecté

---

## ÉTAPE 1 : Préparer l'APK (1 min)

1. Sur ton téléphone, ouvre **Mes Fichiers** / **Gestionnaire de fichiers**
2. Va dans `Téléchargements` ou `Download`
3. Trouve ton fichier `.apk` (ex: `app-release.apk`, `ecommerce.apk`)
4. **Renomme-le** : appui long → Renommer → `ecommerce-v1.apk`
   - Important : nom simple, sans espaces, sans caractères spéciaux

---

## ÉTAPE 2 : Créer la Release sur GitHub depuis ton téléphone (2 min)

### Sur Chrome (téléphone) :

1. **Ouvre Chrome** → va sur `github.com`
2. **Passe en mode ordinateur** : 
   - Clique les 3 points en haut à droite de Chrome
   - Coche **"Version pour ordinateur"** / **"Desktop site"** ✅
   - C'est TRÈS important, sinon tu ne verras pas le bouton Release

3. **Connecte-toi** à ton compte GitHub si ce n'est pas fait

4. Va sur ton repo : `github.com/moussantji/gestion-stock`
   - (ou crée un nouveau repo `ecommerce-app` si tu préfères)
   - Pour créer nouveau repo : github.com → + → New repository → nom `ecommerce-app` → Public → Create

5. **Clique sur "Releases"** (à droite de la page, tu dois scroller)
   - Si tu ne vois pas : ajoute `/releases` à l'URL : `github.com/moussantji/gestion-stock/releases`

6. Clique **"Draft a new release"** (bouton vert)

7. Remplis :
   - **Tag** : `v1.0.0` (tape exactement ça)
   - **Title** : `E-commerce APK v1.0 - Boutique`
   - **Description** : 
     ```
     🛍️ App E-commerce Mali
     - Accueil #MégaSoldes
     - Panier, Livraison offerte dès 25 000 FCFA
     - Prix en FCFA
     - APK Android
     ```

8. **Upload APK** : 
   - Scrolle jusqu'à **"Attach binaries by dropping them here or selecting them"**
   - Clique dessus → **"Choisir un fichier"** → **"Fichiers"** → va chercher `ecommerce-v1.apk`
   - Attends que ça upload (barre verte, peut prendre 1-2 min si APK gros)

9. Coche **"Set as the latest release"**

10. Clique **"Publish release"** (bouton vert en bas)

---

## ÉTAPE 3 : Récupérer le lien direct (30 sec)

1. Après publication, tu es sur la page de la Release
2. **Scrolle jusqu'à "Assets"** → tu vois ton fichier `ecommerce-v1.apk`
3. **Appui long sur le fichier** → **"Copier l'adresse du lien"**
4. Le lien ressemble à :
   ```
   https://github.com/moussantji/gestion-stock/releases/download/v1.0.0/ecommerce-v1.apk
   ```
5. **Envoie-moi ce lien** → je le mets direct dans ton portfolio avec bouton vert "Télécharger"

---

## ÉTAPE 4 : Mettre les captures d'écran sans PC (2 min)

Même méthode pour tes 3 captures :

1. Sur Chrome (mode ordinateur toujours coché)
2. Va sur `github.com/moussantji/portfolio`
3. Va dans `img/projects/`
4. Clique **"Add file"** → **"Upload files"**
5. Clique **"choose your files"** → sélectionne tes 3 captures depuis Galerie
6. **Renomme avant upload** (important) :
   - Dans ton gestionnaire de fichiers, renomme tes captures :
     - `ecommerce-real-1.jpg` (accueil)
     - `ecommerce-real-2.jpg` (détail produit)
     - `ecommerce-real-3.jpg` (panier)
7. Upload → **"Commit changes"** (bouton vert en bas)

→ Tes vraies captures remplaceront automatiquement les miennes dans le portfolio !

---

## ALTERNATIVE PLUS SIMPLE : Via l'app GitHub (Android)

1. Installe **GitHub** depuis Play Store
2. Connecte-toi
3. Va sur ton repo `gestion-stock`
4. En haut à droite, clique les 3 points → **"Releases"** → **"+"**
5. Même étapes que ci-dessus, mais plus facile sur mobile

---

## ASTUCES

- **APK trop gros (>100MB)** : GitHub refuse. Utilise Drive dans ce cas :
  1. Upload APK sur Google Drive
  2. Clic droit → Partager → "Toute personne disposant du lien"
  3. Copie lien → donne-le moi

- **Mode ordinateur obligatoire** : Sans ça, GitHub mobile cache les boutons Release et Upload

- **Vérifie le lien** : Après Release, ouvre le lien dans un nouvel onglet → ça doit lancer le téléchargement direct

---

## Besoin d'aide ?

Envoie-moi juste :
1. Le lien Release de ton APK
2. Ou le lien Drive

Je branche tout dans ton portfolio en 30 sec !
