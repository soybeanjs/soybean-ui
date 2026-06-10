# @soybeanjs/ui-nuxt

English | [中文](./README.zh-CN.md)

Example Nuxt application demonstrating `@soybeanjs/ui` integration.

## 📖 Overview

This app shows how to use `@soybeanjs/ui` in a Nuxt application with:

- Auto-import of `S`-prefixed components via the Nuxt module
- UnoCSS integration for utility-first styling
- Internationalization with `vue-i18n`
- Full TypeScript support

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
├── src/
│   ├── components/   # App components
│   ├── pages/        # Route pages (file-based routing)
│   ├── layouts/      # Page layouts
│   └── styles/       # App styles
├── public/           # Static assets
└── dist/             # Build output (git-ignored)
```
