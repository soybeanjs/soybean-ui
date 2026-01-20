# Button

## Overview

A button component that can be used to trigger an action.

## Usage

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Default Button</SButton>
</template>
```

## Features

- 🎨 8 variants: solid, outline, dashed, soft, ghost, link, plain, pure
- 🌈 8 colors: primary, destructive, success, warning, info, carbon, secondary, accent
- 📏 6 sizes: xs, sm, md, lg, xl, 2xl
- 🔲 4 shapes: auto, rounded, square, circle
- ⚡ Loading state support
- 🌐 Link function support (SButtonLink)
- ♿ Full accessibility support
- 🎯 TypeScript type safety

## Button component family

- **SButton** - Basic button component
- **SButtonLink** - Link button, supports route navigation
- **SButtonIcon** - Icon button, compact design
- **SButtonLoading** - Loading state button
- **SButtonGroup** - Button group component

## Demos

```playground
color
variant
size
shape
shadow
slot
disabled
loading
icon
link
group
```

## API

## SButton API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Button color' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Button size' },
  { name: 'variant', type: 'ButtonVariant', default: `'solid'`, description: 'Button variant' },
  { name: 'shape', type: 'ButtonShape', default: `'auto'`, description: 'Button shape' },
  { name: 'shadow', type: 'ButtonShadow', default: `'sm'`, description: 'Shadow effect' },
  { name: 'fitContent', type: 'boolean', default: 'false', description: 'Fit content to size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: 'Rendered element/component' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props/behavior into the child element' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: 'Triggered when button is clicked (won\'t fire when disabled)' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: 'Leading content (before default slot)' },
  { name: 'default', parameters: '-', description: 'Button content' },
  { name: 'trailing', parameters: '-', description: 'Trailing content (after default slot)' },
]"/>

## SButtonIcon API

### Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Iconify icon name', required: true },
  { name: 'iconProps', type: 'Partial<IconProps>', default: '-', description: 'Props passed to `SIcon`' },
]"/>

> Inherits all props, events, and slots from `SButton`.

## SButtonLoading API

### Props

<DataTable preset="props" :data="[
  { name: 'loading', type: 'boolean', default: 'false', description: 'Controlled loading state' },
  { name: 'autoLoading', type: 'boolean', default: 'false', description: 'Automatically toggle loading during click handler execution' },
  { name: 'loadingText', type: 'string', default: '-', description: 'Text shown when loading and `loadingPosition` is `center`' },
  { name: 'loadingDuration', type: 'number', default: '-', description: 'Delay (ms) before leaving auto-loading state' },
  { name: 'loadingIcon', type: 'string', default: `'svg-spinners:270-ring'`, description: 'Loading icon name (Iconify)' },
  { name: 'loadingIconProps', type: 'Partial<IconProps>', default: '-', description: 'Props passed to loading icon' },
  { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, default: `'start'`, description: 'Loading icon position' },
]"/>

> Inherits all props, events, and slots from `SButton`.

### Events

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: 'Click handler (supports `autoLoading`)' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: 'Leading content (hidden by loading icon when `loadingPosition` is `start`)' },
  { name: 'default', parameters: '{ loading: boolean }', description: 'Button content; receives current loading state' },
  { name: 'trailing', parameters: '-', description: 'Trailing content (hidden by loading icon when `loadingPosition` is `end`)' },
]"/>

## SButtonLink API

### Props

<DataTable preset="props" :data="[
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: 'Route location to navigate to' },
  { name: 'href', type: 'RouteLocationRaw', default: '-', description: 'Alias for `to` (when both provided, `href` is ignored)' },
  { name: 'external', type: 'boolean', default: '-', description: 'Force link as external/internal' },
  { name: 'target', type: 'string', default: '-', description: 'Target attribute for external link' },
  { name: 'rel', type: 'string', default: `'noopener noreferrer'`, description: 'Rel attribute (defaults for external links)' },
  { name: 'noRel', type: 'boolean', default: 'false', description: 'Disable automatic rel handling' },
  { name: 'prefetch', type: 'boolean', default: '-', description: 'Enable prefetch behavior (framework dependent)' },
  { name: 'noPrefetch', type: 'boolean', default: '-', description: 'Disable prefetch behavior' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ isHref: boolean }', description: 'Link content; receives whether current link renders as href' },
]"/>

## SButtonGroup API

### Props

<DataTable preset="props" :data="[
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Group orientation' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: 'Text direction' }
]"/>

> Inherits all props from `SButton`, which are passed to each child button.

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Group content (usually multiple buttons)' },
]"/>

## Types

<TypeTable :data="[
  {
    name: 'ButtonProps',
    description: 'Props for `SButton`.',
    fields: [
      { name: 'class', type: 'ClassValue', description: 'Custom class name.' },
      { name: 'color', type: 'ThemeColor', description: 'Button color.' },
      { name: 'size', type: 'ThemeSize', description: 'Button size.' },
      { name: 'variant', type: 'ButtonVariant', description: 'Button variant.' },
      { name: 'shape', type: 'ButtonShape', description: 'Button shape.' },
      { name: 'shadow', type: 'ButtonShadow', description: 'Shadow effect.' },
      { name: 'fitContent', type: 'boolean', description: 'Fit content to size.' },
      { name: 'disabled', type: 'boolean', description: 'Disabled.' },
      { name: 'as', type: 'string | Component', description: 'Rendered element/component.' },
      { name: 'asChild', type: 'boolean', description: 'Merge into child element.' },
    ]
  },
  {
    name: 'ButtonIconProps',
    description: 'Props for `SButtonIcon`.',
    fields: [
      { name: 'icon', type: 'string', required: true, description: 'Iconify icon name.' },
      { name: 'iconProps', type: 'Partial<IconProps>', description: 'Props passed to icon component.' },
    ]
  },
  {
    name: 'ButtonLoadingProps',
    description: 'Props for `SButtonLoading`.',
    fields: [
      { name: 'loading', type: 'boolean', description: 'Controlled loading state.' },
      { name: 'autoLoading', type: 'boolean', description: 'Auto loading during click handler.' },
      { name: 'loadingText', type: 'string', description: 'Loading text (center position only).' },
      { name: 'loadingDuration', type: 'number', description: 'Delay (ms) before leaving auto-loading state.' },
      { name: 'loadingIcon', type: 'string', description: 'Loading icon name.' },
      { name: 'loadingIconProps', type: 'Partial<IconProps>', description: 'Props for loading icon.' },
      { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, description: 'Loading icon position.' },
    ]
  },
  {
    name: 'ButtonGroupProps',
    description: 'Props for `SButtonGroup`.',
    fields: [
      { name: 'orientation', type: `'horizontal' \| 'vertical'`, description: 'Group orientation.' },
      { name: 'dir', type: `'ltr' \| 'rtl'`, description: 'Text direction.' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="Class value type" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ThemeColor" description="Button color" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="Button size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="ButtonVariant" description="Button variant" type="'solid' | 'outline' | 'dashed' | 'soft' | 'ghost' | 'link' | 'plain' | 'pure'" />

<UnionType name="ButtonShape" description="Button shape" type="'auto' | 'rounded' | 'square' | 'circle'" />

<UnionType name="ButtonShadow" description="Button shadow effect" type="'none' | 'sm' | 'md' | 'lg'" />

<TypeTable :data="[
  {
    name: 'IconProps',
    description: 'Props for Icon component.',
    fields: [
      { name: 'icon', type: 'string', description: 'Iconify icon name.' },
      { name: 'width', type: 'number | string', description: 'Icon width.' },
      { name: 'height', type: 'number | string', description: 'Icon height.' },
      { name: 'color', type: 'string', description: 'Icon color.' },
      { name: 'inline', type: 'boolean', description: 'Whether to display the icon inline.' },
    ]
  }
]"/>
