# @soybeanjs/ui-docs

English | [中文](./README.zh-CN.md)

Documentation site for SoybeanUI, built with Vite SSG (static site generation).

## 📖 Overview

This app is the official documentation for `@soybeanjs/ui` and `@soybeanjs/headless`. It provides:

- Component usage examples and live playgrounds
- Full API reference for every component
- Theme customization guides
- Changelog and release notes

## 🛠 Development

```bash
# Start dev server
pnpm dev

# Build for production (static site)
pnpm build

# Preview production build
pnpm preview

# Type-check
pnpm typecheck
```

## 🏗 Tech Stack

- **Vue 3** — UI framework
- **Vite SSG** — Static site generation
- **UnoCSS** — Utility-first CSS engine
- **@soybeanjs/ui** — Styled components
- **@soybeanjs/headless** — Headless primitives
- **Shiki** — Syntax highlighting
- **Vue I18n** — Internationalization
- **Pinia** — State management

## 📁 Project Structure

```
apps/docs/
├── src/
│   ├── components/   # Doc-specific components (UsageCode, PlaygroundGallery, ComponentApi)
│   ├── generated/    # Auto-generated changelog and locale data
│   ├── layouts/      # Page layouts
│   ├── pages/        # Route pages (file-based routing)
│   └── styles/       # Site-wide styles
├── locales/          # i18n locale files
├── public/           # Static assets
└── build/            # Build output (git-ignored)
```

## 📝 Generated Content

The docs site reads generated data from `apps/docs/src/generated/`:

- `changelog/` — Per-component changelog entries
- `changelog-locales/` — Translated changelog data
- Component API descriptions and locale baseline data

To regenerate this data from the main repository:

```bash
pnpm sui api              # regenerate api json and locale baseline
pnpm sui changelog         # regenerate changelog data
pnpm sui api-translate -- --locale zh-CN
pnpm sui changelog-translate -- --locale zh-CN
```
