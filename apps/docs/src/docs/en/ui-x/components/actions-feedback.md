# ActionsFeedback

## Overview

`SxActionsFeedback` is a like/dislike feedback control that lets users rate an AI response with two toggle buttons. Clicking the currently active polarity clears the selection back to `null`.

Use it at the bottom of an AI message to collect thumbs-up / thumbs-down feedback. The current value is controlled via the `value` prop (`'like'` / `'dislike'` / `null`), and both the `onChange` prop and the `change` emit fire when it changes.

`SxActionsFeedback` is part of the actions family, alongside `SxActions` (generic toolbar), `SxActionsCopy` (copy action), and `SxFolder` (collapsible folder).

## Usage

<UsageCode component="actions-feedback" />

## Features

- 👍👎 Like / dislike — two toggle buttons for feedback polarity
- 🔄 Toggle semantics — clicking the active polarity returns the state to `null` (clears)
- 🧩 Custom icons — `like-icon` and `dislike-icon` slots receive `{ active }` for state-aware rendering
- 📞 Dual output — both the `onChange` prop and the `change` emit fire on change
- ♿ Accessible — each button has `aria-pressed` and a `data-active` attribute
- 🚫 Disabled state — `disabled` blocks both buttons entirely
- 🔒 Type safe — the `FeedbackValue` type is `'like' | 'dislike'`

## Demos

<PlaygroundGallery component="actions-feedback" />

## API

<ComponentApi component="actions-feedback" />

## Notes

### Architecture and benchmark differences

`SxActionsFeedback` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: it is a self-contained presentational component with no headless composable dependency. The SFC wires the `actionsFeedbackVariants` recipe, applies toggle semantics, and forwards slots. Feedback polarity uses an ARIA-friendly `aria-pressed` toggle pattern rather than a radio group.

| Capability                       | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Like/dislike feedback            |     ✅      |       —       |     —     |       ✅        |
| Toggle to clear selection        |     ✅      |       —       |     —     |        —        |
| Custom icons with `active` state |     ✅      |       —       |     —     |        —        |
| `aria-pressed` toggle semantics  |     ✅      |       —       |     —     |        —        |
| Controlled `value` prop          |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- The component is **controlled** — you must keep the `value` prop in sync (e.g. listen to `change` and update your ref) or the visual state will not update.
- Clicking the already-active polarity clears the feedback to `null` — this is intentional toggle behavior.
- Both `onChange` and `change` fire with the same value. Prefer one to avoid duplicated handlers.
- `disabled` prevents both `onChange` and `change` from firing.

## FAQ

### How do I use it as a controlled component?

Keep a `ref` in sync with the `change` event:

```vue
<SxActionsFeedback :value="value" @change="value = $event" />
```

### How does clearing the feedback work?

Clicking the currently active polarity sets the value to `null` (i.e. no feedback). Clicking the opposite polarity switches the selection.

### Can I use custom icons?

Yes — use the `like-icon` and `dislike-icon` slots. Both receive `{ active }` so you can swap icons when the polarity is selected.

### What is the difference between `onChange` and the `change` emit?

They carry the same value. `onChange` is a callback prop; `change` is an emit. Choose whichever fits your codebase style.

### How do I disable the feedback buttons?

Set `disabled` to `true`. Both buttons render with `disabled` and no change event fires.
