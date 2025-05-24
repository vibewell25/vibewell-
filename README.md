# VibeWell Beauty & Wellness Platform

VibeWell is an enterprise-grade SaaS platform unifying real-time booking, e-commerce, social networking, and AI personalization for beauty & wellness—plus optional travel integration.

## Repository Structure

This is a monorepo built with Turborepo and PNPM workspaces containing:

- `apps/web`: Next.js 14 web application
- `apps/mobile`: Expo React Native mobile application
- `packages/ui`: Shared UI components and design system
  - `packages/ui/core/theme`: Design tokens and theme
  - `packages/ui/web`: Web UI components 
  - `packages/ui/native`: React Native UI components
- `packages/api`: Shared API client for Supabase and Prisma

## Documentation

For detailed documentation, see the `docs` folder:

- [Project Overview](docs/README.md)
- [Architecture & Infrastructure](docs/01_Architecture.md)
- [Environment Setup](docs/02_EnvSetup.md)
- [Features Index](docs/03_FeaturesIndex.md)
- [UI Components Strategy](docs/UI_Components_Strategy.md)
- [Design Tokens](docs/Design_Tokens.md)
- [Design Mockups](docs/Design_Mockups.md)
- [Super Prompts](docs/SuperPrompts.md)
- [Testing Matrix](docs/Testing_Matrix.md)
- [Release Plan](docs/Release_Plan.md)
- [Risk Register](docs/Risk_Register.md)
- [Security & Compliance](docs/Security_Compliance.md)
- [DevOps & Observability](docs/DevOps_Observability.md)

## Getting Started

1. **Prerequisites**
   - Node.js ≥18
   - PNPM ≥8
   - Docker & Docker Compose
   - Expo CLI
   - Doppler CLI

2. **Installation**
   ```bash
   git clone <repo-url>
   cd vibewell
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   doppler login
   doppler setup --project vibewell --config development
   ```

4. **Start Local Infrastructure**
   ```bash
   pnpm run infra:up
   ```

5. **Run Development Servers**
   ```bash
   # Web App
   pnpm dev:web
   
   # Mobile App
   pnpm dev:mobile
   
   # Storybook
   pnpm storybook
   ```

## License

© 2025 VibeWell Development Team. Licensed under MIT License. 