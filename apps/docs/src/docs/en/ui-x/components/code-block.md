# CodeBlock

## Overview

`SxCodeBlock` is a styled code block for AI output that shows a language label, a copy button, and (optionally) shiki syntax highlighting. It is a self-contained single-export component in `@soybeanjs/ui-x`.

Use it to display code snippets in chat messages, assistant tool results, or documentation panels. The copy button writes `code` (or a `copyText` override) to the clipboard, flashes a short "Copied" state for 1.5 seconds, and marks the element with `data-copied`. Highlighting is lazy — set `highlight` to opt in, and shiki is only loaded on demand via `dynamic import('shiki')`.

Within `@soybeanjs/ui-x`, `SxCodeBlock` pairs with `SxMarkdown` (as a `codeRenderer`) and with `SxMermaid`/`SxNotification` to form complete AI message content.

## Usage

<UsageCode component="code-block" />

## Features

- 📋 Copy to clipboard — copies `code` (or `copyText`), shows a 1.5s "Copied" flash and sets `data-copied`
- 🎨 Lazy shiki highlight — `highlight` opt-in loads `shiki` via dynamic import with `github-light`/`github-dark` themes
- 🏷️ Language label — header shows the language, normalizing empty/`'text'` values to `text`
- 🧭 Header toggle — `showHeader` hides the language label and copy actions
- 🎛️ Copy control — `onCopy` callback and `copy` emit fire after every copy attempt
- 🧩 Custom slots — `actions` for extra header actions and `copy-label` to customize the button text
- 🛟 Graceful fallback — highlight failures degrade silently to plain text without breaking the block
- ♿ Accessible — copy button exposes `aria-label` ("Copy code"/"Copied")

## Demos

<PlaygroundGallery component="code-block" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'code', type: 'string', default: '-', description: 'The code to display. Required.' },
  { name: 'language', type: 'string', default: `'text'`, description: 'Code language (used for highlighting + label).' },
  { name: 'showHeader', type: 'boolean', default: 'true', description: 'Whether to show the header (language + copy).' },
  { name: 'highlight', type: 'boolean', default: 'false', description: 'Whether to enable shiki syntax highlighting.' },
  { name: 'copyText', type: 'string', default: '-', description: 'Copy text override (defaults to the code itself).' },
  { name: 'onCopy', type: '(text: string) => void', default: '-', description: 'Called with the copied text after a copy attempt.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'copy', parameters: '[text: string]', description: 'Emitted with the copied text after a copy attempt.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'actions', parameters: '-', description: 'Extra header actions rendered next to the copy button.' },
  { name: 'copy-label', parameters: '-', description: 'Custom copy button text (defaults to `Copy` / `Copied`).' },
]"/>

## Notes

### Architecture and benchmark differences

`SxCodeBlock` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless`/`@soybeanjs/ui`. Unlike editor-centric libraries that ship a full editor surface, it targets read-only AI output: copy-to-clipboard and optional highlighting are first-class, while the header and actions stay composable through slots.

| Capability                      | SoybeanUI-X `SxCodeBlock` | Vercel AI SDK (`CodeBlock`) | shadcn AI (React) | Ant Design Chat (ProChat) | React markdown libs |
| :------------------------------ | :-----------------------: | :-------------------------: | :---------------: | :-----------------------: | :-----------------: |
| Vue 3 native                    |            ✅             |              —              |         —         |             —             |          —          |
| Copy-to-clipboard built in      |            ✅             |             ✅              |         —         |            ✅             |          —          |
| Syntax highlighting             |            ✅             |              —              |         —         |            ✅             |         ✅          |
| Lazy highlight (dynamic import) |            ✅             |              —              |         —         |             —             |          —          |
| Custom header actions slot      |            ✅             |              —              |         —         |             —             |          —          |
| Theme-aware highlight           |            ✅             |              —              |         —         |            ✅             |         ✅          |

`—` = unsupported or requires extra wiring.

### Cautions

- `code` is required; omit `copyText` to copy the raw `code`.
- `highlight` uses dynamic `import('shiki')` — install `shiki` as an optional peer dependency, otherwise highlighting silently falls back to plain text.
- The copy action depends on `navigator.clipboard`, which may be unavailable under restricted permissions or during SSR; the flash is skipped but `copy`/`onCopy` still fire.
- Language labels that are empty or `'text'` are normalized to `text` in the header.

## FAQ

### How do I copy custom text instead of the code?

Pass `copyText`; the clipboard receives that value while the block still displays `code`.

### How do I enable syntax highlighting?

Set `highlight` and make sure `shiki` is installed:

```vue
<SxCodeBlock :code="code" language="vue" highlight />
```

### How do I track copy events?

Listen to the `copy` emit or pass `onCopy`:

```vue
<SxCodeBlock :code="code" @copy="text => console.log(text)" />
```

### How do I add extra buttons to the header?

Use the `actions` slot — it renders next to the copy button in the header.

### Why is my language label showing "text"?

Empty or `'text'` values are normalized to `text`; pass a real language such as `ts`, `vue`, or `bash`.
