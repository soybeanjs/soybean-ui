# HEADLESS COMPONENTS KNOWLEDGE BASE

**Context**: Component primitives (Logic, State, A11y).
**Directory**: `headless/src/components/`

## ARCHITECTURE

- **One directory per primitive**: Each component is isolated.
- **Headless**: Strictly logic only. No styles or UnoCSS.
- **Composition API**: Uses Vue 3 script setup.

## ANATOMY

| File         | Responsibility                                  |
| ------------ | ----------------------------------------------- |
| `index.ts`   | Entry point, exports components and types.      |
| `*.vue`      | SFCs containing logic and state.                |
| `context.ts` | Injection keys and providers for state sharing. |
| `types.ts`   | Prop types and interfaces.                      |

## CONVENTIONS

- **Separation**: Logic in `.vue`, types in `types.ts`.
- **Naming**: `[primitive]-[part].vue` or `[primitive].vue`.
- **A11y**: Must follow WAI-ARIA patterns.
- **Context**: Use `provide`/`inject` for nested components.

## ANTI-PATTERNS

- **NO STYLES**: Do not add `<style>` blocks or classes.
- **NO UI LOGIC**: Keep strictly to component primitive logic.
