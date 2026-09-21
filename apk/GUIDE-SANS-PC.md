# 📱 GUIDE 100% TÉLÉPHONE - Mettre APK sur GitHub sans PC

## Tu as besoin de :
- Ton téléphone avec l'APK e-commerce
- Chrome sur ton téléphone
- Compte GitHub connecté

---

## ÉTAPE 1 : Préparer l'APK (1 min)

1. Sur ton téléphone, ouvre **Mes Fichiers**
2. Va dans Téléchargements
3. Trouve ton .apk
4. Renomme-le : appui long → Renommer → `ecommerce-v1.apk`

---

## ÉTAPE 2 : Créer la Release depuis téléphone (2 min)

### Sur Chrome :

1. Ouvre Chrome → github.com
2. **Passe en mode ordinateur** : 3 points → Coche "Version pour ordinateur" ✅ TRÈS important
3. Connecte-toi
4. Va sur ton repo : github.com/moussantji/gestion-stock/releases
5. Clique "Draft a new release"
6. Remplis :
   - Tag : `v1.0.1` (si v1.0.0 existe déjà, mets v1.0.1, v1.0.2, apk-v1, etc.)
   - Title : `E-commerce APK v1.0`
   - Description : App E-commerce Mali
7. Upload APK : Scrolle jusqu'à "Attach binaries" → Choisir un fichier → ton APK
8. Coche "Set as the latest release"
9. Publish release

**Si "Unable to validate tag" :**
- Change le tag : essaie `v1`, `v1.0`, `v1.0.1`, `apk-v1`, `ecommerce-v1`
- Pas d'espace dans le tag
- Appuie Entrée après avoir tapé le tag

---

## ÉTAPE 3 : Récupérer le lien direct

1. Après Publish, scrolle à "Assets" → tu vois ton APK
2. Appui long → Copier l'adresse du lien
3. Lien type : https://github.com/moussantji/gestion-stock/releases/download/v1.0.1/ecommerce-v1.apk
4. Envoie-moi ce lien

---

## SOLUTION PLUS SIMPLE SANS RELEASE (recommandée si Release bloque)

1. Chrome mode ordi → github.com/moussantji/portfolio
2. Va dans dossier `apk/`
3. Add file → Upload files → choisis ton APK
4. Commit changes
5. C'est tout ! Le bouton devient vert auto

---

## Pour les captures d'écran sans PC :

1. Chrome mode ordi → github.com/moussantji/portfolio → img/projects/
2. Add file → Upload files → choisis tes 3 captures
3. Renomme AVANT : ecommerce-real-1.jpg, ecommerce-real-2.jpg, ecommerce-real-3.jpg
4. Commit

---

## Alternative : App GitHub (Play Store)

1. Installe GitHub depuis Play Store
2. Plus stable que Chrome pour Release

## Si APK >100MB :

Utilise Google Drive → Partager → Toute personne avec le lien → copie lien
