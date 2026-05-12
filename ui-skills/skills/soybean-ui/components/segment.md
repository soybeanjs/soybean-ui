# Segment

Source URL: https://ui.soybeanjs.cn/components/segment
Markdown URL: https://ui.soybeanjs.cn/components/segment.md
Category: Forms
Description: A linear set of two or more segments, each of which functions as a mutually exclusive button.

## Overview

A linear set of two or more segments, each of which functions as a mutually exclusive button.

## Usage

Usage examples for segment are rendered on the site.

> `SSegment` now delegates item iteration and indicator composition to headless `SegmentCompact`. For unstyled, data-driven usage, import `SegmentCompact` from `@soybeanjs/headless/tabs`.

## Demos

Interactive demos for segment are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (6): Segment, SegmentCompact, SegmentIndicator, SegmentList, SegmentRoot, SegmentTrigger.

### Segment

#### Props

Properties for the Segment component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<SegmentUi>`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `SegmentShape`; optional)
- `fill`: Fill. (type `SegmentFill`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `enableIndicator`: Whether to enable indicator. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `SegmentListProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `SegmentTriggerProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `SegmentIndicatorProps`; optional)
- `modelValue`: The controlled value of the tab to activate. Can be bind as `v-model`. (type `T['value'] | null`; optional)
- `defaultValue`: The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs (type `T['value'] | null`; optional)
- `activationMode`: Whether a tab is activated automatically (on focus) or manually (on click). (type `TabsActivationMode`; default `automatic`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)

#### Emits

Events for the Segment component.

- `update:modelValue`: Event handler called when the value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)

#### Slots

Slots for the Segment component.

- `item`: Custom content for the item slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `(() => any) | undefined`)

### SegmentCompact

#### Props

Properties for the SegmentCompact component.

- `items`: Items rendered by the component. (type `T[]`; required)
- `enableIndicator`: Whether to enable indicator. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `SegmentListProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `SegmentTriggerProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `SegmentIndicatorProps`; optional)
- `modelValue`: The controlled value of the tab to activate. Can be bind as `v-model`. (type `T['value'] | null`; optional)
- `defaultValue`: The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs (type `T['value'] | null`; optional)
- `activationMode`: Whether a tab is activated automatically (on focus) or manually (on click). (type `TabsActivationMode`; default `automatic`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)

#### Emits

Events for the SegmentCompact component.

- `update:modelValue`: Event handler called when the value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)

#### Slots

Slots for the SegmentCompact component.

- `item`: Custom content for the item slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `(() => any) | undefined`)

### SegmentIndicator

- No documented props, emits, slots, or slot props were available.

### SegmentList

- No documented props, emits, slots, or slot props were available.

### SegmentRoot

- No documented props, emits, slots, or slot props were available.

### SegmentTrigger

- No documented props, emits, slots, or slot props were available.
