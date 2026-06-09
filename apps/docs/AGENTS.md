# DOCUMENTATION SITE — @soybeanjs/ui-docs

## AI ASSISTANT BRIDGE

For any AI assistant editing files under `apps/docs/`:

1. Read `.github/assistant-rules.md`.
2. Follow `.github/copilot-instructions.md`.
3. Apply the relevant files from `.github/instructions/`, especially the docs-related rules.
4. For `apps/docs/src/docs/**`, the nearer `apps/docs/src/docs/AGENTS.md` narrows the exact markdown rule set.

The remaining content in this file is package knowledge and local context. Normative rules still live in `.github/`.

**Package:** `apps/docs/` → NOT published to npm
**Stack:** Vite + vite-ssg + unplugin-vue-markdown + markdown-exit (NOT VitePress)

## HOW DOCS WORK

Markdown files in `apps/docs/src/docs/[lang]/` → auto-converted to Vue pages via `unplugin-vue-markdown`. Routing is file-based via `vite-ssg` + `unplugin-vue-router`, and markdown rendering now goes through `@shikijs/markdown-exit`.

## PLAYGROUND SYSTEM

Demos live in `apps/playground/src/examples/[component]/` (separate workspace). Component markdown now references them through direct Vue tags such as `<UsageCode component="button" />` and `<PlaygroundGallery component="button" />`, rather than fenced `playground` blocks.

`apps/playground/src/examples/{component}/index.vue` is now just a `PlaygroundGallery` entry point; the gallery auto-discovers sibling demo files, prioritizes `basic`, and resolves demo titles from `playground.examples.{component}.{file}` locale keys.

API sections are rendered through `<ComponentApi component="button" />`, backed by generated json data under `apps/docs/src/generated/api/` and `apps/docs/src/generated/api-locales/`. After public API changes, run `pnpm sui api`; if only locale template data needs refresh, `pnpm sui api-locales`; then translate non-English locales with `pnpm sui api-translate -- --locale <locale>`.

Component detail pages and `/releases` also consume generated changelog data under `apps/docs/src/generated/changelog/` and `apps/docs/src/generated/changelog-locales/`. When changelog mapping, release presentation, or generated changelog locale templates change, run `pnpm sui changelog`; then translate non-English locales with `pnpm sui changelog-translate -- --locale <locale>`.

## STRUCTURE

```
apps/docs/src/
├── docs/           # Markdown content
│   ├── en/         # English docs
│   └── zh-CN/      # Chinese docs (must mirror en/ structure exactly)
├── pages/          # Route pages (auto-generated from file system)
├── components/     # Docs UI: Header, Sider, PlaygroundGallery, etc.
└── modules/        # Vite plugins, SSG setup
```

## CONVENTIONS

- **FrontMatter required**: Every `.md` needs at minimum `title: ComponentName`
- **Language parity**: `en/` and `zh-CN/` must have identical file structure
- **Demo isolation**: Demos in `apps/playground/`, never inline in markdown
- **Component docs**: Prefer `<UsageCode>`, `<PlaygroundGallery>`, and `<ComponentApi>` as the default rendering surfaces
- **Demo titles**: Titles come from locale keys under `playground.examples.{component}.{file}`, not local `h3` headings inside demo files
- **Generated API data**: Public API changes require regenerating `apps/docs/src/generated/api/` and `apps/docs/src/generated/api-locales/`, then translating non-English locales
- **Generated changelog data**: Component changelog sections and the releases page rely on `apps/docs/src/generated/changelog/` and `apps/docs/src/generated/changelog-locales/`; do not hand-edit generated changelog files
- **Auto-generated**: `typed-router.d.ts` — DO NOT edit manually
