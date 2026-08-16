# Markdown

Source URL: https://ui.soybeanjs.cn/ui-x/markdown
Markdown URL: https://ui.soybeanjs.cn/ui-x/markdown.md
Category: Content Rendering
Description: `SxMarkdown` is a streaming markdown renderer built for AI chat output. It is a thin styled wrapper around `markstream-vue`'s `MarkdownRender` (importing `markstream-vue/index.css`) that gives you incremental rendering of AI output as it arrives.

## Overview

`SxMarkdown` is a streaming markdown renderer built for AI chat output. It is a thin styled wrapper around `markstream-vue`'s `MarkdownRender` (importing `markstream-vue/index.css`) that gives you incremental rendering of AI output as it arrives.

Use it whenever you display assistant responses token by token — chat messages, streaming completions, or live tool output. It re-parses the `content` on every update and renders incomplete constructs as placeholders until `final` is set. For static, non-streaming documents you can pass the full `content` once and set `final`.

Within `@soybeanjs/ui-x`, `SxMarkdown` pairs naturally with `SxCodeBlock` and `SxMermaid`: code fences inside the markdown can be highlighted through `codeRenderer` (for example with `SxCodeBlock`), and diagrams can be embedded with `SxMermaid`.

## Usage

Usage examples for markdown are rendered on the site.

## Features

- 🧩 Thin wrapper — delegates rendering to `markstream-vue`'s `MarkdownRender` and forwards every prop and slot
- ⚡ Streaming render — re-parses `content` incrementally; set `final` to disable streaming placeholders
- 🌙 Dark mode — `isDark` switches the renderer palette for dark UIs
- ⌨️ Typewriter — `typewriter` paces text emission for a chat-like reveal
- 🌊 Smooth streaming — `smoothStreaming` (`boolean` or `'auto'`) paces output smoothly
- 🔌 Custom code renderer — `codeRenderer` plugs in `SxCodeBlock` or any custom highlighter
- 🎛️ Parse control — `parseOptions` and `htmlPolicy` tune parsing and HTML handling
- 📦 Forwarded slots — every `MarkdownRender` slot is re-exposed dynamically

## Demos

Interactive demos for markdown are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (1): Markdown.

### Markdown

#### Props

Properties for the SxMarkdown component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `content`: Markdown source to render. Use this for streaming input — the renderer re-parses incrementally and renders incomplete constructs as placeholders. (type `string`; optional)
- `final`: Whether the stream has completed. `true` disables streaming placeholders. (type `boolean`; optional)
- `mode`: Render pacing mode. (type `NodeRendererMode`; optional)
- `htmlPolicy`: HTML handling policy. (type `HtmlPolicy`; optional)
- `isDark`: Whether to render in dark mode. (type `boolean`; optional)
- `typewriter`: Typewriter animation. (type `NodeRendererTypewriter`; optional)
- `smoothStreaming`: Enable smooth (paced) streaming. (type `boolean | 'auto'`; optional)
- `codeRenderer`: Code block renderer. (type `NodeRendererCodeRenderer`; optional)
- `parseOptions`: Parse options forwarded to the markdown engine. (type `ParseOptions`; optional)
- `rendererProps`: Additional props forwarded to the underlying `MarkdownRender`. (type `Partial<Partial<{ showTooltips: boolean; nodeVirtual: boolean | 'auto'; fade: boolean; debugPerformance: boolean; vie...`; optional)

## Notes

### Architecture and benchmark differences

`SxMarkdown` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless`/`@soybeanjs/ui`. It stays a presentation layer on purpose: rendering logic lives in `markstream-vue`, while SoybeanUI-X owns the Vue component surface, dark-mode styling, and prop ergonomics. Mainstream AI libraries either ship their own markdown pipelines or delegate to React-markdown-style libraries — none provides a Vue-3-native streaming wrapper with typewriter and smooth-streaming pacing out of the box.

| Capability                | SoybeanUI-X `SxMarkdown` | Vercel AI SDK (React `Markdown`) | shadcn AI (React) | Ant Design Chat (ProChat) | React markdown libs |
| :------------------------ | :----------------------: | :------------------------------: | :---------------: | :-----------------------: | :-----------------: |
| Vue 3 native              |            ✅            |                —                 |         —         |             —             |          —          |
| Streaming markdown render |            ✅            |                ✅                |         —         |            ✅             |          —          |
| Typewriter animation      |            ✅            |                —                 |         —         |             —             |          —          |
| Smooth streaming pacing   |            ✅            |                —                 |         —         |             —             |          —          |
| Dark mode                 |            ✅            |                ✅                |         —         |            ✅             |          —          |
| Custom code renderer      |            ✅            |                —                 |         —         |             —             |         ✅          |

`—` = unsupported or requires extra wiring.

### Cautions

- `content` is re-parsed on every change — for large non-streaming documents pass the full source once and avoid unnecessary mutations.
- Keep `final` in sync with your stream; leaving it unset keeps placeholder rendering active indefinitely.
- `htmlPolicy` defaults to `'safe'` — only relax it when you trust the source HTML.
- `rendererProps` merges into `MarkdownRender` last and can override the explicit props; pass it deliberately.

## FAQ

### How do I render a static markdown document?

Pass the full source in `content` and set `final`:

```vue

```

### How do I stream AI output?

Update `content` as chunks arrive and set `final` to `true` when the stream completes — see the streaming demo.

### How do I enable the typewriter effect?

Set `typewriter` on `SxMarkdown`, optionally combined with `mode` to control pacing.

### How do I use dark mode?

Pass `:is-dark="true"` (or bind it to your theme state) to switch the renderer palette.

### Can I use `SxCodeBlock` for code fences inside markdown?

Yes — pass a `codeRenderer` that renders `SxCodeBlock` for highlighted blocks, or override the code-related slots that `MarkdownRender` exposes.
