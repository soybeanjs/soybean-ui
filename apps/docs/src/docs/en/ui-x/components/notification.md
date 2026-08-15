# Notification

## Overview

`SxNotification` is a styled inline notification for AI output with four visual tones — `info`, `success`, `warning`, and `error`. It announces status with `role="status"` and pairs an icon, title, and optional description with a close button.

Use it for inline status feedback inside chat messages or result panels — for example a "tool completed", "operation succeeded", or "upload failed" message that the assistant surfaces mid-conversation. Each tone ships a default icon (info ℹ️, success ✅, warning ⚠️, error ❌) that you can override through the `icon` slot. Closing the notification calls the `onClose` prop and emits `close`.

Within `@soybeanjs/ui-x`, `SxNotification` pairs with `SxMarkdown`/`SxCodeBlock`/`SxMermaid` to deliver complete AI message content with inline status.

## Usage

<UsageCode component="notification" />

## Features

- 🎨 Four tones — `info` / `success` / `warning` / `error`, each with a default emoji icon
- ♿ Accessible status — `role="status"` announces content to assistive technology
- ✕ Closable — `closable` shows a close button; closing calls `onClose` and emits `close`
- 🧩 Full slot control — `icon`, `title`, `description`, and `close-icon` are all overridable
- 📝 Structured content — `title` plus an optional longer `description`
- 🎛️ Prop-driven — title/description/type/`onClose` cover common cases without slots

## Demos

<PlaygroundGallery component="notification" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'title', type: 'string', default: `''`, description: 'The notification title.' },
  { name: 'description', type: 'string', default: `''`, description: 'Optional longer description.' },
  { name: 'type', type: `'info' | 'success' | 'warning' | 'error'`, default: `'info'`, description: 'The visual tone.' },
  { name: 'closable', type: 'boolean', default: 'true', description: 'Whether the close button is shown.' },
  { name: 'onClose', type: '() => void', default: '-', description: 'Called when the close button is clicked.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'close', parameters: '[]', description: 'Emitted when the close button is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ type }', description: 'Custom icon; receives the current `type`.' },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' },
  { name: 'close-icon', parameters: '-', description: 'Custom close button content.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxNotification` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless`/`@soybeanjs/ui`. Unlike full toast systems, it is intentionally a lightweight inline status component: it stays in the document flow (no portal, no stacking manager) and relies on `role="status"` for announcements rather than ARIA live-region queues.

| Capability                   | SoybeanUI-X `SxNotification` | Vercel AI SDK | shadcn AI (React) | Ant Design Chat (ProChat) | Ant Design Notification |
| :--------------------------- | :--------------------------: | :-----------: | :---------------: | :-----------------------: | :---------------------: |
| Vue 3 native                 |              ✅              |       —       |         —         |             —             |            —            |
| Inline (non-portal) display  |              ✅              |       —       |         —         |             —             |            —            |
| Tone variants                |              ✅              |       —       |         —         |             —             |           ✅            |
| `role="status"` announcement |              ✅              |       —       |         —         |             —             |            —            |
| Full slot overrides          |              ✅              |       —       |         —         |             —             |            —            |
| Imperative toast queue       |              —               |       —       |         —         |            ✅             |           ✅            |

`—` = unsupported or a different interaction model.

### Cautions

- `SxNotification` is inline and in-flow — for global, stacked toasts use a dedicated toast/message system instead.
- The `type` prop is the source of truth for the default icon; overriding the `icon` slot changes only the icon, not the tone styling.
- The description only renders when `description` is set or a `description` slot is provided — an empty string hides it.
- Closing always fires both the `onClose` prop and the `close` emit; register either, not duplicated logic in both.

## FAQ

### How do I change the icon for a tone?

Use the `icon` slot, which receives the current `type`:

```vue
<SxNotification title="Deployed" type="success">
  <template #icon>🚀</template>
</SxNotification>
```

### How do I react to closing?

Pass `onClose` or listen for `close`:

```vue
<SxNotification :title="title" @close="onDismiss" />
```

### How do I hide the close button?

Set `closable` to `false`; the notification becomes non-dismissible.

### How do I customize the title or description?

Use the `title` / `description` slots for rich content (styled spans, links, or code).

### Is this a toast system?

No — `SxNotification` is an inline, in-flow component. For stacked global toasts use a dedicated toast/message implementation.
