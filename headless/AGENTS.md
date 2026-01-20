# HEADLESS LOGIC BASE (The "Brain")

**Directory:** `headless/`
**Context:** Logic layer, unstyled primitives, state management.

## OVERVIEW

The "Brain" of SoybeanUI. It provides the behavioral foundation for all components, handling:

- **State Management**: Complex UI states (e.g., selection, expansion, focus).
- **Accessibility (A11y)**: WAI-ARIA roles, attributes, and keyboard navigation.
- **Interactions**: Logic for pointer events, dismissable layers, and floating elements.

## STRUCTURE

```
headless/src/
├── components/   # Primitive SFCs (e.g., AccordionRoot, DialogTrigger)
├── composables/  # Reusable logic hooks (e.g., useSelection, useFloating)
├── shared/       # DOM, Vue, and State utilities
├── constants/    # Common ARIA attributes and component constants
└── types/        # Global TypeScript interfaces and component props
```

## WHERE TO LOOK

| Target              | Path                                                  |
| ------------------- | ----------------------------------------------------- |
| **Component Logic** | `src/components/[name]/` (Logic SFCs, context, types) |
| **Shared Hooks**    | `src/composables/` (Standalone behavioral logic)      |
| **Logic Utilities** | `src/shared/` (Non-Vue specific helper functions)     |
| **Component Entry** | `src/index.ts` (Main package exports)                 |

## CONVENTIONS

- **Strictly Unstyled**: No `<style>` blocks, UnoCSS classes, or hardcoded styles.
- **Accessibility First**: Must adhere to WAI-ARIA design patterns for all primitives.
- **Logic Encapsulation**: Use composables to share behavior between components.
- **Context-Driven**: Use `provide`/`inject` for state sharing between nested parts.

## ANTI-PATTERNS

- **Importing from @soybeanjs/ui**: Forbidden to prevent circular dependencies.
- **UI-Specific Logic**: Do not include presentation concerns like colors or sizing.
- **Hardcoded CSS Classes**: Even functional classes (like `hidden`) should be handled via logic.
- **Direct DOM Manipulation**: Always prefer Vue refs and `useForwardElement`.
