# Code

## Overview

A code block with optional line numbers, copy-to-clipboard, and a pluggable syntax highlighter. `SCode` composes the headless `CodeRoot` (copy state, line-number generation, highlighter injection) with the `codeVariants` recipe (block/inline variants). Use it for documentation snippets, terminal output, or API examples. For prose typography with inline code styling, prefer `STypographyText code`. Syntax highlighting is deliberately not bundled — pass a `highlight` function (e.g. from Shiki, highlight.js, or Prism) so you choose your own library and theme.

## Usage

<UsageCode component="code" />

## Features

- 🧩 Headless/styled split — `CodeRoot` owns copy state (`copyTextToClipboard`), line-number generation, and highlighter injection; `SCode` only injects styles
- 🔣 `language` is passed to the highlighter and reflected as `data-language` for theme-specific styling
- 🔢 `lineNumbers` renders a gutter of line numbers generated from the source
- 📋 `copyable` renders a copy button with transient copied state and a `copied` event
- 🧩 `highlight` — a pluggable `(code, language) => string` highlighter; when omitted the code is rendered escaped as plain text
- 🧱 `variant` (`block`/`inline`) — block for multi-line snippets, inline for single-line code within prose
- 🎨 `codeVariants` — `scv()` recipe with `root`/`code`/`lineNumbers`/`copyButton` slot overrides
- ♿ Semantic `<pre>`/`<code>` structure; decorative line numbers and copy button are labeled for screen readers

## Demos

<PlaygroundGallery component="code" />

## API

<ComponentApi component="code" />

## Notes

### Architecture and benchmark differences

SoybeanUI keeps the code logic headless (`CodeRoot`) and lets the highlighter be injected as a plain function, so the library stays dependency-free while users can wire Shiki/highlight.js/Prism. Compared with Mantine `Code`/`CodeHighlight`, Naive UI `n-code`, Chakra `Code`, and shadcn `CodeBlock`, SoybeanUI is the only benchmarked library with a headless/styled split and per-slot `ui` class overrides; Mantine's `CodeHighlight` ships Shiki integration but couples the theme, while Naive UI renders highlighting via Prism with its own bundle.

| Capability             | SoybeanUI | Mantine CodeHighlight | Naive UI | Chakra | shadcn CodeBlock |
| :--------------------- | :-------: | :-------------------: | :------: | :----: | :--------------: |
| headless/styled split  |    ✅     |           —           |    —     |   —    |        —         |
| Line numbers           |    ✅     |          ✅           |    ✅    |   —    |        ✅        |
| Copy to clipboard      |    ✅     |          ✅           |    —     |   —    |        ✅        |
| Pluggable highlighter  |    ✅     |           —           |    —     |   —    |        —         |
| Block/inline variants  |    ✅     |           —           |    ✅    |   ✅   |        —         |
| Per-slot `ui` override |    ✅     |           —           |    —     |   —    |        —         |

### Cautions

- `highlight` returns HTML and is rendered via `v-html`; sanitize any user-provided highlight output or code that is not from a trusted source.
- Inline (`variant="inline"`) forces `lineNumbers` off.
- The default render escapes the code so special characters display literally; supply `highlight` for syntax coloring.

## FAQ

### How do I add syntax highlighting?

Pass a `highlight` function that returns HTML, e.g. `(code, lang) => Prism.highlight(code, Prism.languages[lang], lang)`. The function receives the code and the `language` prop.

### How do I show line numbers?

Set `line-numbers`. A gutter is rendered from the source's line count.

### How do I copy the code?

Set `copyable`. A copy button appears in the top corner with a brief success state; listen for the `copied` event.

### How do I use it inline in prose?

Set `variant="inline"`. The code renders as a single-line inline element suitable for embedding in a sentence.
