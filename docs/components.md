# @soybeanjs/ui — Component Roadmap

> Inventory of components not yet implemented in `@soybeanjs/ui`, evaluated against 14 mainstream UI libraries (10k+ GitHub stars) and prioritised to guide the implementation roadmap.

## Methodology

1. **Surveyed libraries (14 total)** — React: MUI, Ant Design, Mantine, Chakra UI, shadcn/ui, Radix UI, Headless UI, PrimeReact, MUI Base. Vue: Element Plus, Naive UI, Vuetify, Quasar, PrimeVue, Arco Design, TDesign, Vant, Varlet.
2. **Diffed** against the 88 component groups already shipped in `packages/ui/src/index.ts`.
3. **Desktop-only scope** — all mobile-specific components (Vant/Varlet-originated patterns) are excluded from the active roadmap.
4. **Selection criteria** — each candidate is evaluated on:
   - **Functional independence** — does it have a single, focused responsibility?
   - **Reusability** — can it stand alone without requiring extensive composition of other atomic components?
   - **Demand** — number of surveyed libraries that ship the component (consensus signal).
   - **Alignment** — fit with the project's desktop-first, headless/styled, enterprise-oriented identity (comparable to shadcn/ui).
   - **Effort** — estimated implementation cost (Low / Medium / High).
5. **Marketplace deferral** — components that require extensive combination of atomic components AND have limited use cases are deferred to a future source-code-distribution component marketplace (see [Component Marketplace](#component-marketplace--deferred)).
6. **Priority** assigned on a 4-tier scale (see legend below).

### Priority Legend

| Tier | Label    | Meaning                                                                               |
| :--: | :------- | :------------------------------------------------------------------------------------ |
|  P0  | Critical | Table-stakes gap, broad consensus (6+ libraries), low–medium effort. Implement first. |
|  P1  | High     | Strong demand (4+ libraries) or enterprise-critical. Implement in the next milestone. |
|  P2  | Medium   | Useful, moderate demand. Schedule when capacity allows.                               |
|  P3  | Low      | Niche but functionally independent. Park / opportunistic.                             |

### Coverage Snapshot

- **Already shipped:** 88 component groups (`accordion` … `watermark`).
- **Active roadmap below:** 45 components (single-focused, desktop-oriented).
- **Already implemented references retained here:** `Rating` (historical P0 entry) and `ButtonGroup` (see [Implemented Component Reference](#implemented-component-reference)).
- **Marketplace deferred:** 12 components (composite/niche — deferred to source-code marketplace).
- **Out of scope:** 60+ candidates rejected (mobile-only, redundant, business-specific, charting, directives).

### Evaluation Template

Each active component is documented with:

- **Purpose** — what problem it solves, in one sentence.
- **Functionality** — key features and behaviours.
- **Implementation considerations** — headless layer needs, UI layer needs, dependencies, and applicable patterns from the component development skill.
- **Cross-library reference** — which surveyed libraries ship it.

---

## P0 — Critical

Universal or near-universal components leaving a clear gap. There are 9 active
P0 items; the shipped Rating entry is retained below as historical context.

### Summary

|  #  | Component          | Demand | Effort  |
| :-: | :----------------- | :----: | :-----: |
|  1  | `Rating` (shipped) | 10/14  |   Low   |
|  2  | `Upload`           | 12/14  |  High   |
|  3  | `Timeline`         | 10/14  | Medium  |
|  4  | `Typography`       |  7/14  | Medium  |
|  5  | `Descriptions`     |  4/14  | Medium  |
|  6  | `TreeSelect`       |  7/14  | Medium  |
|  7  | `Statistic`        |  6/14  |   Low   |
|  8  | `Ellipsis`         |  5/14  | Low-Med |
|  9  | `Code`             |  5/14  | Medium  |
| 10  | `Image`            |  8/14  | Medium  |

### Detailed Entries

---

#### 1. `Rating` — ✅ shipped (historical P0 entry)

> `Rating` is exported from `@soybeanjs/ui` as `SRating` and is excluded from
> the active roadmap count. The original evaluation is retained for traceability;
> current delivery-surface consistency is tracked in
> [the architecture assessment](./optimize.md#f3-生成物不是原子批次已有可复现漂移).

**Purpose:** Allow users to provide a rating using stars (or custom icons) on a discrete scale.

**Functionality:**

- Hover/focus preview of the selected value.
- Half-star (or fractional) precision support.
- Keyboard navigation (arrow keys to increment/decrement).
- Read-only mode for display.
- Customisable icon, count, and colour.
- Clear button (reset to zero).

**Implementation considerations:**

- **Headless:** `RatingRoot` + `RatingItem` — manages value state, hover preview, keyboard logic, ARIA (`role="slider"`, `aria-valuenow`). Single-class or minimal-slot pattern.
- **UI:** `cv()` recipe with `size`, `color`, `variant` (filled/outline), `readOnly` axes. Reuse `icon` slot for custom glyphs.
- **Dependencies:** None.
- **Patterns:** Single-class component — use `ratingVariants({...}, props.class)` directly; no `UiContext` needed.

**Cross-library:** MUI, Ant Design, Mantine, Element Plus, Naive UI, PrimeVue, Vuetify, Quasar, Vant, Varlet.

---

#### 2. `Upload` — P0 | Demand: 12/14 | Effort: High

**Purpose:** Let users select, preview, and upload files with progress feedback.

**Functionality:**

- File selection via button click or drag-and-drop.
- Multiple file support with configurable count/size limits.
- File list with preview (images), name, size, status, and remove action.
- Upload progress bar per file.
- Abort/retry individual uploads.
- Custom request adapter (XHR, fetch, or third-party storage).
- Drag-over visual feedback.
- Avatar upload mode (single image, square/circle crop).
- Accept attribute filtering by extension/MIME.

**Implementation considerations:**

- **Headless:** `UploadRoot` + `UploadDropzone` + `UploadFileList` + `UploadFileItem` + `UploadTrigger`. Multi-slot pattern with `UiContext`. Owns file state, validation, drag events, and the request lifecycle. Expose `customRequest` prop for adapter injection.
- **UI:** `scv()` recipe with slots (`root`, `dropzone`, `trigger`, `fileList`, `fileItem`, `progress`). Variants: `type` (select/drag/avatar), `listType` (text/image).
- **Dependencies:** Reuse `progress`, `button`, `tag` (for file status). Optional `tooltip` for error messages.
- **Patterns:** Multi-slot base component — `provideUploadUi(ui)` + `useUploadUi(slot)`. Consider a Compact aggregation (`UploadCompact`) for the common drag+list+progress composite.

**Cross-library:** Ant Design, Mantine, Element Plus, Naive UI, Arco, TDesign, PrimeVue, Vuetify, Quasar, Vant, Varlet, PrimeReact.

---

#### 3. `Timeline` — P0 | Demand: 10/14 | Effort: Medium

**Purpose:** Display a chronological sequence of events with markers along a vertical or horizontal axis.

**Functionality:**

- Vertical (default) and horizontal orientation.
- Alternate (left/right) item placement.
- Customisable dot/marker per item (icon, colour).
- Item with timestamp, title, description, and optional extra content.
- Reverse mode (newest first or last).

**Implementation considerations:**

- **Headless:** `TimelineRoot` + `TimelineItem` + `TimelineDot` + `TimelineContent` + `TimelineSeparator`. Multi-slot; owns item registration and orientation context.
- **UI:** `scv()` recipe with slots (`root`, `item`, `separator`, `dot`, `content`). Variants: `mode` (left/alternate/right), `orientation` (horizontal/vertical).
- **Dependencies:** `icon` for custom markers.
- **Patterns:** Multi-slot — `provideTimelineUi(ui)`. Items are declarative children, no Compact aggregation needed.

**Cross-library:** MUI (Lab), Ant Design, Mantine, Element Plus, Naive UI, Arco, TDesign, PrimeVue, Vuetify, Quasar.

---

#### 4. `Typography` — P0 | Demand: 7/14 | Effort: Medium

**Purpose:** Provide a family of styled text primitives (Title, Paragraph, Text) with consistent typography scales and semantic HTML.

**Functionality:**

- `TypographyTitle` (h1–h6) with heading level prop.
- `TypographyParagraph` with copyable, editable, ellipsis support.
- `TypographyText` with variant (secondary, success, warning, danger), mark, code, underline, delete, strong.
- Heading size independent of semantic level.
- Copy-to-clipboard integration.
- Ellipsis with tooltip expansion (delegates to `Ellipsis`).

**Implementation considerations:**

- **Headless:** `TypographyRoot` (context provider for scale) + `TypographyTitle` + `TypographyParagraph` + `TypographyText`. Each is a lightweight SFC; `polymorphic as` prop for semantic tag override.
- **UI:** `scv()` recipe per sub-component. Variants: `level` (1–6 for title), `type` (default/secondary/success/warning/danger), `size`.
- **Dependencies:** `clipboard` (for copyable), `tooltip` (for ellipsis), `editable` (for editable paragraph).
- **Patterns:** Multi-slot family — `provideTypographyUi(ui)`. Each sub-component reads context for consistent scale.

**Cross-library:** MUI, Ant Design, Mantine, Chakra UI, shadcn/ui, Element Plus, Naive UI, Arco, TDesign.

---

#### 5. `Descriptions` — P0 | Demand: 4/14 | Effort: Medium

**Purpose:** Display a structured list of key-value pairs (field labels and values) in a responsive grid layout.

**Functionality:**

- Configurable column count (responsive breakpoints).
- Vertical or horizontal layout (label position: top/left/right).
- Bordered (table-style) and borderless variants.
- Item span control (colspan/rowspan).
- Title and extra slot for header actions.
- Size variants.

**Implementation considerations:**

- **Headless:** `DescriptionsRoot` + `DescriptionsItem`. Root owns column calculation and responsive breakpoints; items register their label/value/span.
- **UI:** `scv()` recipe with slots (`root`, `item`, `label`, `content`). Variants: `border` (true/false), `layout` (horizontal/vertical), `labelAlign` (left/right/center).
- **Dependencies:** None (pure layout).
- **Patterns:** Multi-slot — `provideDescriptionsUi(ui)`. Items are declarative; root computes grid from registered items.

**Cross-library:** Ant Design, Naive UI, Arco, TDesign.

---

#### 6. `TreeSelect` — P0 | Demand: 7/14 | Effort: Medium

**Purpose:** Combine tree-structured data navigation with a select trigger, allowing users to pick a node from a hierarchy.

**Functionality:**

- Single and multiple selection modes.
- Checkable nodes (with parent-child cascade in multi-mode).
- Async/lazy loading of tree nodes.
- Search/filter within the tree.
- Virtual scrolling for large trees (reuse `virtualizer`).
- Customisable node rendering.
- Expand/collapse with keyboard navigation.
- `value`/`label` display in the trigger.

**Implementation considerations:**

- **Headless:** `TreeSelectRoot` + `TreeSelectTrigger` + `TreeSelectContent` + `TreeSelectTree` + `TreeSelectNode`. Composes `tree` logic inside a `popover`/`combobox`-style trigger. Reuse `useTreeState` composable from the existing `tree` component.
- **UI:** `scv()` recipe with slots (`root`, `trigger`, `content`, `node`). Variants: `size`, `color`, `multiple`, `checkable`.
- **Dependencies:** `tree` (headless logic), `popover` (positioning), `virtualizer` (optional, for large lists).
- **Patterns:** Multi-slot — `provideTreeSelectUi(ui)`. Consider Compact aggregation (`TreeSelectCompact`) that wires trigger + tree + virtualizer.

**Cross-library:** Ant Design, Mantine, Element Plus, Naive UI, Arco, TDesign, PrimeVue.

---

#### 7. `Statistic` — P0 | Demand: 6/14 | Effort: Low

**Purpose:** Display a single labelled numeric value with optional prefix, suffix, and formatting.

**Functionality:**

- Label, value, prefix (icon/text), suffix (unit).
- Value formatting (decimal places, thousands separator).
- Optional trend indicator (up/down with percentage).
- Loading state.
- Integration with `NumberAnimation` for count-up effect.

**Implementation considerations:**

- **Headless:** `StatisticRoot` + `StatisticLabel` + `StatisticValue` + `StatisticPrefix` + `StatisticSuffix`. Lightweight; value formatting delegated to a pure util.
- **UI:** `cv()` / `scv()` recipe. Variants: `size`, `trend` (up/down/none).
- **Dependencies:** `icon` (for trend arrow), optional `NumberAnimation` (for animated value).
- **Patterns:** Multi-slot — `provideStatisticUi(ui)`. Value formatting as a shared pure function in `packages/headless/src/shared/`.

**Cross-library:** Ant Design, Chakra UI (`Stat`), Element Plus, Naive UI, Arco, TDesign.

---

#### 8. `Ellipsis` — P0 | Demand: 5/14 | Effort: Low-Medium

**Purpose:** Truncate text to a configurable number of lines and reveal full content on hover via a tooltip.

**Functionality:**

- Line-clamp (1–N lines) using CSS `-webkit-line-clamp`.
- Tooltip expansion when text is actually overflowed (only show tooltip if content exceeds the clamp).
- Expandable mode (click to expand/collapse the full text).
- Suffix slot (e.g. "…more" link).

**Implementation considerations:**

- **Headless:** `EllipsisRoot` — manages overflow detection (ResizeObserver / DOM measurement), expanded state, and tooltip visibility logic.
- **UI:** `cv()` recipe. Variants: `lines` (number), `expandable` (boolean), `tooltip` (boolean).
- **Dependencies:** `tooltip` (for overflow popup).
- **Patterns:** Single-class or minimal-slot. Overflow detection is a reusable composable (`useOverflow`) placed in `packages/headless/src/composables/`.

**Cross-library:** Naive UI, Arco, Vant, Varlet, Mantine (`Spoiler`-adjacent).

---

#### 9. `Code` — P0 | Demand: 5/14 | Effort: Medium

**Purpose:** Render a code block with syntax highlighting, optional line numbers, and a copy button.

**Functionality:**

- Syntax highlighting for configurable languages.
- Line numbers toggle.
- Copy-to-clipboard button.
- Inline code variant (single-line, inline).
- Max-height with scroll for long blocks.
- Theme (light/dark) following the config-provider.

**Implementation considerations:**

- **Headless:** `CodeRoot` + `CodeCopy` — manages copy state and line-number generation. Syntax highlighting delegated to a pluggable highlighter (Shiki / highlight.js / Prism) injected via prop or context.
- **UI:** `scv()` recipe with slots (`root`, `code`, `copyButton`, `lineNumbers`). Variants: `variant` (block/inline), `theme` (light/dark).
- **Dependencies:** `clipboard` (for copy button). External highlighter is a peer dependency (do not bundle).
- **Patterns:** Multi-slot — `provideCodeUi(ui)`. Highlighter injection via a `provideHighlighter()` context so users choose their own library.

**Cross-library:** Mantine, Chakra UI, Naive UI, Varlet, shadcn/ui (Typography prose).

---

#### 10. `Image` — P0 | Demand: 8/14 | Effort: Medium

**Purpose:** Display an image with built-in fallback, loading state, and optional preview/zoom.

**Functionality:**

- Loading placeholder (spinner or skeleton).
- Error fallback (broken image placeholder).
- Preview/zoom on click (opens a full-screen viewer).
- Fit mode (cover, contain, fill).
- Placeholder slot while loading.
- Configurable preview toolbar (zoom, rotate, download).

**Implementation considerations:**

- **Headless:** `ImageRoot` — manages `loadingStatus` (`idle`/`loading`/`loaded`/`error`), preview open state, and zoom/rotate state. Reuse `useImageLoadingStatus` pattern.
- **UI:** `cv()` recipe for the image itself; `scv()` for the preview overlay. Variants: `fit` (cover/contain/fill), `preview` (boolean), `rounded`.
- **Dependencies:** `spinner` or `skeleton` (for loading), `dialog`/`popover` (for preview overlay — reuse overlay primitives).
- **Patterns:** Minimal-slot for the base image; the preview viewer is a separate `ImagePreview` component that can be used standalone.

**Cross-library:** Ant Design, Mantine, Chakra UI, shadcn/ui, Element Plus, Vuetify, Quasar, PrimeVue, Arco, TDesign.

---

## P1 — High

Strong demand or enterprise-critical; schedule for the next milestone.

### Summary

|  #  | Component         | Demand | Effort |
| :-: | :---------------- | :----: | :----: |
| 11  | `Transfer`        |  6/14  |  High  |
| 12  | `QRCode`          |  3/14  |  Low   |
| 13  | `Result`          |  4/14  |  Low   |
| 14  | `Countdown`       |  3/14  |  Low   |
| 15  | `NumberAnimation` |  2/14  |  Low   |
| 16  | `InfiniteScroll`  |  4/14  | Medium |
| 17  | `Mention`         |  4/14  |  High  |
| 18  | `AvatarGroup`     |  6/14  |  Low   |
| 19  | `RangeSlider`     |  5/14  | Medium |
| 20  | `Space`           |  5/14  |  Low   |
| 21  | `SplitButton`     |  4/14  | Medium |
| 22  | `Fieldset`        |  5/14  |  Low   |
| 23  | `InputMask`       |  3/14  | Medium |

### Detailed Entries

---

#### 11. `Transfer` — P1 | Demand: 6/14 | Effort: High

**Purpose:** Move items between two lists (source and target) with optional filtering and batch operations.

**Functionality:**

- Dual-list layout with transfer buttons (→, ←, ⇒, ⇐).
- Single and multiple selection.
- Search/filter per panel.
- Disabled items and one-way restriction.
- Custom item rendering.
- Footer slot for batch actions.
- Data-source driven (array of `{ key, label, disabled }`).

**Implementation considerations:**

- **Headless:** `TransferRoot` + `TransferList` + `TransferItem` + `TransferOperations`. Root owns source/target state sets, selection state, and move operations.
- **UI:** `scv()` recipe with slots (`root`, `list`, `item`, `operations`, `footer`). Variants: `size`, `filterable`.
- **Dependencies:** `input` (for search), `button` (for operations), `checkbox` (for item selection), `tag` (for target count badge).
- **Patterns:** Multi-slot — `provideTransferUi(ui)`. Consider Compact aggregation (`TransferCompact`) wiring both lists + operations + search.

**Cross-library:** Ant Design, MUI, Element Plus, Naive UI, TDesign, PrimeReact (`PickList`).

---

#### 12. `QRCode` — P1 | Demand: 3/14 | Effort: Low

**Purpose:** Generate and render a QR code from a string value.

**Functionality:**

- Configurable size, colour, and background.
- Error correction level (L/M/Q/H).
- Optional icon/logo in the centre.
- Download as PNG/SVG.
- Value reactive (re-renders on change).

**Implementation considerations:**

- **Headless:** `QRCodeRoot` — pure rendering component; QR matrix generation delegated to a small utility (e.g. `qrcode` npm package). No complex state.
- **UI:** `cv()` recipe. Variants: `size`, `color`, `bgColor`, `level`.
- **Dependencies:** External `qrcode` library (peer dependency).
- **Patterns:** Single-class component. Render to `<canvas>` or `<svg>`.

**Cross-library:** Ant Design, Naive UI, TDesign.

---

#### 13. `Result` — P1 | Demand: 4/14 | Effort: Low

**Purpose:** Display a status page (success, error, warning, info, 404) with icon, title, description, and actions.

**Functionality:**

- Status presets: success, error, warning, info, 404, 403, 500.
- Custom icon slot.
- Title and subtitle/description.
- Extra content slot (actions, links).
- Responsive centre alignment.

**Implementation considerations:**

- **Headless:** `ResultRoot` + `ResultIcon` + `ResultTitle` + `ResultSubtitle`. Minimal logic — status drives icon/colour.
- **UI:** `cv()` recipe. Variants: `status` (success/error/warning/info/404/403/500).
- **Dependencies:** `icon` (for status icons).
- **Patterns:** Multi-slot — `provideResultUi(ui)`. Status-to-icon mapping table in the UI layer.

**Cross-library:** Ant Design, Arco, Naive UI, Varlet.

---

#### 14. `Countdown` — P1 | Demand: 3/14 | Effort: Low

**Purpose:** Display a live countdown timer to a target timestamp, updating every second/millisecond.

**Functionality:**

- Format: days/hours/minutes/seconds (configurable segments).
- Custom formatter function.
- On-finish callback.
- Pause/resume.
- Reactive target value.

**Implementation considerations:**

- **Headless:** `CountdownRoot` — uses `useIntervalFn` from VueUse (or internal rAF) to tick. Computes remaining time and emits `finish` event.
- **UI:** `cv()` recipe. Variants: `format` (HH:mm:ss / dd HH:mm:ss / custom), `size`.
- **Dependencies:** None (pure timer logic). Reuse `NumberAnimation` for digit-flip animation if desired.
- **Patterns:** Single-class component. Timer logic as a `useCountdown` composable in `packages/headless/src/composables/`.

**Cross-library:** Naive UI, Vant, Varlet.

---

#### 15. `NumberAnimation` — P1 | Demand: 2/14 | Effort: Low

**Purpose:** Animate a number from one value to another with easing, for dashboard/statistic displays.

**Functionality:**

- From/to values with easing function.
- Duration control.
- Decimal precision and locale formatting.
- On-start, on-finish, on-frame callbacks.
- Play/pause/replay.

**Implementation considerations:**

- **Headless:** `useNumberAnimation` composable — wraps `useTransition` or a rAF-based tween. Returns current animated value.
- **UI:** Minimal — a `<span>` that renders the formatted animated value. Variant: `format` (number/currency/percentage).
- **Dependencies:** None. Can be consumed by `Statistic` and `Countdown`.
- **Patterns:** Composable-first; the UI component is a thin wrapper. Place `useNumberAnimation` in `packages/headless/src/composables/`.

**Cross-library:** Naive UI (`NumberAnimation`), Varlet (`CountTo`).

---

#### 16. `InfiniteScroll` — P1 | Demand: 4/14 | Effort: Medium

**Purpose:** Automatically load more content when the user scrolls near the bottom of a container.

**Functionality:**

- IntersectionObserver-based bottom detection.
- Configurable distance threshold.
- Loading indicator slot.
- `hasMore` flag to stop loading.
- Load-more callback (`onLoadMore`).
- Reverse mode (load at top — for chat).

**Implementation considerations:**

- **Headless:** `InfiniteScrollRoot` — manages sentinel element, observer, loading state, and `hasMore` flag. Uses `useIntersectionObserver` from VueUse.
- **UI:** `cv()` recipe with a `loading` slot. Variants: `direction` (down/up).
- **Dependencies:** `spinner` (for loading indicator). Complements (but does not require) `virtualizer`.
- **Patterns:** Single-class wrapper. The sentinel observer logic is a `useInfiniteScroll` composable in `packages/headless/src/composables/`.

**Cross-library:** Element Plus, Vuetify, Quasar, Naive UI.

---

#### 17. `Mention` — P1 | Demand: 4/14 | Effort: High

**Purpose:** Provide an input that triggers a popup of suggestions when the user types `@` or a custom trigger character.

**Functionality:**

- Configurable trigger characters (`@`, `#`, `/`).
- Suggestion popup positioned at the caret.
- Async suggestion loading.
- Custom suggestion rendering (avatar + name).
- Multiple mentions and tag insertion.
- Keyboard navigation of suggestions.
- Value as plain text or structured mentions array.

**Implementation considerations:**

- **Headless:** `MentionRoot` + `MentionInput` + `MentionSuggestions` + `MentionItem`. Root owns the input value, caret position, trigger detection, and suggestion query. The popup reuses `popover` positioning.
- **UI:** `scv()` recipe with slots (`root`, `input`, `suggestions`, `item`). Variants: `size`, `placement`.
- **Dependencies:** `popover` (for suggestion positioning), `avatar` (optional, in suggestion items), `input`/`textarea` (as the base editor).
- **Patterns:** Multi-slot — `provideMentionUi(ui)`. Caret-position detection is the hard part — use a `useCaretPosition` composable.

**Cross-library:** Ant Design, Arco, Element Plus, Naive UI.

---

#### 18. `AvatarGroup` — P1 | Demand: 6/14 | Effort: Low

**Purpose:** Display a stack of overlapping avatars with a `+N` overflow indicator.

**Functionality:**

- Overlapping display with configurable spacing.
- Max visible count with `+N` overflow avatar.
- Hover to expand (z-index raise).
- Vertical and horizontal stacking.

**Implementation considerations:**

- **Headless:** `AvatarGroupRoot` — registers child avatars, computes overflow count, applies z-index ordering.
- **UI:** `cv()` recipe. Variants: `max` (number), `direction` (horizontal/vertical), `spacing`.
- **Dependencies:** `avatar` (wraps existing avatar component).
- **Patterns:** Multi-slot — `provideAvatarGroupUi(ui)`. Children are `avatar` components; group provides spacing/z-index context.

**Cross-library:** MUI, Ant Design, Mantine, PrimeVue, Arco, TDesign.

---

#### 19. `RangeSlider` — P1 | Demand: 5/14 | Effort: Medium

**Purpose:** Allow users to select a min/max range using two thumbs on a single track.

**Functionality:**

- Dual-thumb (min and max) interaction.
- Min/max bounds and step.
- Dragging the track between thumbs to move the range.
- Keyboard navigation for each thumb.
- Tooltip showing the current value on each thumb.
- Vertical and horizontal orientation.

**Implementation considerations:**

- **Headless:** `RangeSliderRoot` + `RangeSliderTrack` + `RangeSliderRange` + `RangeSliderThumb` + `RangeSliderStartThumb` + `RangeSliderEndThumb`. Closely follows the existing `slider` architecture but with two thumbs and a `value` of `[min, max]`.
- **UI:** `scv()` recipe — extends the `slider` recipe with dual-thumb slot classes.
- **Dependencies:** Reuse `slider` headless primitives where possible (pointer drag logic, ARIA slider pattern).
- **Patterns:** Multi-slot — `provideRangeSliderUi(ui)`. Share the `useSliderThumb` composable from the existing slider.

**Cross-library:** MUI, Mantine, Chakra UI, Vuetify, Quasar.

---

#### 20. `Space` — P1 | Demand: 5/14 | Effort: Low

**Purpose:** Provide a flexbox-based layout primitive that distributes spacing between children along a row or column.

**Functionality:**

- Direction (horizontal/vertical).
- Configurable gap size (mapped to `ThemeSize`).
- Alignment (start/center/end/between/around).
- Wrap control.
- Split (insert a spacer between specific children).

**Implementation considerations:**

- **Headless:** `SpaceRoot` — minimal; reads direction/align/wrap and provides them to the UI layer.
- **UI:** `cv()` recipe. Variants: `direction`, `align`, `gap` (ThemeSize), `wrap`.
- **Dependencies:** None.
- **Patterns:** Single-class component — `spaceVariants({...}, props.class)`. Maps to UnoCSS flex utilities (`flex`, `flex-col`, `gap-{size}`, `items-{align}`).

**Cross-library:** MUI, Mantine, Element Plus, Arco, TDesign.

---

#### 21. `SplitButton` — P1 | Demand: 4/14 | Effort: Medium

**Purpose:** Combine a primary button action with a dropdown of secondary actions.

**Functionality:**

- Primary button + dropdown trigger.
- Shared variant/size.
- Configurable dropdown menu items.
- Disabled state.
- Icon separator between primary and dropdown.

**Implementation considerations:**

- **Headless:** `SplitButtonRoot` + `SplitButtonPrimary` + `SplitButtonDropdown`. Composes `button` + `dropdown-menu`. Root provides shared variant context.
- **UI:** `scv()` recipe with slots (`root`, `primary`, `separator`, `trigger`). Variants: `size`, `color`, `variant`.
- **Dependencies:** `button` (primary action), `dropdown-menu` (secondary actions).
- **Patterns:** Multi-slot — `provideSplitButtonUi(ui)`. Thin wrapper over existing `dropdown-menu` trigger.

**Cross-library:** PrimeReact, MUI, Quasar (`ButtonDropdown`), Ant Design (`Button` with dropdown).

---

#### 22. `Fieldset` — P1 | Demand: 5/14 | Effort: Low

**Purpose:** Group related form fields with a labelled border (native `<fieldset>`/`<legend>` semantics).

**Functionality:**

- Native `<fieldset>` + `<legend>` rendering.
- Legend with optional icon and tooltip.
- Disabled state (propagates to children via context).
- Variant: bordered, borderless, emphasised.

**Implementation considerations:**

- **Headless:** `FieldsetRoot` + `FieldsetLegend` — provides a `disabled` context that form fields can consume.
- **UI:** `cv()` recipe. Variants: `variant` (default/borderless), `size`.
- **Dependencies:** None (semantic HTML).
- **Patterns:** Multi-slot — `provideFieldsetUi(ui)` + `provideFieldsetContext()` for disabled propagation. Uses native `<fieldset>`/`<legend>` elements.

**Cross-library:** Mantine, Headless UI, PrimeReact, Naive UI, HTML standard.

---

#### 23. `InputMask` — P1 | Demand: 3/14 | Effort: Medium

**Purpose:** Constrain and format user input against a mask pattern (e.g. phone, date, card number).

**Functionality:**

- Mask pattern with literal and placeholder characters.
- Configurable placeholder character.
- Reactive value (masked and unmasked).
- Keep-literals option (strip or retain separators on blur).
- Paste handling.
- Custom format function.

**Implementation considerations:**

- **Headless:** `InputMaskRoot` — wraps the existing `input`; intercepts `keydown`, `input`, `paste`, and `blur` events to apply/strip the mask. Mask logic is a pure function in `packages/headless/src/shared/`.
- **UI:** Reuses the `input` recipe; adds `mask` and `placeholderChar` props.
- **Dependencies:** `input` (base component).
- **Patterns:** Single-class wrapper over `input`. Mask logic (`applyMask`, `stripMask`) as shared pure functions. Consider a `useInputMask` composable.

**Cross-library:** PrimeReact (`InputMask`), Mantine (`MaskInput`), Ant Design (pattern).

---

## P2 — Medium

Useful and present in several libraries; implement when capacity allows.

### Summary

|  #  | Component              | Demand | Effort  |
| :-: | :--------------------- | :----: | :-----: |
| 24  | `CurrencyInput`        |  2/14  | Medium  |
| 25  | `TriStateCheckbox`     |  4/14  |   Low   |
| 26  | `VisuallyHidden`       |  4/14  |   Low   |
| 27  | `Banner`               |  4/14  | Low-Med |
| 28  | `Backdrop`             |  4/14  |   Low   |
| 29  | `LoadingBar`           |  4/14  | Medium  |
| 30  | `FloatingActionButton` |  5/14  | Medium  |
| 31  | `InputGroup`           |  3/14  | Medium  |
| 32  | `Dropzone`             |  3/14  | Medium  |
| 33  | `Masonry`              |  3/14  | Medium  |
| 34  | `NativeSelect`         |  3/14  |   Low   |

### Detailed Entries

---

#### 24. `CurrencyInput` — P2 | Demand: 2/14 | Effort: Medium

**Purpose:** Numeric input that formats its display as a locale-aware currency value.

**Functionality:**

- Currency symbol and position (prefix/suffix) based on locale.
- Thousands separator and decimal places.
- Min/max validation.
- Negative value handling.
- Value emitted as a number (not a formatted string).

**Implementation considerations:**

- **Headless:** Extends `input-number` with a currency formatter. Uses `Intl.NumberFormat` for formatting.
- **UI:** Reuses `input-number` recipe; adds `currency` and `locale` props.
- **Dependencies:** `input-number` (base component).
- **Patterns:** Variant of `input-number` — can be implemented as a prop on `input-number` (`type="currency"`) or a separate component.

**Cross-library:** Mantine (`NumberInput` with currency formatter), Ant Design (via `InputNumber` formatter).

---

#### 25. `TriStateCheckbox` — P2 | Demand: 4/14 | Effort: Low

**Purpose:** Checkbox that supports three states: checked, unchecked, and indeterminate.

**Functionality:**

- Indeterminate visual state (dash icon).
- Value as `boolean | 'indeterminate'`.
- Click cycles: unchecked → checked → indeterminate (configurable).
- ARIA `aria-checked="mixed"` for indeterminate.
- Disabled state.

**Implementation considerations:**

- **Headless:** Extends `checkbox` headless — adds `'indeterminate'` to the value union type and the cycle logic.
- **UI:** Extends `checkbox` recipe — adds an indeterminate icon variant.
- **Dependencies:** `checkbox` (base component), `icon` (dash icon).
- **Patterns:** Extension of `checkbox`. Can be a prop (`indeterminate`) on the existing `checkbox` rather than a separate component.

**Cross-library:** PrimeReact (`TriStateCheckbox`), Ant Design/Element Plus/Naive UI (indeterminate prop).

---

#### 26. `VisuallyHidden` — P2 | Demand: 4/14 | Effort: Low

**Purpose:** Render content that is visually hidden but accessible to screen readers.

**Functionality:**

- Content rendered in a 1px clipped container.
- Screen-reader-only text.
- No visual footprint.

**Implementation considerations:**

- **Headless:** Pure presentational — no state. Uses the standard `.sr-only` CSS pattern.
- **UI:** Single UnoCSS class set (`sr-only`). No variants.
- **Dependencies:** None.
- **Patterns:** Single-class component. Can also be a utility class exported from the CSS layer.

**Cross-library:** Mantine, Chakra UI, Radix UI, shadcn/ui.

---

#### 27. `Banner` — P2 | Demand: 4/14 | Effort: Low-Medium

**Purpose:** Display a persistent, dismissible message bar at the top of a page or section (distinct from transient toasts).

**Functionality:**

- Severity variants (info, success, warning, error).
- Title and description.
- Dismissible (close button) with `onClose`.
- Action slot (e.g. "Undo", "View details").
- Icon per severity.
- Sticky/full-width mode.

**Implementation considerations:**

- **Headless:** `BannerRoot` — manages dismiss state, severity context.
- **UI:** `cv()` recipe. Variants: `severity` (info/success/warning/error), `dismissible`.
- **Dependencies:** `icon` (severity icons), `button` (close/action).
- **Patterns:** Single-class or minimal-slot. Related to `alert` but persistent and page-level — not a transient notification.

**Cross-library:** Vuetify, Quasar, MUI (`Alert` banner mode), Ant Design (`Alert` with banner).

---

#### 28. `Backdrop` — P2 | Demand: 4/14 | Effort: Low

**Purpose:** Render a dimmed overlay behind modals/drawers, or as a standalone loading scrim.

**Functionality:**

- Configurable opacity and colour.
- Click-to-close (with `onClose`).
- Transition (fade).
- `invisible` mode (captures clicks without dimming).

**Implementation considerations:**

- **Headless:** `BackdropRoot` — manages open/transition state, click-outside detection.
- **UI:** `cv()` recipe. Variants: `opacity`, `color`, `invisible`.
- **Dependencies:** None (pure overlay). Can be used internally by `dialog`/`drawer` if they don't already have a backdrop slot.
- **Patterns:** Single-class component. Reuse the existing overlay/portal pattern from `dialog`.

**Cross-library:** MUI, Vuetify (`Overlay`), Mantine, Headless UI.

---

#### 29. `LoadingBar` — P2 | Demand: 4/14 | Effort: Medium

**Purpose:** Display an indeterminate progress bar fixed at the top of the viewport for route transitions or long-running tasks.

**Functionality:**

- Indeterminate animation (slide/shimmer).
- Programmatic `start()` / `finish()` / `error()` API (imperative, like a toast).
- Configurable colour and height.
- Reactive progress percentage (determinate mode).

**Implementation considerations:**

- **Headless:** `LoadingBarProvider` + `useLoadingBar()` composable — programmatic API similar to `useToast`. Manages a global loading bar instance.
- **UI:** `cv()` recipe. Variants: `position` (top/bottom), `color`, `indeterminate`.
- **Dependencies:** None. Reuse the `toast` provider pattern for the imperative API.
- **Patterns:** Provider + composable pattern — mirrors `provideToast()` / `useToast()`. Place `useLoadingBar` in `packages/headless/src/composables/`.

**Cross-library:** Quasar, Varlet, Naive UI, Mantine (`nprogress`).

---

#### 30. `FloatingActionButton` — P2 | Demand: 5/14 | Effort: Medium

**Purpose:** Render a circular, elevated action button that floats above content (typically bottom-right of a viewport/section).

**Functionality:**

- Icon-only or icon + label.
- Configurable position (top-right, bottom-right, etc.).
- Tooltip on hover.
- Expandable variant (click to reveal sub-actions).
- Shape: circle or rounded-rectangle.

**Implementation considerations:**

- **Headless:** `FabRoot` + `FabTrigger` + `FabActions` — the expandable variant reuses `popover`/`dropdown-menu` positioning.
- **UI:** `cv()` / `scv()` recipe. Variants: `shape` (circle/round), `position`, `size`, `color`.
- **Dependencies:** `button` (base styling), `icon`, `tooltip` (optional).
- **Patterns:** If non-expandable, it's a `button` variant. If expandable, it composes `dropdown-menu`.

**Cross-library:** MUI (`FAB`), Vuetify, Quasar, Naive UI (`FloatButton`), Varlet.

---

#### 31. `InputGroup` — P2 | Demand: 3/14 | Effort: Medium

**Purpose:** Combine an input with leading/trailing addons (icons, buttons, text, prefixes/suffixes).

**Functionality:**

- Leading and trailing addon slots.
- Addon as text, icon, or button.
- Connected (flush) or separated styling.
- Size inherits from the inner input.
- Disabled state propagation.

**Implementation considerations:**

- **Headless:** `InputGroupRoot` — provides size/disabled context to children. No complex state.
- **UI:** `scv()` recipe with slots (`root`, `input`, `addonBefore`, `addonAfter`). Variants: `size`, `variant` (connected/separated), `disabled`.
- **Dependencies:** `input`, `button`, `icon` (as addon children).
- **Patterns:** Multi-slot — `provideInputGroupUi(ui)` + context for size/disabled propagation.

**Cross-library:** shadcn/ui, Naive UI, Ant Design (`Input.Group`).

---

#### 32. `Dropzone` — P2 | Demand: 3/14 | Effort: Medium

**Purpose:** Provide a drag-and-drop area for file selection, usable standalone or as part of `Upload`.

**Functionality:**

- Drag-over visual feedback.
- Click to browse files.
- Multiple file support with type/size validation.
- Configurable accept filter.
- Disabled state.
- Dropzone text/icon customisation.

**Implementation considerations:**

- **Headless:** `DropzoneRoot` — manages drag state (`idle`/`dragOver`/`dropping`), file validation, and the hidden file input.
- **UI:** `scv()` recipe with slots (`root`, `icon`, `text`). Variants: `variant` (default/bordered/filled), `disabled`, `active` (drag-over).
- **Dependencies:** Can be consumed by `Upload` as the trigger area. Standalone use returns selected files via callback.
- **Patterns:** Multi-slot — `provideDropzoneUi(ui)`. Drag event handling as a `useDropzone` composable.

**Cross-library:** Mantine (`Dropzone`), shadcn/ui (Upload drag area), PrimeVue.

---

#### 33. `Masonry` — P2 | Demand: 3/14 | Effort: Medium

**Purpose:** Render a Pinterest-style masonry layout where items of varying heights are packed into columns.

**Functionality:**

- Configurable column count (responsive breakpoints).
- Gap control.
- Horizontal or vertical ordering.
- Item re-flow on resize.
- SSR-safe (renders without JS measurement, then reflows).

**Implementation considerations:**

- **Headless:** `MasonryRoot` + `MasonryItem` — root measures container width, computes column count, and distributes items. Uses `ResizeObserver` for re-flow.
- **UI:** `cv()` recipe. Variants: `columns` (number or responsive object), `gap`, `direction`.
- **Dependencies:** None.
- **Patterns:** Multi-slot — `provideMasonryUi(ui)`. Item distribution as a `useMasonry` composable (pure layout logic, no DOM coupling beyond measurement).

**Cross-library:** MUI, Ant Design (v6), Mantine.

---

#### 34. `NativeSelect` — P2 | Demand: 3/14 | Effort: Low

**Purpose:** Render a styled native `<select>` element for low-JS forms, SSR, and progressive enhancement.

**Functionality:**

- Native `<select>` with styled trigger.
- Options and optgroups.
- Multiple selection (native `multiple`).
- Size and variant matching the custom `select`.
- Form integration (native `name`/`value` submission).

**Implementation considerations:**

- **Headless:** `NativeSelectRoot` — thin wrapper around `<select>`; no popup logic.
- **UI:** `cv()` recipe. Variants: `size`, `color`, `variant`, `multiple`.
- **Dependencies:** `icon` (chevron indicator).
- **Patterns:** Single-class component. Complements (not replaces) the custom `select` which has full keyboard/ARIA popup logic.

**Cross-library:** shadcn/ui, Headless UI, MUI (native select mode).

---

## P3 — Low

Niche but functionally independent. Park or implement opportunistically.

### Summary

|  #  | Component         | Demand | Effort |
| :-: | :---------------- | :----: | :----: |
| 35  | `Equation`        |  1/14  | Medium |
| 36  | `NumberFormatter` |  1/14  |  Low   |
| 37  | `Marquee`         |  2/14  |  Low   |
| 38  | `GradientText`    |  1/14  |  Low   |
| 39  | `Highlight`       |  3/14  |  Low   |
| 40  | `Blockquote`      |  2/14  |  Low   |
| 41  | `Knob`            |  2/14  | Medium |
| 42  | `Signature`       |  2/14  | Medium |
| 43  | `Terminal`        |  2/14  | Medium |
| 44  | `OverflowList`    |  2/14  | Medium |
| 45  | `Indicator`       |  1/14  |  Low   |
| 46  | `Spoiler`         |  1/14  |  Low   |

### Detailed Entries

---

#### 35. `Equation` — P3 | Demand: 1/14 | Effort: Medium

**Purpose:** Render a mathematical equation using KaTeX.

**Functionality:** KaTeX rendering, block/inline mode, error fallback for invalid expressions.

**Implementation considerations:** Wraps KaTeX (`katex` npm package as peer dependency). Pure render — `equationRender(latex, options)` pure function. Variants: `block` (block/inline).

**Cross-library:** Naive UI.

---

#### 36. `NumberFormatter` — P3 | Demand: 1/14 | Effort: Low

**Purpose:** Format a number for display (locale, currency, percentage) without animation.

**Functionality:** `Intl.NumberFormat` wrapper, decimal precision, locale, currency code.

**Implementation considerations:** Pure function `formatNumber(value, options)` in `packages/headless/src/shared/`. UI is a `<span>`. Overlaps with `NumberAnimation` — consider merging as `NumberAnimation` with `animated={false}`.

**Cross-library:** Mantine (`NumberFormatter`).

---

#### 37. `Marquee` — P3 | Demand: 2/14 | Effort: Low

**Purpose:** Scroll content horizontally in a continuous loop (marquee effect).

**Functionality:** Direction (left/right), speed, pause on hover, duplicate content for seamless loop.

**Implementation considerations:** CSS animation (`@keyframes` via UnoCSS) + content duplication logic. `useMarquee` composable for pause-on-hover. Variants: `direction`, `speed`.

**Cross-library:** Mantine, Naive UI.

---

#### 38. `GradientText` — P3 | Demand: 1/14 | Effort: Low

**Purpose:** Render text with a CSS gradient fill.

**Functionality:** Gradient direction, colour stops, from/to props.

**Implementation considerations:** `background-clip: text` with UnoCSS utilities. Could be a `Typography` sub-component or a standalone. Variants: `gradient` (from/to colors), `direction`.

**Cross-library:** Naive UI.

---

#### 39. `Highlight` — P3 | Demand: 3/14 | Effort: Low

**Purpose:** Highlight occurrences of a query string within a body of text.

**Functionality:** Case-sensitive/insensitive match, custom highlight tag/class, multiple query terms.

**Implementation considerations:** Pure function `highlightSegments(text, query)` returning segments. UI renders `<mark>` for matches. Could be a `Typography` sub-component.

**Cross-library:** Naive UI, Mantine, Chakra UI.

---

#### 40. `Blockquote` — P3 | Demand: 2/14 | Effort: Low

**Purpose:** Render a styled quotation block with optional citation.

**Functionality:** Quote text, author/citation, variant (default/bordered).

**Implementation considerations:** Semantic `<blockquote>` + `<cite>`. Could be a `Typography` sub-component. Variants: `variant`, `size`.

**Cross-library:** Mantine, Naive UI.

---

#### 41. `Knob` — P3 | Demand: 2/14 | Effort: Medium

**Purpose:** Rotary input control for selecting a value by dragging around a circular dial.

**Functionality:** Min/max/step, value display, size, colour, read-only, keyboard (arrow keys rotate).

**Implementation considerations:** SVG or canvas arc rendering. Pointer drag → angle → value mapping. ARIA `role="slider"`. `useKnob` composable for angle/value logic. Variants: `size`, `color`.

**Cross-library:** Quasar, PrimeReact.

---

#### 42. `Signature` — P3 | Demand: 2/14 | Effort: Medium

**Purpose:** Capture a handwritten signature on a canvas.

**Functionality:** Canvas drawing, pen colour/width, clear, export as PNG/SVG/data-url, disabled, background colour.

**Implementation considerations:** `<canvas>` with pointer events (down/move/up). `useSignature` composable managing stroke paths. Export via `canvas.toDataURL()`. Variants: `penColor`, `backgroundColor`.

**Cross-library:** Vant, Varlet.

---

#### 43. `Terminal` — P3 | Demand: 2/14 | Effort: Medium

**Purpose:** Render console-style output with a prompt and command history.

**Functionality:** Command input line, output history, auto-scroll, custom prompt symbol, command callback.

**Implementation considerations:** `TerminalRoot` + `TerminalOutput` + `TerminalInput`. Manages command history array, auto-scroll to bottom on new output. Variants: `prompt` (symbol), `theme` (dark/light).

**Cross-library:** PrimeReact, PrimeVue.

---

#### 44. `OverflowList` — P3 | Demand: 2/14 | Effort: Medium

**Purpose:** Render a list of items that, when they exceed the container width, collapse the overflow into a "more" dropdown.

**Functionality:** Container measurement, item width measurement, overflow detection, "more" button with dropdown of hidden items, responsive re-flow on resize.

**Implementation considerations:** `OverflowListRoot` — uses `ResizeObserver` to measure container and children, computes which items fit, moves the rest to an overflow array. `useOverflow` composable. Reuses `dropdown-menu` for the overflow popup.

**Cross-library:** Mantine, Arco (`OverflowList`).

---

#### 45. `Indicator` — P3 | Demand: 1/14 | Effort: Low

**Purpose:** Render a small status dot/badge at a corner of a child element (e.g. online indicator on an avatar).

**Functionality:** Position (top-right/top-left/bottom-right/bottom-left), colour, size, label, offset, disabled.

**Implementation considerations:** `IndicatorRoot` wraps a child with `position: relative`; renders an absolutely-positioned dot. `cv()` recipe. Variants: `position`, `color`, `size`, `offset`.

**Cross-library:** Mantine.

---

#### 46. `Spoiler` — P3 | Demand: 1/14 | Effort: Low

**Purpose:** Collapsible region that hides content until the user clicks a toggle (show more/less).

**Functionality:** Toggle label (show/hide), animated expand/collapse, initial expanded state, max-height before collapse.

**Implementation considerations:** Closely related to `collapsible` — may be a styled variant with a "Show more" link and optional max-height clamp. `cv()` recipe. Variants: `expanded`, `maxHeight`.

**Cross-library:** Mantine.

---

## Component Marketplace — Deferred

Components that require **extensive combination of atomic components** AND have **limited/niche use cases**. These are deferred to a future **source-code-distribution component marketplace** (similar to shadcn/ui's registry model) rather than shipped as core library components.

The marketplace will distribute ready-to-copy component recipes that compose existing `@soybeanjs/ui` atoms, so users get full source control without bloating the core package.

### Deferred Components

| Component           | Why Deferred (Composite + Niche)                                                                             | Built From (Atoms)                                          | Demand |
| :------------------ | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- | :----: |
| `Tour`              | Onboarding walkthrough — overlays highlight engine + step manager + popover positioning. Niche (onboarding). | `popover`, `dialog`, `button`, `icon`                       |  3/14  |
| `TreeTable`         | Tree-structured table — extends table with expand/collapse rows + tree state. Niche enterprise.              | `table`, `tree`, `collapsible`                              |  3/14  |
| `PageHeader`        | Page header composite — breadcrumb + title + actions + back button. Composite layout, not a primitive.       | `breadcrumb`, `button`, `typography`, `icon`                |  4/14  |
| `Navbar`            | Top navigation bar — logo + nav links + actions + responsive collapse. Composite layout.                     | `link`, `button`, `menu`, `layout`, `icon`                  |  2/14  |
| `Comment`           | Comment block — avatar + author + content + actions + reply nesting. Social-domain niche.                    | `avatar`, `typography`, `button`, `tag`                     |  2/14  |
| `Sidebar`           | App sidebar — collapsible nav + sections + header + footer. shadcn-style composite.                          | `navigation-menu`, `collapsible`, `layout`, `link`, `icon`  |  1/14  |
| `AppShell`          | App layout shell — header + sidebar + main + footer composition. Composite layout.                           | `layout`, `navbar`, `sidebar`                               |  1/14  |
| `Galleria`          | Full image gallery/lightbox — carousel + thumbnail strip + zoom + fullscreen. Niche.                         | `carousel`, `image`, `dialog`, `button`                     |  2/14  |
| `OrganizationChart` | Org chart — tree + custom node rendering + connectors. Niche enterprise.                                     | `tree`, `card`, `icon`                                      |  2/14  |
| `RichTextEditor`    | WYSIWYG editor — toolbar + contenteditable + plugins. Large surface, usually a separate package.             | `toolbar`, `button`, `icon`, `tooltip` + Tiptap/ProseMirror |  3/14  |
| `Dock`              | macOS-style dock — magnification + tooltip + app icons. Niche platform idiom.                                | `tooltip`, `icon`, `popover`                                |  2/14  |
| `DynamicInput`      | Editable list of inputs — add/remove/sort rows of form fields. Composite form pattern.                       | `input`, `button`, `icon`, `list`                           |  1/14  |

### Marketplace Design Notes

- **Distribution model:** Source code (`.vue` + `.ts` files) copied into the user's project, not an npm dependency. Users own and customise the code.
- **Registry:** A CLI or config file listing available marketplace components with metadata (name, description, dependencies, atoms used).
- **Composition:** Each marketplace component imports from `@soybeanjs/ui` (atoms) and `@soybeanjs/headless` (composables). No new headless logic needed — only composition.
- **Versioning:** Marketplace components track the core library version they're compatible with.

---

## Out of Scope / Not Recommended

Candidates considered and **explicitly rejected** from both the active roadmap and the marketplace.

### Mobile-Only (excluded per desktop-first scope)

`PullRefresh`, `IndexBar`, `FloatingPanel`, `FloatingBubble`, `SwipeCell`, `SlideItem`, `Tabbar`, `BottomNavigation`, `NumberKeyboard`, `PasswordInput` (mobile), `Area`, `NoticeBar`, `Barrage`, `RollingText`, `AppBar` (mobile), `Sticky`, `Search` (mobile), `Picker`/`PickerGroup` (mobile), `ActionBar`.

### Already Covered by an Existing Component

`ScrollTop` (= `backtop`), `Inplace` (= `editable`), `PickList` (= `transfer`), `InputTag` / `DynamicTags` (= `tags-input`), `ColorInput` (= `color-field`), `HueSlider` / `AlphaSlider` (= `color-slider`), `Counter` / `Stepper` mobile (= `input-number`), `OtpInput` (= `input-otp`), `Text` / `Heading` / `Paragraph` (= `Typography`), `Box` / `Container` / `Stack` / `SimpleGrid` (= `layout` + UnoCSS), `Listbox` (= `select`), `Modal` (= `dialog`), `Sheet` (= `drawer`), `Notification` / `Sonner` / `Message` / `MessageBox` / `ConfirmDialog` / `ConfirmPopup` (= `toast` / `dialog` / `popconfirm`), `Direction` (= `config-provider`), `Portal` / `FocusTrap` (internal primitives), `ThemeIcon` (= `icon`), `Paper` / `Elevation` (raw styled div), `StyleProvider` (= `config-provider`), `NoSSR` (framework concern), `ResizeObserver` / `ScrollObserver` (utility composables), `ActionIcon` / `CopyButton` (variants of `button` / `clipboard`), `Burger` / `NavLink` (composites built on `button`/`link`).

### Charting (separate package scope)

`Chart`, `Heatmap`, `Sparkline` — charting is a distinct domain with its own ecosystem (ECharts, Chart.js, recharts). Belongs in a separate `@soybeanjs/charts` package, not the core UI library.

### Business-Specific (too narrow for a general library)

`AddressEdit`, `AddressList`, `ContactCard`, `ContactEdit`, `ContactList`, `Coupon`, `SubmitBar` (Vant checkout flows).

### Redundant Menu Variants

`MegaMenu`, `TieredMenu`, `PanelMenu`, `SlideMenu`, `TabMenu` — expressible with existing `menu` / `dropdown-menu` / `navigation-menu` slots and configurations.

### Low-Level Directives / Utilities

`Ripple` (directive), `Lazy` (directive), `Mutation`, `Morph`, `Touch-*` (Quasar directives), `Intersection` (composable), `BlockUI` (use `backdrop`/`overlay`), `Overlay` (raw, use `backdrop`), `ImageCompare` (niche), `Parallax` (niche), `DataIterator` / `DataList` (covered by `table`/`list`), `Popselect` (popover + select composite — use `combobox`), `SpeedDial` (FAB variant — use `FloatingActionButton`), `Video` (out of scope), `Chat` (too specific — marketplace candidate if demanded), `CountTo` (= `NumberAnimation`).

---

## Implemented Component Reference

Detailed API documentation for components already shipped in `@soybeanjs/ui`. Each entry is verified against the actual source code in `packages/ui/src/components/` and `packages/headless/src/components/`.

> **Convention:** All components are prefixed with `S` (e.g. `SButton`, `SButtonGroup`). Import from `@soybeanjs/ui`.

---

### SButtonGroup

Group multiple `SButton` components into a connected visual cluster. Variant, size, color, and other styling props set on the group **propagate to all child buttons** — child buttons inherit the group's values unless they explicitly override them.

**Source:** [button-group.vue](../packages/ui/src/components/button/button-group.vue) · [types.ts](../packages/ui/src/components/button/types.ts) · [styles/button.ts](../packages/ui/src/styles/button.ts) · [context.ts](../packages/ui/src/components/button/context.ts)

#### Usage Scenarios

- **Toolbar action clusters** — Save / Cancel / Delete buttons grouped together.
- **View mode toggle** — List / Grid / Table switching.
- **Pagination clusters** — Prev / 1 / 2 / 3 / Next.
- **Form action bars** — Submit / Reset grouped at the bottom of a form.
- **Split-action rows** — Connected buttons with shared variant but individual click handlers.

#### Props

`ButtonGroupProps` extends `ButtonProps` (which extends the headless `ButtonProps`), inheriting all button styling props. The group-specific props are:

| Prop          | Type                         | Default                          | Description                                                                   |
| :------------ | :--------------------------- | :------------------------------- | :---------------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'`                   | Layout direction of the button cluster.                                       |
| `dir`         | `'ltr' \| 'rtl'`             | `'ltr'` (from `SConfigProvider`) | Text direction. Falls back to the `SConfigProvider`'s `dir` value if not set. |

**Inherited styling props** (propagated to all child `SButton` via context):

| Prop         | Type                                                                                                    | Default     | Description                                                                            |
| :----------- | :------------------------------------------------------------------------------------------------------ | :---------- | :------------------------------------------------------------------------------------- |
| `color`      | `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'` | `'primary'` | Theme colour shared by all children.                                                   |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                         | `'md'`      | Visual size shared by all children.                                                    |
| `variant`    | `'solid' \| 'pure' \| 'plain' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link'`                  | `'solid'`   | Visual variant shared by all children.                                                 |
| `shape`      | `'auto' \| 'rounded' \| 'square' \| 'circle'`                                                           | `'auto'`    | Button shape shared by all children.                                                   |
| `shadow`     | `'none' \| 'sm' \| 'md' \| 'lg'`                                                                        | `'sm'`      | Shadow style shared by all children.                                                   |
| `fitContent` | `boolean`                                                                                               | `false`     | Whether buttons fit their content width (no full-width stretch).                       |
| `disabled`   | `boolean`                                                                                               | `undefined` | If `true`, **all** children are disabled (OR'd with each child's own `disabled` prop). |

**Inherited from headless `ButtonProps` / `PrimitiveProps`:**

| Prop      | Type                              | Default     | Description                                                                           |
| :-------- | :-------------------------------- | :---------- | :------------------------------------------------------------------------------------ |
| `type`    | `'button' \| 'submit' \| 'reset'` | `'button'`  | Native `<button>` type (forwarded to the root element).                               |
| `as`      | `string`                          | `'div'`     | Polymorphic root element tag (via `Primitive`).                                       |
| `asChild` | `boolean`                         | `false`     | If `true`, merges props onto the single child element instead of rendering a wrapper. |
| `class`   | `ClassValue`                      | `undefined` | Additional UnoCSS classes applied to the root element.                                |

> All remaining HTML attributes (e.g. `id`, `data-*`, `aria-*`) are forwarded to the root element via `v-bind="forwardedProps"`.

#### Events

`SButtonGroup` has **no custom events**. It is a presentational container — click events are handled by the individual child `SButton` components (which emit `click: [event: PointerEvent]`).

#### Slots

| Slot      | Description                                                                                       |
| :-------- | :------------------------------------------------------------------------------------------------ |
| `default` | One or more `SButton` (or `SButtonIcon`, `SButtonLoading`, `SButtonLink`) components as children. |

#### Context Propagation

`SButtonGroup` provides a reactive context via `provideButtonGroupContext()`. Child `SButton` components read this context via `useButtonGroupContext()`:

| Prop         | Propagation Rule                                                                                |
| :----------- | :---------------------------------------------------------------------------------------------- |
| `color`      | Child's own `color` prop takes **precedence** if explicitly set; otherwise inherits from group. |
| `size`       | Same — child prop overrides, otherwise inherits.                                                |
| `variant`    | Same — child prop overrides, otherwise inherits.                                                |
| `shape`      | Same — child prop overrides, otherwise inherits.                                                |
| `shadow`     | Same — child prop overrides, otherwise inherits.                                                |
| `fitContent` | Same — child prop overrides, otherwise inherits.                                                |
| `disabled`   | **OR logic** — child is disabled if **either** the group **or** the child has `disabled: true`. |

#### Styling

The `buttonGroupVariants` recipe (from [styles/button.ts](../packages/ui/src/styles/button.ts)) applies connector classes to children via descendant selectors:

- **Base:** `[&>*]:relative focus-visible:[&>*]:z-2 not-first:not-last:[&>*]:rounded-0` — positions children relatively, raises focused child z-index, removes rounding from middle children.
- **Horizontal:** `inline-flex` — removes the trailing border from all but the last child; removes the start rounding from the first child and the end rounding from the last child.
- **Vertical:** `flex flex-col` — same logic but for vertical borders/rounding.

This means the group itself does not render visible borders — it relies on each child `SButton`'s own border (from `variant: 'outline' | 'pure' | 'plain' | 'dashed'`).

#### Code Examples

**Basic — horizontal group with shared variant:**

```vue
<script setup lang="ts">
import { SButton, SButtonGroup } from '@soybeanjs/ui';
</script>

<template>
  <SButtonGroup variant="pure" color="accent">
    <SButton>Save</SButton>
    <SButton>Cancel</SButton>
    <SButton>Delete</SButton>
  </SButtonGroup>
</template>
```

**Vertical orientation:**

```vue
<template>
  <SButtonGroup orientation="vertical" variant="outline" color="warning" class="w-30">
    <SButton>Button 1</SButton>
    <SButton>Button 2</SButton>
    <SButton>Button 3</SButton>
  </SButtonGroup>
</template>
```

**Mixed variants — child overrides group defaults:**

The group sets `variant="solid"` and `color="primary"`, but individual children can override:

```vue
<template>
  <SButtonGroup variant="solid" color="primary" size="sm">
    <!-- Inherits solid/primary/sm from group -->
    <SButton>Save</SButton>
    <!-- Overrides variant to outline -->
    <SButton variant="outline">Preview</SButton>
    <!-- Overrides color to destructive -->
    <SButton color="destructive">Delete</SButton>
  </SButtonGroup>
</template>
```

**Disabled group — all children disabled:**

```vue
<template>
  <SButtonGroup variant="outline" disabled>
    <SButton>Save</SButton>
    <SButton>Cancel</SButton>
    <SButton>Delete</SButton>
  </SButtonGroup>
</template>
```

**With icon buttons and different shapes:**

```vue
<template>
  <SButtonGroup variant="soft" color="info" shape="rounded">
    <SButtonIcon icon="mdi:format-align-left" />
    <SButtonIcon icon="mdi:format-align-center" />
    <SButtonIcon icon="mdi:format-align-right" />
    <SButtonIcon icon="mdi:format-align-justify" />
  </SButtonGroup>
</template>
```

**Polymorphic root — render as a `<div>` with custom attributes:**

```vue
<template>
  <SButtonGroup as="div" class="my-toolbar" data-role="toolbar" variant="plain" size="lg">
    <SButton>Action 1</SButton>
    <SButton>Action 2</SButton>
  </SButtonGroup>
</template>
```

#### Implementation Notes

- **Pattern:** Context-provider — `SButtonGroup` calls `provideButtonGroupContext(transformPropsToContext(props, [...keys]))` to expose reactive `ComputedRef` values. Child `SButton` reads them via `useButtonGroupContext()` (returns `undefined` if not inside a group, so `SButton` works standalone too).
- **No `UiContext`:** The group does not use `provideButtonGroupUi()` — it has no slot-level class injection. Styling is applied entirely through the `buttonGroupVariants` recipe on the root, which targets children via UnoCSS descendant selectors (`[&>*]`).
- **Direction support:** `dir` falls back to `SConfigProvider`'s `dir` value, enabling RTL layouts without prop drilling.
- **Headless layer:** `SButtonGroup` lives in the UI layer only — the headless `Button` primitive does not have a group concept. The context is UI-layer-specific (`packages/ui/src/components/button/context.ts`).

---

## Appendix A — Libraries Surveyed

| Library      | Stack | Components | Stars (approx.) |
| :----------- | :---- | :--------: | :-------------: |
| MUI          | React |     59     |       95k       |
| Ant Design   | React |     71     |       92k       |
| Mantine      | React | 117 + ext  |       27k       |
| Chakra UI v2 | React |     54     |       38k       |
| shadcn/ui    | React |     59     |       75k       |
| Radix UI     | React |     30     |       16k       |
| Headless UI  | React |     16     |       25k       |
| PrimeReact   | React |     90     |       6k*       |
| MUI Base     | React |     20     |    (bundled)    |
| Element Plus | Vue   |     82     |       25k       |
| Naive UI     | Vue   |    ~80     |       16k       |
| Vuetify      | Vue   |    ~70     |       40k       |
| Quasar       | Vue   |    ~80     |       26k       |
| PrimeVue     | Vue   |     95     |       10k       |
| Arco Design  | Vue   |     73     |       5k*       |
| TDesign      | Vue   |     72     |       3k*       |
| Vant         | Vue   |     73     |       23k       |
| Varlet       | Vue   |     70     |       5k*       |

\* Included for completeness despite <10k stars due to strong ecosystem influence (PrimeReact/PrimeVue share a component surface; Arco/TDesign are major Chinese enterprise ecosystems; Varlet paired with Vant for mobile comparison).

## Appendix B — Universal Components (already shipped)

The following 24 component concepts appear in **all 4** of MUI/Ant Design/Mantine/Chakra and **all 4** of Element Plus/Naive UI/Vuetify/Quasar — the table-stakes of any UI library. All are already shipped in `@soybeanjs/ui`:

`Button`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Form`, `Table`, `Card`, `Dialog/Modal`, `Tabs`, `Menu`, `Pagination`, `Avatar`, `Badge`, `Tooltip`, `Carousel`, `Skeleton`, `Progress`, `Alert`, `Accordion/Collapse`, `Stepper/Steps`, `Tag`.

## Appendix C — Implementation Pattern Quick Reference

Maps each active roadmap component to its expected headless pattern (per the component development skill):

| Pattern                             | Components                                                                                                                                                                                                                                                                            |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Single-class (`cv()`)               | `Rating`, `QRCode`, `VisuallyHidden`, `Banner`, `Backdrop`, `Space`, `NativeSelect`, `GradientText`, `Indicator`, `Spoiler`, `Marquee`, `Blockquote`, `Highlight`, `NumberFormatter`                                                                                                  |
| Multi-slot (`scv()` + `provide*Ui`) | `Upload`, `Timeline`, `Typography`, `Descriptions`, `TreeSelect`, `Statistic`, `Code`, `Image`, `Transfer`, `Mention`, `AvatarGroup`, `RangeSlider`, `SplitButton`, `Fieldset`, `InputGroup`, `Dropzone`, `Masonry`, `FloatingActionButton`, `LoadingBar`, `OverflowList`, `Terminal` |
| Composable-first                    | `NumberAnimation` (`useNumberAnimation`), `Countdown` (`useCountdown`), `InfiniteScroll` (`useInfiniteScroll`), `Ellipsis` (`useOverflow`), `InputMask` (`useInputMask`)                                                                                                              |
| Extension of existing               | `CurrencyInput` (→ `input-number`), `TriStateCheckbox` (→ `checkbox`), `Equation` (KaTeX wrapper), `Knob` (SVG + `useKnob`), `Signature` (canvas + `useSignature`)                                                                                                                    |

---

_Last updated: 2026-08-02. Desktop-only scope. 88 component groups already shipped; 45 in the active roadmap; 12 deferred to the component marketplace; 60+ explicitly rejected in the Out-of-Scope section._
