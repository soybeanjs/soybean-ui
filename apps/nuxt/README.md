# @soybeanjs/ui-nuxt

English | [中文](./README.zh-CN.md)

Minimal Nuxt integration fixture for `@soybeanjs/ui`.

## 📖 Overview

This app verifies the repository's Nuxt module and UnoCSS wiring. It is a thin
shell around the shared playground home rather than a standalone example app:

- Auto-import of `S`-prefixed components via the Nuxt module
- UnoCSS integration for utility-first styling
- Reuse of the playground page and theme context
- `@nuxtjs/i18n` module configuration for `en` and `zh-CN`

## 🛠 Development

```bash
# Install dependencies
pnpm install

# Start Nuxt dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗 Tech Stack

- **Nuxt 4** — Vue framework
- **@soybeanjs/ui** — Styled component library
- **@soybeanjs/ui/nuxt** — Nuxt module for auto-registration
- **UnoCSS** — Utility-first CSS engine
- **Vue I18n** — Internationalization

## 📁 Project Structure

```
apps/nuxt/
├── app/
│   └── app.vue       # Embeds the playground home and theme context
├── nuxt.config.ts    # UI module, i18n, UnoCSS, and source aliases
├── uno.config.ts     # Shared SoybeanUI preset stack
├── package.json
└── tsconfig.json
```

## Current Fixture Limits

- `app.vue` imports source directly from `apps/playground`; this app is not
  independently deployable.
- The Nuxt i18n configuration references `en.json` and `zh-CN.json`, but locale
  fixture files are not currently present under `apps/nuxt`. Validate or add
  them before using this as an i18n reference.
- The workspace currently has no dedicated `typecheck` script or integration
  test for this fixture.

See [Project architecture](../../docs/architecture.md) for the complete
cross-app dependency graph.
