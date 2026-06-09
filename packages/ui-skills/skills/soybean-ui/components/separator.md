# Separator

Source URL: https://ui.soybeanjs.cn/components/separator
Markdown URL: https://ui.soybeanjs.cn/components/separator.md
Category: Layout
Description: Visually or semantically separates content.

## Overview

Visually or semantically separates content.

## Usage

Usage examples for separator are rendered on the site.

## Demos

Interactive demos for separator are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): Separator, SeparatorCompact, SeparatorLabel, SeparatorRoot.

### Separator

#### Props

Properties for the Separator component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<SeparatorUi>`; optional)
- `align`: Align. (type `Align`; optional)
- `border`: Border. (type `SeparatorBorder`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `labelProps`: Properties forwarded to the label element. (type `SeparatorLabelProps`; optional)
- `orientation`: Orientation of the component. Either `vertical` or `horizontal`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)

### SeparatorCompact

#### Props

Properties for the SeparatorCompact component.

- `label`: Label text rendered by the component. (type `string`; optional)
- `labelProps`: Properties forwarded to the label element. (type `SeparatorLabelProps`; optional)
- `orientation`: Orientation of the component. Either `vertical` or `horizontal`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)

#### Slots

Slots for the SeparatorCompact component.

- `default`: Custom content for the label slot. (type `(() => any) | undefined`)

### SeparatorLabel

- No documented props, emits, slots, or slot props were available.

### SeparatorRoot

#### Props

Properties for the SeparatorRoot component.

- `orientation`: Orientation of the component. Either `vertical` or `horizontal`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)
