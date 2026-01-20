# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-20
**Monorepo:** Yes (pnpm workspaces)

## OVERVIEW

SoybeanUI is a Vue 3 component library using a headless architecture.

- **@soybeanjs/headless**: Logic, state, a11y (unstyled primitives).
- **@soybeanjs/ui**: Styled components (UnoCSS + Tailwind Variants).
- **@soybeanjs/ui-docs**: Documentation site.

## STRUCTURE

```
.
├── headless/         # Logic layer (The "Brain")
│   └── src/
│       ├── components/   # Primitives (Accordion, Dialog, etc.)
│       ├── composables/  # Shared logic
│       └── index.ts      # Main export
├── src/              # UI layer (The "Skin")
│   ├── components/   # Styled wrappers
│   ├── variants/     # Tailwind variants definitions
│   └── index.ts      # Main export
└── docs/             # Documentation site
```

## WHERE TO LOOK

| Task              | Location                   | Notes                       |
| ----------------- | -------------------------- | --------------------------- |
| **New Primitive** | `headless/src/components/` | Logic first, no styles      |
| **New Style**     | `src/components/`          | Wraps headless, adds UnoCSS |
| **Theme Logic**   | `src/variants/`            | Tailwind variants           |
| **Docs**          | `docs/src/docs/`           | Markdown files              |

## CONVENTIONS

- **Separation of Concerns**: Logic in `headless`, Styles in `src`.
- **Component Anatomy**:
  - `index.ts`: Exports
  - `*.vue`: SFCs (Root, Item, Trigger)
  - `context.ts`: Injection keys/providers
  - `types.ts`: Props/Emits definitions
- **Styling**: UnoCSS with `tailwind-variants` (tv). No raw CSS files.

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** add styles to `headless` components.
- **DO NOT** mix business logic into `src` (UI) components.
- **DO NOT** use raw CSS/SCSS (use UnoCSS classes).

## COMMANDS

```bash
pnpm dev              # Start playground
pnpm build            # Build all packages
pnpm lint             # Run ESLint
pnpm test             # Run Vitest
pnpm release          # Release packages
```

## DEVELOPMENT SKILL

**Skill**: `/soybeanui-component-development`

Use this skill when developing new components or modifying existing ones. It provides:

- Step-by-step workflow for headless → UI development
- Code templates for types, context, and components
- Critical checklist before completing work
- Common utilities reference

Run: `skill(name="soybeanui-component-development")` to load the workflow guide.
