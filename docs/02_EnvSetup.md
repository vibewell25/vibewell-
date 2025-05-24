# Environment & Setup Guide

This guide walks through local environment setup, secrets management, infrastructure startup, and CI/CD integration for Vibewell.

---

## 1. Prerequisites

* **Node.js** ≥18
* **PNPM** ≥8
* **Docker** & **Docker Compose**
* **Expo CLI** (`npm install -g expo-cli`)
* **Doppler CLI** (`npm install -g @dopplerhq/cli`)
* **Terraform CLI** (for IaC)

---

## 2. Repository Setup

```bash
# Clone the repo
git clone <repository-url>
cd vibewell

# Install dependencies
pnpm install
```

---

## 3. Secrets Management (Doppler)

1. **Login**:

   ```bash
   doppler login
   ```

2. **Link Project**:
   ```bash
   doppler setup --project vibewell --config development
   ```

3. **Import Env Vars**: In Doppler UI or via `.env` import.
   See `docs/03_FeaturesIndex.md` > Environment Variables section.

---

## 4. Local Infrastructure

1. **Start Supabase** (Postgres, Auth, Storage):

   ```bash
   pnpm run infra:up
   ```

2. **Prisma Migrations**:
   ```bash
   pnpm --filter @vibewell/db prisma migrate dev
   pnpm --filter @vibewell/db prisma generate
   ```

3. **Database Seeding** (if seed scripts exist):

   ```bash
   pnpm run db:seed
   ```

---
## 5. Running Applications
```bash
# Web App
doppler run -- pnpm dev:web

# Mobile App
doppler run -- pnpm dev:mobile

# Storybook (UI Explorer)
doppler run -- pnpm storybook

# Tests
doppler run -- pnpm test
```

---

## 5.1 PWA Service Worker & Manifest

1. **Manifest File** (place in `public/manifest.json`):

```json
{
  "name": "VibeWell",
  "short_name": "VibeWell",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F8F6F2",
  "theme_color": "#E07A5F",
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

2. **Service Worker Registration** (add to `pages/_app.tsx` or main entry):

```ts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

3. **Workbox Configuration** (in Next.js build config or custom script):

   * Use Workbox to generate `public/service-worker.js` with runtime caching.
   * Define caching strategies for static assets, API responses, and backgroundSync for offline actions.

---
## 6. CI/CD Integration (GitHub Actions Example)
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Doppler CLI
        run: npm install -g @dopplerhq/cli
      - name: Authenticate Doppler
        env:
          DOPPLER_TOKEN: ${{ secrets.DOPPLER_TOKEN }}
        run: doppler login --token $DOPPLER_TOKEN
      - name: Install dependencies
        run: doppler run -- pnpm install
      - name: Lint & Test
        run: doppler run -- pnpm test
      - name: Build
        run: doppler run -- pnpm build
      - name: Deploy Web
        run: doppler run -- pnpm deploy:web
      - name: Deploy Mobile
        run: doppler run -- pnpm deploy:mobile
```

---

## 7. Terraform (Optional for Self-Managed Infra)

```bash
terraform init
terraform apply
```

*End of setup guide.* 