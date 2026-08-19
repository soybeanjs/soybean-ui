# Typography

## Overview

A family of semantic text primitives — `STypographyTitle` (h1–h6), `STypographyParagraph` (with copy support), and `STypographyText` (with type/modifier variants) — built on lightweight headless components that render the correct HTML element for each role. Use it for document prose, card headings, form labels that need a specific semantic level, or any content where the right heading/paragraph/inline-text element matters for accessibility and SEO. Prefer `STypographyText` for single inline words, `STypographyTitle` for section headings, and `STypographyParagraph` for body copy. `SEllipsis` pairs with paragraphs when you need line-clamp truncation.

## Usage

<UsageCode component="typography" />

## Features

- 🧩 Headless/styled split — `TypographyTitle`/`TypographyParagraph`/`TypographyText` own the semantic element and state; `STypography*` wrappers only inject the recipes
- 🏷 `STypographyTitle` — `level` (1–6) drives both the `h1`–`h6` tag and the `typographyTitleVariants` size scale
- 📄 `STypographyParagraph` — `copyable` renders a copy button; copy logic lives in headless via `copyTextToClipboard`, exposing `{ copied, copy }` slot props
- ✍️ `STypographyText` — `type` (`secondary`/`success`/`warning`/`danger`) plus `code`/`mark`/`strong`/`italic`/`underline`/`delete` modifiers that pick the semantic element (`<code>`, `<mark>`, `<em>`, …)
- 🧭 `as`/`asChild` polymorphism on title and text — override the rendered tag or merge onto a child
- 🎨 `typographyTitleVariants` / `typographyParagraphVariants` / `typographyTextVariants` — separate `cv()`/`scv()` recipes per primitive
- ♿ Semantic HTML (`h1`–`h6`, `p`, `code`, `mark`, `del`, `strong`, `em`) with `data-level`/`data-type`/`data-code` etc. state attributes

## Component family

- `STypographyTitle` — heading primitive (`h1`–`h6`)
- `STypographyParagraph` — paragraph primitive with copy support
- `STypographyText` — inline text primitive with type/modifier variants

## Demos

<PlaygroundGallery component="typography" />

## API

<ComponentApi component="typography" />

## Notes

### Architecture and benchmark differences

SoybeanUI ships three independent primitives instead of a single `Typography` root with mode flags. Each `STypography*` wrapper is self-contained (no required parent), applies its own `cv()`/`scv()` recipe, and keeps the semantic element in headless. Compared with Ant Design `Typography` (single root, `Title`/`Paragraph`/`Text` sub-components with `copyable`/`editable`/`ellipsis`), MUI `Typography` (`variant` mapping), Chakra `Heading`/`Text`, and Element Plus, SoybeanUI is the only benchmarked library with a headless/styled split and `as`/`asChild` polymorphism on every primitive. Note: paragraph `editable` is intentionally not shipped in this milestone (use the `editable` component when you need inline editing).

| Capability              | SoybeanUI | Ant Design | MUI | Chakra | Element Plus |
| :---------------------- | :-------: | :--------: | :-: | :----: | :----------: |
| headless/styled split   |    ✅     |     —      |  —  |   —    |      —       |
| Title levels 1–6        |    ✅     |     ✅     | ✅  |   ✅   |      —       |
| Paragraph copyable      |    ✅     |     ✅     |  —  |   —    |      —       |
| Text type/modifiers     |    ✅     |     ✅     |  —  |   ✅   |      —       |
| `as`/`asChild`          |    ✅     |     —      |  —  |   —    |      —       |
| Semantic HTML selection |    ✅     |     ✅     |  —  |   ✅   |      —       |

### Cautions

- `STypographyTitle` renders an `h{level}`; do not skip levels for document accessibility (jump from `h1` to `h3` is a WCAG heading-order issue).
- `STypographyParagraph` with `copyable` reads its `textContent` for the copy payload unless you pass `copy-text`.
- The paragraph `ellipsis`/`editable` capabilities are covered by `SEllipsis` and the `editable` component respectively — compose them as needed.

## FAQ

### How do I use a heading without affecting document outline?

Pass `as="div"` to `STypographyTitle` to render a styled `div` with heading typography but no heading semantics, or use `role="heading"` with `aria-level`.

### How do I copy only part of the paragraph?

Set `copy-text` on `STypographyParagraph` to control the copied payload instead of relying on the full text content.

### How do I combine an inline code style with a type color?

`STypographyText` supports stacking: `<STypographyText code type="success">npm i</STypographyText>`.

### Why is there no `Typography` root component?

Each primitive is self-contained so it can be used without a wrapping provider. This mirrors Mantine/Chakra and keeps the API surface flat.
