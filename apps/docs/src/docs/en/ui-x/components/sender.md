# Sender

## Overview

`SxSender` is the AI composer input — a rich textarea with optional attachments, slash (`/`) command suggestions and mention (`@`) suggestions. It submits the typed text and delegates suggestion filtering/selection to the `useSender` composable.

Use it as the main input in a chat interface, paired with `SxBubbleList` (which displays the messages) and `SxAttachments` (which renders the attachment previews above the textarea). `SxAttachments` is used internally when `attachments` are provided.

## Usage

<UsageCode component="sender" />

## Features

- 📝 Rich textarea — configurable `rows` and `placeholder`, with `disabled` / `loading` states
- 📎 Attachment support — renders file previews above the input with `removeAttachment` emit
- ⚡ Slash commands — `/` triggers a suggestion popover (`slashSuggestions`), filtered by typed query
- 📢 Mentions — `@` triggers a suggestion popover (`mentionSuggestions`), filtered by typed query
- ⌨️ Keyboard driven — `Enter` submits (`shiftEnter` requires Ctrl+Enter); `Escape` closes suggestions
- 🧩 Three slots — `actions` (left of submit), `submit-icon`, `suggestion` (customizes individual items)
- 🚦 CanSubmit guard — `loading` and `disabled` disable the submit button; empty text also blocks submission
- 🔒 Type safe — `SenderSuggestion` / `Attachment` / `Attachment[]` types, with `SenderSuggestion` exported from the UI-X composables sub-path

## Demos

<PlaygroundGallery component="sender" />

## API

<ComponentApi component="sender" />

## Notes

### Architecture and benchmark differences

`SxSender` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: suggestion detection, filtering and selection are delegated to the `useSender` composable from `@soybeanjs/ui-x`, and attachment rendering is delegated to the sibling `SxAttachments` component. The SFC only wires the `senderVariants` recipe, keyboard handling (`Enter` / `Escape`), the submit guard and slot forwarding. The `useSender` composable scans the last 32 characters of the input for a trigger character (`/` or `@`) preceded by whitespace or start-of-string, making detection fast and SSR-safe.

| Capability                               | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--------------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Rich textarea with submit                |     ✅      |       —       |    ✅     |       ✅        |
| Slash command suggestions                |     ✅      |       —       |     —     |        —        |
| Mention suggestions                      |     ✅      |       —       |     —     |        —        |
| Attachment preview                       |     ✅      |       —       |     —     |       ✅        |
| `Enter` / `Ctrl+Enter` submit            |     ✅      |       —       |    ✅     |       ✅        |
| Headless composable for suggestion logic |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- `loading` disables the submit button and prevents submission, but does not clear the textarea — the user can still edit while waiting.
- `removeAttachment` fires when the `SxAttachments` component emits a remove event. Manage the `attachments` array yourself (the sender does not mutate it).
- `mentionSuggestions` and `slashSuggestions` are filtered by a case-insensitive match against `label` and `key`. When the input is empty after the trigger character, all suggestions are shown.
- The trigger detection only looks at the last 32 characters — a `/` or `@` earlier in the text is ignored. This keeps the composable fast and prevents false positives from pasted content.

## FAQ

### How do I submit on Ctrl+Enter instead of plain Enter?

Set `submit-type="shiftEnter"` — then plain Enter inserts a newline and Ctrl+Enter submits.

### How do I add a custom action button (e.g. upload)?

Use the `actions` slot — it renders in the left action area of the sender. Wire your own upload button or file picker there.

### How do I handle attachments?

Pass an `Attachment[]` array to `attachments` and listen to `removeAttachment` to keep your array in sync. See the 03-with-attachments demo.

### How do I show a loading state while the AI responds?

Set `loading` — the submit button is disabled and the textarea stays editable. Combine with `SxBubble`'s `loading` prop on the latest assistant message.

### How do I customise the suggestion list items?

Use the `suggestion` slot — it receives `{ suggestion }` (a `SenderSuggestion` with `key`, `label`, `description` and `icon`) so you can render a custom layout.

### How do I reset the sender after a successful submit?

The sender already clears its value and closes the suggestion popover on submit. No extra action is needed.
