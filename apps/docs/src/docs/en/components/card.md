# Card

## Overview

A container that groups related content and actions into a bordered, shadowed surface. `SCard` combines a `CardRoot`/`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription` family of headless primitives (zero styles) with the `cardVariants` style recipe (8 slots, 6 sizes, `scrollable`/`split` flags).

Use it for dashboards, profile blocks, settings panels, or any content that benefits from a titled, sectioned container. Prefer `list` or `table` for repetitive data rows, and `popover`/`dialog` for floating or modal surfaces.

`SCard` aggregates the primitives through `CardCompact` and is **collapsible** by default — the content area animates open/closed and can be driven with `v-model:open`. For fully custom compositions, fall back to the headless `CardRoot`-family primitives.

## Usage

<UsageCode component="card" />

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

<PlaygroundGallery component="card" />

## API

<ComponentApi component="card" />

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
<SCard title="Settings" description="Manage your preferences">
  <p>Body content</p>
</SCard>
```

### How do I add actions to the header?

Use the `extra` slot (or `title-leading`/`title-trailing` around the title):

```vue
<SCard title="Profile">
  <template #extra><SButton variant="pure">Edit</SButton></template>
  <p>Body content</p>
</SCard>
```

### How do I make a collapsible card?

Bind `open` with `v-model` (or set `default-open`):

```vue
<SCard v-model:open="open" title="Collapsible">
  <p>This content can collapse.</p>
</SCard>
```

### How do I make the content scrollable?

Keep the card height constrained and set `scrollable`:

```vue
<SCard scrollable class="h-80" title="Long list">
  <p v-for="i in 50" :key="i">Row {{ i }}</p>
</SCard>
```

### How do I split the sections with dividers?

Set `split` to add `divide-y` dividers between header/content/footer:

```vue
<SCard split title="Divided">
  <template #footer><SButton>Save</SButton></template>
  <p>Body content</p>
</SCard>
```
