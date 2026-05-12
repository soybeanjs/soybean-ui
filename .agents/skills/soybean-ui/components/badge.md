# Badge

Source URL: https://ui.soybeanjs.cn/components/badge
Markdown URL: https://ui.soybeanjs.cn/components/badge.md
Category: Data Display
Description: A small, interactive component used to categorize or label content.

## Overview

A small, interactive component used to categorize or label content.

## Usage

Usage examples for badge are rendered on the site.

## Demos

Interactive demos for badge are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (4): Badge, BadgeCompact, BadgeContent, BadgeRoot.

### Badge

#### Props
Properties for the Badge component.
- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<BadgeUi>`; optional)
- `position`: Position. (type `BadgePosition`; optional)
- `content`: Content rendered inside the badge bubble when no content slot is provided. (type `string`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BadgeContentProps`; optional)
- `open`: Whether the component is open. (type `boolean`; optional)
#### Emits
Events for the Badge component.
- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

### BadgeCompact

#### Props
Properties for the BadgeCompact component.
- `content`: Content rendered inside the badge bubble when no content slot is provided. (type `string`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BadgeContentProps`; optional)
- `open`: Whether the component is open. (type `boolean`; optional)
#### Emits
Events for the BadgeCompact component.
- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)
#### Slots
Slots for the BadgeCompact component.
- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `content`: Custom content for the badge content slot. (type `(() => any) | undefined`)

### BadgeContent

- No documented props, emits, slots, or slot props were available.

### BadgeRoot

#### Props
Properties for the BadgeRoot component.
- `open`: Whether the component is open. (type `boolean`; optional)
#### Emits
Events for the BadgeRoot component.
- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)
