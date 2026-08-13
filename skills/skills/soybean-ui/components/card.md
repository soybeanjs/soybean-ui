# Card

Source URL: https://ui.soybeanjs.cn/components/card
Markdown URL: https://ui.soybeanjs.cn/components/card.md
Category: Data Display
Description: A container that groups related content and actions into a bordered, shadowed surface. `SCard` combines a `CardRoot`/`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription` family of headless primitives (zero styles) with the `cardVariants` style recipe (8 slots, 6 sizes, `scrollable`/`split` flags).

## Overview

A container that groups related content and actions into a bordered, shadowed surface. `SCard` combines a `CardRoot`/`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription` family of headless primitives (zero styles) with the `cardVariants` style recipe (8 slots, 6 sizes, `scrollable`/`split` flags).

Use it for dashboards, profile blocks, settings panels, or any content that benefits from a titled, sectioned container. Prefer `list` or `table` for repetitive data rows, and `popover`/`dialog` for floating or modal surfaces.

`SCard` aggregates the primitives through `CardCompact` and is **collapsible** by default — the content area animates open/closed and can be driven with `v-model:open`. For fully custom compositions, fall back to the headless `CardRoot`-family primitives.

## Usage

Usage examples for card are rendered on the site.

## Features

- 🧩 Headless/styled split — `CardCompact` aggregates the 8 primitives and exposes per-part `*Props`; `SCard` only injects styles and forwards slots/events
- 🧱 Composite structure — `header`/`title`/`description`/`content`/`footer` plus `title-leading`/`title-trailing`/`extra` slots
- 🔽 Collapsible — the content animates open/closed (`CollapsibleRoot`/`CollapsibleContent`), controlled with `v-model:open`/`defaultOpen`
- ➗ Split sections — `split` adds `divide-y` dividers between title/content/footer
- 📜 Scrollable content — `scrollable` makes the content area scroll when it exceeds the card height
- 🎨 6 sizes — xs–2xl `size` matching `ThemeSize`
- 🎛️ Per-part control — `title`/`description` as props or slots; `headerProps`/`contentProps`/`footerProps`/`titleProps` forwarded to each part
- ♿ Accessible by default — title renders as a real `<h3>`, the collapsible trigger exposes `aria-expanded`, and `axe-core` reports zero violations

## Component family

- `SCard` (styled) — the entry wrapper; `cardVariants` recipe with dynamic slot forwarding
- `CardRoot` (headless) — the collapsible container; owns the `open` state via `CollapsibleRoot`
- `CardHeader` (headless) — the top section hosting title/description/extra
- `CardTitleRoot` / `CardTitle` (headless) — the title row and the `<h3>` heading
- `CardDescription` (headless) — the muted description under the title
- `CardContent` (headless) — the main body; a `CollapsibleContent` (animates + focusable)
- `CardFooter` (headless) — the bottom actions area
- `CardCollapsibleTrigger` (headless) — a collapsible trigger bound to the card state
- `CardCompact` (headless) — the aggregated composite; composes header/content/footer and the default title/description

## Demos

Interactive demos for card are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (10): Card, CardCollapsibleTrigger, CardCompact, CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle, CardTitleRoot.

### Card

#### Props

Properties for the Card component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CardUi>`; optional)
- `scrollable`: If true, the content will be scrollable when the root has height and content is taller than the root (type `boolean`; default `false`; optional)
- `split`: If true, the card will add divider between title and content and footer (type `boolean`; default `false`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CardHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `CardContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `CardFooterProps`; optional)
- `titleRootProps`: Properties forwarded to the title root element. (type `CardTitleRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `CardTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `CardDescriptionProps`; optional)
- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the Card component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

#### Slots

Slots for the Card component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `title-leading`: Custom content for the title leading slot. (type `(() => any) | undefined`)
- `title-trailing`: Custom content for the title trailing slot. (type `(() => any) | undefined`)
- `extra`: Custom content for the extra slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)

### CardCollapsibleTrigger

#### Props

Properties for the CardCollapsibleTrigger component.

- `disabledCollapsible`: When `true`, prevents the user from toggling the collapsible. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CardCompact

#### Props

Properties for the CardCompact component.

- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CardHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `CardContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `CardFooterProps`; optional)
- `titleRootProps`: Properties forwarded to the title root element. (type `CardTitleRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `CardTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `CardDescriptionProps`; optional)
- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the CardCompact component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

#### Slots

Slots for the CardCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `title-leading`: Custom content for the title leading slot. (type `(() => any) | undefined`)
- `title-trailing`: Custom content for the title trailing slot. (type `(() => any) | undefined`)
- `extra`: Custom content for the extra slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)

### CardContent

#### Props

Properties for the CardContent component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CardDescription

- No documented props, emits, slots, or slot props were available.

### CardFooter

- No documented props, emits, slots, or slot props were available.

### CardHeader

- No documented props, emits, slots, or slot props were available.

### CardRoot

#### Props

Properties for the CardRoot component.

- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the CardRoot component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

### CardTitle

- No documented props, emits, slots, or slot props were available.

### CardTitleRoot

- No documented props, emits, slots, or slot props were available.

## Notes

### Architecture and benchmark differences

`CardCompact` owns the structure orchestration (header/content/footer visibility, default title/description) while every primitive stays style-free and only the UI wrapper injects the `cardVariants` classes. This mirrors shadcn/ui's headless/styled split, unlike Ant Design, Element Plus, Mantine and Naive UI which ship a single styled card with `title`/`extra`/`actions` props. SoybeanUI makes the card **collapsible by default** through the `CollapsibleRoot` primitive, a deliberate extension most libraries do not offer on a card; `split` and `scrollable` are toggled via recipe variants rather than layout props.

| Capability                   | SoybeanUI | shadcn/ui | Ant Design Card | Element Plus Card | Mantine Card | Naive UI Card |
| :--------------------------- | :-------: | :-------: | :-------------: | :---------------: | :----------: | :-----------: |
| Headless/styled split        |    ✅     |    ✅     |        —        |         —         |      —       |       —       |
| Header / title / description |    ✅     |    ✅     |       ✅        |        ✅         |      ✅      |      ✅       |
| Footer                       |    ✅     |    ✅     |       ✅        |        ✅         |      ✅      |      ✅       |
| Extra (actions) slot         |    ✅     |     —     |       ✅        |        ✅         |      ✅      |      ✅       |
| Collapsible content          |    ✅     |     —     |        —        |         —         |      —       |       —       |
| Split / divider              |    ✅     |     —     |       ✅        |        ✅         |      ✅      |       —       |
| Scrollable content           |    ✅     |     —     |       ✅        |         —         |      —       |      ✅       |
| Size variants (6)            |    ✅     |     —     |       ✅        |        ✅         |      ✅      |      ✅       |
| Per-part `*Props` channels   |    ✅     |    ✅     |        —        |         —         |      —       |       —       |

`—` = unsupported or a different interaction model.

### Cautions

- The card is collapsible and defaults to open (`defaultOpen: true`). When collapsed, the content (and footer) is removed from the flow; footer visibility depends on the open state.
- `CardTitle` renders a fixed `<h3>`. If your page's heading hierarchy differs, wrap or restyle the title so it does not skip levels.
- `CardContent` carries `tabindex="-1"` (from `CollapsibleContent`) so it can receive focus for scrolling; it is not an interactive control by itself.
- `split` applies `divide-y`; combine it with a `size` to control the vertical rhythm. `scrollable` only takes effect when the card has a constrained height.
- The content padding adjusts automatically based on `data-header-visible`/`data-footer-visible` (and the collapsible `data-state`) so a bare content-only card still looks balanced.

### Roadmap

No blocking gaps identified for the core card API. A `card`-level interactive action bar / `CardActions` shortcut and hover-lift style variants are evaluated enhancements tracked in `docs/roadmap.md`.

## FAQ

### How do I build a card with a title and description?

Pass `title`/`description` props (or the matching slots):

```vue
<p>Body content</p>
```

### How do I add actions to the header?

Use the `extra` slot (or `title-leading`/`title-trailing` around the title):

```vue
<template #extra><SButton variant="pure">Edit</SButton></template>
<p>Body content</p>
```

### How do I make a collapsible card?

Bind `open` with `v-model` (or set `default-open`):

```vue
<p>This content can collapse.</p>
```

### How do I make the content scrollable?

Keep the card height constrained and set `scrollable`:

```vue
<p v-for="i in 50" :key="i">Row {{ i }}</p>
```

### How do I split the sections with dividers?

Set `split` to add `divide-y` dividers between header/content/footer:

```vue
<template #footer><SButton>Save</SButton></template>
<p>Body content</p>
```
