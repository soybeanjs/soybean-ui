# DOCUMENTATION SITE — @soybeanjs/ui-docs

**Package:** `docs/` → NOT published to npm
**Stack:** Vite + vite-ssg + unplugin-vue-markdown (NOT VitePress)

## HOW DOCS WORK

Markdown files in `docs/src/docs/[lang]/` → auto-converted to Vue pages via `unplugin-vue-markdown`. Routing is file-based via `vite-ssg` + `unplugin-vue-router`.

## PLAYGROUND SYSTEM

Demos live in `playground/examples/[component]/` (separate workspace). Referenced in markdown via:

````markdown
```playground
demo-file-name
```
````

Rendered by `PlaygroundGallery` component. Each demo is a standalone `.vue` SFC.

## STRUCTURE

```
docs/src/
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
- **Demo isolation**: Demos in `playground/`, never inline in markdown
- **Component docs**: Must document props, events, slots, and types
- **Auto-generated**: `typed-router.d.ts` — DO NOT edit manually
