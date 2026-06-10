# @soybeanjs/ui-playground

English | [中文](./README.zh-CN.md)

Interactive playground for SoybeanUI components, built with Vite.

## 📖 Overview

This app is a live development playground for `@soybeanjs/ui` and `@soybeanjs/headless`. Use it to:

- Experiment with components in isolation
- Test theme variants and configurations
- Prototype layouts and interactions
- Debug component behavior

## 🛠 Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type-check
pnpm typecheck
```

## 🏗 Tech Stack

- **Vue 3** — UI framework
- **Vite** — Build tool
- **UnoCSS** — Utility-first CSS engine
- **@soybeanjs/ui** — Styled components
- **@soybeanjs/headless** — Headless primitives
- **Vue I18n** — Internationalization
- **Vue Router** — Routing

## 📁 Project Structure

```
apps/playground/
├── src/
│   ├── components/   # Demo components and examples
│   ├── pages/        # Route pages (file-based routing)
│   ├── layouts/      # Page layouts
│   └── styles/       # Playground styles
├── public/           # Static assets
└── dist/             # Build output (git-ignored)
```
