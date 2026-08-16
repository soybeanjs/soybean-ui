# Installation

Install `@soybeanjs/admin` via your favorite package manager:

```bash
pnpm add @soybeanjs/admin
```

`@soybeanjs/admin` declares `@soybeanjs/ui` and `@soybeanjs/headless` as dependencies and Vue as a peer dependency, so installing the package is enough to get started.

## Styles

The package ships a standalone stylesheet built with UnoCSS. Import it once after the UI stylesheet:

```ts
import '@soybeanjs/ui/styles.css';
import '@soybeanjs/admin/styles.css';
```

> The admin stylesheet is generated from the component recipes via `build:css`; theme tokens resolve through `@soybeanjs/ui-uno`.
