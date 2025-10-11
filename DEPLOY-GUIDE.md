# 🚀 Guide de déploiement Vercel

## ✅ Prêt à déployer !

Votre code est maintenant **100% compatible Vercel** !

## 📋 Étapes de déploiement :

### **1. Sur Vercel Dashboard :**
1. Allez sur https://vercel.com/dashboard
2. Cliquez **"New Project"**
3. Sélectionnez votre repository GitHub
4. Vercel détecte automatiquement la configuration

### **2. Configuration automatique :**
✅ **Build Command :** `cd frontend && yarn build`  
✅ **Output Directory :** `frontend/build`  
✅ **Install Command :** `yarn install && cd frontend && yarn install`  

### **3. Variables d'environnement (optionnel) :**
Pour activer Vercel KV (base cloud), ajoutez dans **Settings > Environment Variables** :
```
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```
*Note : Sans KV, le site utilise localStorage (fonctionne parfaitement !)*

### **4. Déployement :**
- Cliquez **"Deploy"**  
- ⏱️ Durée : ~2-3 minutes
- 🎉 Votre site sera accessible !

## 🌐 URLs après déploiement :

- **🏠 Site :** `https://worldcreation.vercel.app`
- **⚙️ Admin :** `https://worldcreation.vercel.app/admin`
- **🔗 API :** `https://worldcreation.vercel.app/api/contact`

## 🔄 Déploiements automatiques :
- Chaque **push sur main** = déploiement automatique
- Chaque **pull request** = preview automatique

## 📱 Fonctionnalités disponibles :
✅ Modification des coordonnées  
✅ Gestion de signature  
✅ Interface d'administration  
✅ Sauvegarde automatique  
✅ Mode hors ligne (localStorage)  
✅ Design responsive  

## 🆘 En cas de problème :
1. Vérifiez les **logs de build** dans Vercel
2. Le site fonctionne même sans API (localStorage)
3. Toutes les données sont sauvegardées localement en backup

**Votre site sera opérationnel en quelques minutes ! 🚀**