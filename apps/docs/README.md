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
├── build/            # Build-time Vite plugins (for example llms.txt generation)
├── locales/          # Application i18n locale files
├── public/           # Static assets, registry JSON, and public schemas
├── src/
│   ├── components/   # Doc-specific components (UsageCode, PlaygroundGallery, ComponentApi)
│   ├── docs/         # Mirrored en/ and zh-CN Markdown content
│   ├── generated/    # Generated API/changelog documents and locale templates
│   ├── layouts/      # Page layouts
│   ├── modules/      # App installers and Markdown/i18n integration
│   ├── pages/        # Route pages (file-based routing)
│   ├── shared/       # Generated-data adapters and shared helpers
│   └── styles/       # Site-wide styles
├── package.json
├── uno.config.ts
└── vite.config.ts
```

## 📝 Generated Content

The docs site reads generated data from `apps/docs/src/generated/`:

- `api/` — Per-component API documents and aggregate index
- `api-locales/` — Generated API descriptions by locale
- `changelog/` — Per-component changelog entries
- `changelog-locales/` — Translated changelog data

To regenerate this data from the main repository:

```bash
pnpm sui gen api                              # regenerate API JSON and locale baseline
pnpm sui gen changelog                        # regenerate changelog JSON and locale baseline
pnpm sui gen schema                           # regenerate public sbean JSON schemas
pnpm sui gen api --translate --locale zh-CN
pnpm sui gen changelog --translate --locale zh-CN
```

The production docs build also regenerates the public sbean registry under
`apps/docs/public/r/`.

For the cross-workspace dependency and generation flow, see
[Project architecture](../../docs/architecture.md).
