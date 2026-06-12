---
title: CLI
description: sbean CLI tool reference
---

# SBean CLI

`sbean` is the command-line tool for SoybeanUI. It helps you initialize projects, add components, and manage your UI configuration.

## Installation

```bash
pnpm add -D sbean
```

Or run directly:

```bash
npx sbean init
```

## Commands

### `sbean init`

Initialize a new SoybeanUI project or add configuration to an existing one.

```bash
sbean init [options]
```

| Option                  | Description                                                                 | Default                                      |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| `-m, --monorepo`        | Use monorepo (pnpm workspaces) structure                                    | `false`                                      |
| `--ui-dir <path>`       | Component output directory                                                  | `src/ui` (single) / `packages/ui` (monorepo) |
| `--size <size>`         | Component size: xs / sm / md / lg / xl / 2xl                                | `md`                                         |
| `--style <style>`       | Style preset: soybean / clean / dense                                       | `soybean`                                    |
| `-b, --base <base>`     | Base color: zinc / neutral / stone / slate / gray                           | `zinc`                                       |
| `--primary <primary>`   | Primary color: indigo / blue / green / ...                                  | `indigo`                                     |
| `--feedback <feedback>` | Feedback color preset: classic / vivid / subtle / ...                       | `classic`                                    |
| `--radius <radius>`     | Border radius: none / xs / sm / md / lg / xl / 2xl                          | `md`                                         |
| `-p, --preset <code>`   | Preset code (base62 encoded config)                                         | —                                            |
| `--icon-library <lib>`  | Icon library: lucide / material-symbols / ph / tabler / solar / radix-icons | `lucide`                                     |
| `--font-sans <font>`    | Sans-serif font: inter / roboto / geist / ...                               | —                                            |
| `--font-heading <font>` | Heading font or `inherit`                                                   | —                                            |
| `-y, --yes`             | Skip confirmation prompt                                                    | `false`                                      |
| `-d, --defaults`        | Use default configuration                                                   | `false`                                      |
| `-f, --force`           | Overwrite existing configuration                                            | `false`                                      |

Interactive prompts will guide you through the configuration when no options are provided.

### `sbean add`

Add components to your project.

```bash
sbean add <component...> [options]
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

### `sbean build`

Build registry JSON files from a registry.json manifest.

```bash
sbean build [registry] [options]
```

| Option                | Description      | Default      |
| --------------------- | ---------------- | ------------ |
| `-o, --output <path>` | Output directory | `./public/r` |

### `sbean search`

Search for available components.

```bash
sbean search [query] [options]
```

| Option                  | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `-a, --all`             | Show all components                                    |
| `-t, --type <type>`     | Filter by type: component / hook / style / lib / theme |
| `-l, --limit <limit>`   | Max results (default: 50)                              |
| `-o, --offset <offset>` | Pagination offset                                      |

### `sbean view`

View a component's source code.

```bash
sbean view <component>
```

### `sbean info`

Show project configuration and available preset values.

```bash
sbean info [options]
```

| Option   | Description    |
| -------- | -------------- |
| `--json` | Output as JSON |

### `sbean template`

Scaffold a new project from a template.

```bash
sbean template [name] [options]
```

| Option               | Description              |
| -------------------- | ------------------------ |
| `-l, --list`         | List available templates |
| `-o, --output <dir>` | Output directory         |

Available templates: `vue-vite`, `nuxt`.

### `sbean preset`

Manage configuration presets.

```bash
sbean preset <preset>
```

## Configuration

The `sbean.json` file stores your project configuration:

```json
{
  "style": "soybean",
  "isMonorepo": false,
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "feedback": "classic",
    "size": "md",
    "radius": "md"
  },
  "font": {
    "sans": "inter",
    "heading": "inherit"
  },
  "menu": {
    "accent": "subtle",
    "color": "default"
  },
  "uiDir": "src/ui"
}
```

| Field          | Type      | Description                                         |
| -------------- | --------- | --------------------------------------------------- |
| `style`        | `string`  | Style preset name                                   |
| `isMonorepo`   | `boolean` | Whether the project is a monorepo                   |
| `uiDir`        | `string`  | Component output directory relative to project root |
| `iconLibrary`  | `string`  | Icon library prefix                                 |
| `uno.base`     | `string`  | Base (neutral) color                                |
| `uno.primary`  | `string`  | Primary (brand) color                               |
| `uno.feedback` | `string`  | Feedback color preset                               |
| `uno.size`     | `string`  | Base component size                                 |
| `uno.radius`   | `string`  | Border radius                                       |
| `font.sans`    | `string`  | Sans-serif font name                                |
| `font.heading` | `string`  | Heading font or `"inherit"`                         |
| `menu.accent`  | `string`  | Menu accent style: subtle / bold                    |
| `menu.color`   | `string`  | Menu color scheme                                   |

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
├── sbean.json
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
├── sbean.json
├── tsconfig.json
├── uno.config.ts
└── pnpm-workspace.yaml
```

## Alias System

SBean uses the `#ui` TypeScript path alias for all component imports:

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

SBean fetches component source from the SoybeanUI registry at `https://ui.soybeanjs.cn/r/{name}.json`. A local cache (`~/.sbean/cache`) is maintained with 24-hour TTL and ETag support for efficient updates.
