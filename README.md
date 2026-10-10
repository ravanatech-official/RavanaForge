# RavanaForge ⚡

The Autonomous Multi-Agent Software Engineering Cockpit & Solution Architecture Platform. Powered by the 6 Sovereign Commanders of King Ravana (Prahasta, Indrajit, Kumbhakarna, Mayasura, Atikaya, Mahodara) and Raptor-3 level deep engineering execution.

## 🚀 Live Production & Firebase Hosting

- **Firebase Project ID**: `ravanaforge`
- **Hosting URL**: [https://ravanaforge.firebaseapp.com](https://ravanaforge.firebaseapp.com)

---

## ⚡ Automatic CI/CD Deployment on Git Push

Whenever code is pushed to `main` or `master`, GitHub Actions automatically builds the Vite React application and deploys it live to Firebase Hosting.

### Quick Push Workflow:
```bash
git add .
git commit -m "feat: updates to ravanaforge"
git push origin main
```

The GitHub Actions workflow configuration is located at:
- `.github/workflows/firebase-hosting-merge.yml` (Auto-deploys on push to `main`)
- `.github/workflows/firebase-hosting-pull-request.yml` (Live preview channels on PRs)

### GitHub Repository Secrets Required for Actions:
To enable automated GitHub Actions deployment, configure the following secret in your GitHub repository (`Settings > Secrets and variables > Actions`):
1. **`FIREBASE_SERVICE_ACCOUNT_RAVANAFORGE`**: Service Account JSON key from Firebase Console (`Project Settings > Service accounts > Generate new private key`).

---

## 🛠 Direct CLI Deployment (Alternative)

You can also deploy directly from your local terminal using the Firebase CLI:

```bash
# 1. Login to Firebase
npx firebase-tools login

# 2. Build and Deploy Hosting
npm run deploy
```

Or run:
```bash
npm run build
npx firebase-tools deploy --only hosting
```

---

## 📦 Project Structure & Firebase Configuration

- `firebase.json` - Firebase Hosting configuration routing all traffic to `/index.html` (SPA routing).
- `.firebaserc` - Project mapping for default project `ravanaforge`.
- `src/firebase.ts` - Firebase client SDK initialization & Analytics.
