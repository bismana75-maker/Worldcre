# WorldCreation - Déploiement Vercel

## 🚀 Déploiement automatique

Ce projet est configuré pour Vercel avec :

### **Structure :**
- **Frontend :** React (dans `/frontend/`)
- **API :** Vercel Serverless Functions (dans `/api/`)
- **Base de données :** Vercel KV + localStorage fallback

### **Configuration automatique :**
✅ `vercel.json` configuré  
✅ API Routes dans `/api/`  
✅ Build command configuré  
✅ Rewrites pour SPA configurés  

### **Variables d'environnement (optionnel) :**
Si vous voulez utiliser Vercel KV :
```bash
# Dans Vercel Dashboard > Settings > Environment Variables
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

### **Fonctionnalités :**
- ✅ Gestion des coordonnées et signature
- ✅ Interface d'administration (`/admin`)
- ✅ Sauvegarde locale automatique (fallback)
- ✅ Mode hors ligne fonctionnel

### **URLs après déploiement :**
- **Site principal :** `https://votre-domaine.vercel.app`
- **Administration :** `https://votre-domaine.vercel.app/admin`
- **API :** `https://votre-domaine.vercel.app/api/contact`

## 📱 Test local
```bash
yarn install
cd frontend && yarn start
```

Le site fonctionne même sans base de données (utilise localStorage) !