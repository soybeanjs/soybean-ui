# Color Picker

Source URL: https://ui.soybeanjs.cn/components/color-picker
Markdown URL: https://ui.soybeanjs.cn/components/color-picker.md
Category: Forms
Description: A composite color picker that combines a color area, hue/alpha sliders, formatted inputs, and preset swatches, with full `oklch` editing and output support.

## Overview

A composite color picker that combines a color area, hue/alpha sliders, formatted inputs, and preset swatches, with full `oklch` editing and output support.

## Usage

Usage examples for color-picker are rendered on the site.

## Demo

Interactive demos for color-picker are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): ColorPicker, ColorPickerCompact, ColorPickerRoot, ColorPickerTrigger.

### ColorPicker

#### Props

Properties for the ColorPicker component.

- `class`: Additional class names applied to the trigger element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ColorPickerUi>`; optional)
- `showAlpha`: Whether to show an alpha. (type `boolean`; optional)
- `showFields`: Whether to show a fields. (type `boolean`; optional)
- `showSwatches`: Whether to show a swatches. (type `boolean`; optional)
- `swatches`: Swatches. (type `string[]`; optional)
- `swatchProps`: Properties forwarded to the swatch element. (type `ColorSwatchCompactProps`; optional)
- `segmentProps`: Properties forwarded to the segment element. (type `SegmentCompactProps<ColorPickerFormatOptionData>`; optional)
- `areaProps`: Properties forwarded to the area element. (type `ColorAreaCompactProps`; optional)
- `hueSliderProps`: Properties forwarded to the hue slider element. (type `ColorSliderCompactProps`; optional)
- `alphaSliderProps`: Properties forwarded to the alpha slider element. (type `ColorSliderCompactProps`; optional)
- `alphaFieldProps`: Properties forwarded to the alpha field element. (type `ColorFieldCompactProps`; optional)
- `fieldProps`: Properties forwarded to the field element. (type `ColorFieldCompactProps`; optional)
- `swatchPickerProps`: Properties forwarded to the swatch picker element. (type `ColorSwatchPickerCompactProps<false>`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `defaultFormat`: Default format. (type `ColorFormat`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopoverTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopoverPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopoverPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopperArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopoverCloseProps`; optional)
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the ColorPicker component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `update:format`: Emitted when the format value changes. (type `[value: ColorFormat]`; parameters `value: ColorFormat`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)

### ColorPickerCompact

#### Props

Properties for the ColorPickerCompact component.

- `showAlpha`: Whether to show an alpha. (type `boolean`; optional)
- `showFields`: Whether to show a fields. (type `boolean`; optional)
- `showSwatches`: Whether to show a swatches. (type `boolean`; optional)
- `swatches`: Swatches. (type `string[]`; optional)
- `swatchProps`: Properties forwarded to the swatch element. (type `ColorSwatchCompactProps`; optional)
- `segmentProps`: Properties forwarded to the segment element. (type `SegmentCompactProps<ColorPickerFormatOptionData>`; optional)
- `areaProps`: Properties forwarded to the area element. (type `ColorAreaCompactProps`; optional)
- `hueSliderProps`: Properties forwarded to the hue slider element. (type `ColorSliderCompactProps`; optional)
- `alphaSliderProps`: Properties forwarded to the alpha slider element. (type `ColorSliderCompactProps`; optional)
- `alphaFieldProps`: Properties forwarded to the alpha field element. (type `ColorFieldCompactProps`; optional)
- `fieldProps`: Properties forwarded to the field element. (type `ColorFieldCompactProps`; optional)
- `swatchPickerProps`: Properties forwarded to the swatch picker element. (type `ColorSwatchPickerCompactProps<false>`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `defaultFormat`: Default format. (type `ColorFormat`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopoverTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopoverPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopoverPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopperArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopoverCloseProps`; optional)
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the ColorPickerCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `update:format`: Emitted when the format value changes. (type `[value: ColorFormat]`; parameters `value: ColorFormat`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)

### ColorPickerRoot

#### Props

Properties for the ColorPickerRoot component.

- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `defaultFormat`: Default format. (type `ColorFormat`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the ColorPickerRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `update:format`: Emitted when the format value changes. (type `[value: ColorFormat]`; parameters `value: ColorFormat`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)

#### Slot Props

Slot properties for the ColorPickerRoot component.

- `color`: Theme color of the component. (type `ComputedRef<import("@soybeanjs/colord").AnyColor>`; required)
- `formattedValue`: Formatted value exposed in the slot scope. (type `ComputedRef<string>`; required)
- `hexValue`: Hex value exposed in the slot scope. (type `ComputedRef<string>`; required)
- `displayFormat`: Display format exposed in the slot scope. (type `ComputedRef<ColorFormat>`; required)
- `displayFormatLabel`: Display format label exposed in the slot scope. (type `ComputedRef<string>`; required)
- `areaXChannel`: X channel exposed in the slot scope. (type `ComputedRef<'saturation' | 'chroma'>`; required)
- `areaYChannel`: Y channel exposed in the slot scope. (type `ComputedRef<'lightness' | 'brightness'>`; required)
- `setColor`: Set color exposed in the slot scope. (type `(color: ColorValue) => void`; required)
- `setFormat`: Set format exposed in the slot scope. (type `(format: ColorFormat) => void`; required)

### ColorPickerTrigger

#### Props

Properties for the ColorPickerTrigger component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
