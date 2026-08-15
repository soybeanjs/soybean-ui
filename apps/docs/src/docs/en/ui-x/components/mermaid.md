# Mermaid

## Overview

`SxMermaid` is a styled Mermaid diagram renderer for AI output. It renders diagram source (`code`) into an inline SVG via `mermaid` and offers an image/code mode toggle.

Use it to display flowcharts, sequence diagrams, or other diagrams that an assistant generates in chat responses. Rendering happens on demand through `dynamic import('mermaid')` with `startOnLoad: false`, and the diagram re-renders whenever `code` or `mode` changes. `mermaid` is an optional peer dependency — if it is missing or rendering fails, a graceful fallback message is shown.

Within `@soybeanjs/ui-x`, `SxMermaid` pairs with `SxMarkdown` (diagrams embedded in chat content) and with `SxCodeBlock` for inspecting raw diagram source.

## Usage

<UsageCode component="mermaid" />

## Features

- 📊 Inline SVG — renders the diagram as an inline SVG (via `v-html`) instead of an external image
- 🔄 Diagram / Code toggle — `mode` switches between the rendered diagram and the raw source
- 🪄 Lazy load — `mermaid` is loaded on demand via `dynamic import('mermaid')` with `startOnLoad: false`
- 🔁 Reactive re-render — re-renders automatically when `code` or `mode` changes
- 🛟 Graceful fallback — missing peer dependency or render failure shows a friendly fallback instead of crashing
- 🎛️ Toggle control — `showToggle` hides the toolbar to render a pure diagram

## Demos

<PlaygroundGallery component="mermaid" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'code', type: 'string', default: '-', description: 'The mermaid diagram source code. Required.' },
  { name: 'mode', type: `'image' | 'code'`, default: `'image'`, description: 'The display mode (rendered diagram or source code).' },
  { name: 'showToggle', type: 'boolean', default: 'true', description: 'Whether the image / code toggle is shown.' },
]"/>

### Emits

No custom emits — `SxMermaid` is a self-contained display component.

### Slots

No slots — diagram content and the toolbar are fully internal.

## Notes

### Architecture and benchmark differences

`SxMermaid` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless`/`@soybeanjs/ui`. It deliberately keeps the optional `mermaid` peer dependency out of the core bundle, loading it lazily only when a diagram actually renders — mainstream AI chat libraries either skip diagram support entirely or bundle `mermaid` eagerly.

| Capability               | SoybeanUI-X `SxMermaid` | Vercel AI SDK | shadcn AI (React) | Ant Design Chat (ProChat) | React markdown libs |
| :----------------------- | :---------------------: | :-----------: | :---------------: | :-----------------------: | :-----------------: |
| Vue 3 native             |           ✅            |       —       |         —         |             —             |          —          |
| Mermaid diagram render   |           ✅            |       —       |         —         |             —             |          —          |
| Inline SVG output        |           ✅            |       —       |         —         |             —             |          —          |
| Diagram / code toggle    |           ✅            |       —       |         —         |             —             |          —          |
| Optional peer dep (lazy) |           ✅            |       —       |         —         |             —             |          —          |

`—` = unsupported or requires extra wiring.

### Cautions

- `mermaid` is an optional peer dependency — install it (`pnpm add mermaid`) to enable rendering; without it a fallback message is shown.
- Rendering uses the browser API and is not meaningful during SSR; the diagram is produced client-side after mount.
- `code` is required and re-rendered on change — for very large diagrams keep the source focused and avoid frequent mutations.
- The toggle toolbar only renders when `showToggle` is `true`; set `mode` directly to control the initial display.

## FAQ

### How do I render a diagram?

Pass valid Mermaid source in `code` and install the optional `mermaid` dependency:

```vue
<SxMermaid :code="code" />
```

### How do I show the source code by default?

Set `mode="code"` — the raw diagram source is shown instead of the rendered image.

### Can I hide the Diagram / Code toggle?

Set `show-toggle="false"`; the toolbar disappears and the initial `mode` controls the display.

### Why does my diagram show a fallback message?

The optional `mermaid` peer dependency is missing or the source failed to parse — install `mermaid` and check the diagram syntax.

### Does `SxMermaid` work with `SxMarkdown`?

Yes — embed `SxMermaid` inside markdown content (for example through a custom renderer) to combine rich text with live diagrams.
