# AGENTS.md (Styled UI Layer)

**Directory:** `src/`
**Owner:** UI/UX Engineers

## OVERVIEW

The "Skin" layer of SoybeanUI. Provides styled Vue 3 components using UnoCSS and `tailwind-variants` built on top of `@soybeanjs/headless`.

## STRUCTURE

- `components/`: Styled wrappers for headless primitives. Contains `.vue`, `types.ts`, and `index.ts`.
- `variants/`: Style definitions using `tv` from `tailwind-variants`.
- `theme/`: Design tokens, merging logic (`cn`), and UnoCSS bridge.
- `nuxt/`, `resolver/`: Framework-specific integrations.

## WHERE TO LOOK

| Goal                   | Path                             |
| ---------------------- | -------------------------------- |
| Modify Component UI    | `src/components/[name]/`         |
| Change Variant Styles  | `src/variants/[name].ts`         |
| Extend Component Props | `src/components/[name]/types.ts` |
| Theme Configuration    | `src/theme/`                     |

## CONVENTIONS

- **Extend Headless**: Always wrap `@soybeanjs/headless` components. Use `useOmitProps` to forward logic props while consuming style props.
- **UnoCSS**: Use utility classes exclusively. Avoid raw CSS.
- **Tailwind Variants**: Use `tv()` for complex variant and compound styling.
- **Prefix**: Components are prefixed with `S` (e.g., `SButton`).

## ANTI-PATTERNS

- **NO RAW CSS**: Do not use `<style>` blocks or CSS files.
- **Complex Logic**: Business/ARIA logic belongs in `headless`, not here.
- **Duplicating Props**: Extend headless props instead of redefining them.

## COMMANDS

```bash
pnpm dev              # Start development playground
pnpm build            # Build the UI package
```
