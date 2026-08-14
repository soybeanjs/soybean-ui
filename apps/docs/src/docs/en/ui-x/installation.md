# Installation

Install `@soybeanjs/ui-x` via your favorite package manager:

```bash
pnpm add @soybeanjs/ui-x
```

`@soybeanjs/ui-x` builds on `@soybeanjs/ui` and `@soybeanjs/headless`. If they are not already installed, add them too:

```bash
pnpm add @soybeanjs/ui @soybeanjs/headless
```

## Import styles

Import the UI-X stylesheet in your project entry file:

```ts
// main.ts or main.js
import '@soybeanjs/ui-x/styles.css';
```

If you use `@soybeanjs/ui`, also import its stylesheet:

```ts
import '@soybeanjs/ui/styles.css';
```

## Optional peer dependencies

A few components enable optional capabilities through peer dependencies, installed on demand:

| Package    | Enables                                     |
| ---------- | ------------------------------------------- |
| `shiki`    | Syntax highlighting for `SxCodeBlock`       |
| `mermaid`  | Diagram rendering for `SxMermaid`           |

```bash
pnpm add shiki mermaid
```

`SxMarkdown` is powered by `markstream-vue` (a hard dependency, installed automatically).

## Next steps

- [Quick Start](/ui-x/quick-start) — set up auto-import and build your first chat UI
- [Theming](/ui-x/theming) — UI-X inherits the SoybeanUI theme system
- [Component catalog](/ui-x) — browse all 20 components
