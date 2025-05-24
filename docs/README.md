# VibeWell Beauty & Wellness Platform

VibeWell is an enterprise-grade SaaS platform unifying real-time booking, e-commerce, social networking, and AI personalization for beauty & wellness—plus optional travel integration.

---

## Vision & Objectives

* **Transform** beauty & wellness experiences with seamless digital tools.
* **Empower** providers (businesses & freelancers) with booking, product management, analytics.
* **Delight** consumers with personalized recommendations, virtual try-on, and community engagement.

---

## Platform Strategy

* **Mobile App (Expo React Native)**: Full consumer feature set, including:

  * Booking & Scheduling
  * E-Commerce & Cart
  * AI Skin Analysis
  * Virtual Try-On
  * Social Feed & Messaging
  * Loyalty & Rewards
* **Web App (Next.js 14)**: Marketing & Onboarding, Provider Portal, Admin Dashboard:

  * Landing Pages & SEO
  * User Registration & Onboarding
  * Provider & Admin Analytics
  * Content Management & Moderation

---

## Technology Stack

| Layer                  | Technology                               |
| ---------------------- | ---------------------------------------- |
| Frontend Web           | Next.js 14 App Router, Tailwind CSS      |
| Frontend Mobile        | Expo, React Native, React Navigation     |
| Auth & Backend         | Supabase Auth (MFA, RLS), Edge Functions |
| Database & ORM         | PostgreSQL, Prisma                       |
| Storage & Media        | AWS S3, Cloudinary                       |
| Payments               | Stripe, Coinbase Commerce                |
| Monitoring & Analytics | Datadog, Sentry, Amplitude, LogRocket    |
| Feature Flags          | LaunchDarkly                             |
| Messaging              | Stream / Sendbird                        |
| AI / ML                | OpenAI, Anthropic                        |
| DevOps & CI/CD         | GitHub Actions, Vercel, Expo EAS, Docker |

---

## Getting Started

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd vibewell
   pnpm install
   ```
2. **Configure Secrets** (see `docs/02_EnvSetup.md`)
3. **Database & Migrations**

   ```bash
   pnpm run infra:up
   pnpm --filter @vibewell/db prisma migrate dev
   ```
4. **Launch Applications**

   ```bash
   doppler run -- pnpm dev:web
   doppler run -- pnpm dev:mobile
   ```
5. **Tools**

   * `pnpm storybook` – UI components explorer
   * `pnpm test` – Run unit & integration tests

---

## Scripts Reference

```bash
pnpm install
pnpm dev:web
pnpm dev:mobile
pnpm storybook
pnpm test
pnpm build
```

---

## Contributing

* Follow **GitFlow**: feature branches → pull requests → code review.
* Adhere to coding standards: ESLint (Airbnb + TS), Prettier.
* Write tests for new features: unit, integration, E2E.

---

## License & Credits

© 2025 VibeWell Development Team. Licensed under MIT License. 