---
head:
  title: Vean CLI
  description: 'vean is the command-line tool for Vean. It helps you initialize projects, add components, and manage your UI configuration.'
---

# Vean CLI

`vean` is the command-line tool for Vean. It helps you initialize projects, add components, and manage your UI configuration.

## Installation

```bash
pnpm add -D @vean/cli
```

Or run directly:

```bash
npx @vean/cli@latest init
```

## Commands

### `vean init`

Initialize a new Vean project or add configuration to an existing one.

```bash
vean init [options]
```

| Option                  | Description                                                                 | Default                                      |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| `-m, --monorepo`        | Use monorepo (pnpm workspaces) structure                                    | `false`                                      |
| `--ui-dir <path>`       | Component output directory                                                  | `src/ui` (single) / `packages/ui` (monorepo) |
| `--size <size>`         | Component size: xs / sm / md / lg / xl / 2xl                                | `md`                                         |
| `--style <style>`       | Style preset: soybean / clean / dense                                       | `soybean`                                    |
| `-b, --base <base>`     | Base color: zinc / neutral / stone / slate / gray                           | `zinc`                                       |
| `--primary <primary>`   | Primary color: indigo / blue / green / ...                                  | `indigo`                                     |
| `--radius <radius>`     | Border radius: none / xs / sm / md / lg / xl / 2xl                          | `md`                                         |
| `-p, --preset <code>`   | Preset code (base62 encoded config)                                         | —                                            |
| `--icon-library <lib>`  | Icon library: lucide / material-symbols / ph / tabler / solar / radix-icons | `lucide`                                     |
| `--font-sans <font>`    | Sans-serif font: inter / roboto / geist / ...                               | —                                            |
| `--font-heading <font>` | Heading font or `inherit`                                                   | —                                            |
| `-y, --yes`             | Skip confirmation prompt                                                    | `false`                                      |
| `-d, --defaults`        | Use default configuration                                                   | `false`                                      |
| `-f, --force`           | Overwrite existing configuration                                            | `false`                                      |

Interactive prompts will guide you through the configuration when no options are provided.

### `vean add`

Add components to your project.

```bash
vean add <component...> [options]
```

| Option              | Description                              |
| ------------------- | ---------------------------------------- |
| `-y, --yes`         | Skip confirmation prompt                 |
| `-o, --overwrite`   | Overwrite existing files                 |
| `-p, --path <path>` | Target path (default: uiDir from config) |
| `--dry-run`         | Preview changes without writing          |
| `--diff`            | Show diff between local and registry     |
| `--view`            | View component source without adding     |
| `-a, --all`         | Add all available components             |
| `-s, --silent`      | Mute output                              |

### `vean build`

Build registry JSON files from a registry.json manifest.

```bash
vean build [registry] [options]
```

| Option                | Description      | Default      |
| --------------------- | ---------------- | ------------ |
| `-o, --output <path>` | Output directory | `./public/r` |

### `vean search`

Search for available components.

```bash
vean search [query] [options]
```

| Option                  | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `-a, --all`             | Show all components                                    |
| `-t, --type <type>`     | Filter by type: component / hook / style / lib / theme |
| `-l, --limit <limit>`   | Max results (default: 50)                              |
| `-o, --offset <offset>` | Pagination offset                                      |

### `vean list`

List registry items, optionally filtered by package.

```bash
vean list [options]
```

| Option             | Description                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `--package <name>` | Filter by package namespace (currently: `ui`; future peripheral packages are added under their own namespace) |
| `--json`           | Output as JSON                                                                                                |

Items are namespaced by package (currently `ui/button`, `ui/accordion`, …; future peripheral packages follow `<package>/<component>`).

### `vean view`

View a component's source code.

```bash
vean view <component>
```

### `vean info`

Show project configuration and available preset values.

```bash
vean info [options]
```

| Option   | Description    |
| -------- | -------------- |
| `--json` | Output as JSON |

### `vean template`

Scaffold a new project from a template.

```bash
vean template [name] [options]
```

| Option               | Description              |
| -------------------- | ------------------------ |
| `-l, --list`         | List available templates |
| `-o, --output <dir>` | Output directory         |

Available templates: `vue-vite`, `nuxt`.

### `vean preset`

Manage configuration presets.

```bash
vean preset <preset>
```

## Configuration

The `vean.json` file stores your project configuration:

```json
{
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "size": "md",
    "radius": "md"
  },
  "font": {
    "sans": "inter",
    "heading": "inherit"
  },
  "aliases": {
    "ui": "#ui"
  },
  "registries": {}
}
```

| Field          | Type     | Description                                                                                                                                             |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iconLibrary`  | `string` | Icon library prefix                                                                                                                                     |
| `uno.base`     | `string` | Base (neutral) color                                                                                                                                    |
| `uno.primary`  | `string` | Primary (brand) color                                                                                                                                   |
| `uno.size`     | `string` | Base component size                                                                                                                                     |
| `uno.radius`   | `string` | Border radius                                                                                                                                           |
| `font.sans`    | `string` | Sans-serif font name                                                                                                                                    |
| `font.heading` | `string` | Heading font or `"inherit"`                                                                                                                             |
| `aliases`      | `object` | Import aliases per package (e.g. `ui`; future peripheral packages likewise) — each maps to an output dir via `tsconfig` paths (default `src/<package>`) |
| `registries`   | `object` | Additional registry namespace → URL mappings                                                                                                            |

## Project Structure

### Single Package

```
project/
├── src/
│   └── ui/           ← component output (uiDir)
│       ├── components/
│       ├── styles/
│       ├── theme/
│       ├── constants/
│       ├── resolver/
│       └── nuxt/
├── vean.json
├── tsconfig.json
└── uno.config.ts
```

### Monorepo (pnpm workspaces)

```
project/
├── packages/
│   └── ui/           ← component output (uiDir)
│       ├── components/
│       ├── styles/
│       ├── theme/
│       ├── constants/
│       ├── resolver/
│       └── nuxt/
├── vean.json
├── tsconfig.json
├── uno.config.ts
└── pnpm-workspace.yaml
```

## Alias System

Vean uses the `#ui` TypeScript path alias for all component imports:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "#ui/*": ["./src/ui/*"]
    }
  }
}
```

All component imports use this namespace:

```ts
import { SButton } from '#ui/components/button';
import { buttonVariants } from '#ui/styles/button';
```

## Registry

Vean fetches component source from the Vean registry at `https://veanui.com/r/<package>/<component>.json` — the core `ui` package from `r/ui/{name}.json` (e.g. `r/ui/button.json`) and the catalog index from `r/registry.json`. Registry items are **namespaced by package**, so `{name}` in a registry URL template is the qualified item name (`ui/button`), not the bare component name. Core `ui` components can be referenced without a prefix (`vean add button`); components from any future peripheral package will require the namespace prefix (`vean add <package>/<component>`). A local cache (`~/.vean/cache`) is maintained with 24-hour TTL and ETag support for efficient updates.
