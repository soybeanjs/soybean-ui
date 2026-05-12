# Checkbox

Source URL: https://ui.soybeanjs.cn/components/checkbox
Markdown URL: https://ui.soybeanjs.cn/components/checkbox.md
Category: Forms
Description: A control that allows the user to select one or more items from a set.

## Overview

A control that allows the user to select one or more items from a set.

## Usage

Usage examples for checkbox are rendered on the site.

> `SCheckboxGroup` and `SCheckboxCardGroup` now delegate list iteration and default checkbox/card composition to headless `CheckboxGroupCompact` and `CheckboxCardGroupCompact`. For unstyled, data-driven usage, import them from `@soybeanjs/headless/checkbox`.

## Demos

Interactive demos for checkbox are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (13): Checkbox, CheckboxCard, CheckboxCardCompact, CheckboxCardGroup, CheckboxCardGroupCompact, CheckboxCompact, CheckboxControl, CheckboxGroup, CheckboxGroupCompact, CheckboxGroupRoot, CheckboxIndicator, CheckboxLabel, CheckboxRoot.

### Checkbox

#### Props
Properties for the Checkbox component.
- `class`: the class of root element (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CheckboxUi>`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `CheckboxShape`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `id`: Id. (type `string`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `CheckedState | null`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkbox (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the Checkbox component.
- `update:modelValue`: Event handler called when the value of the checkbox changes. (type `[value: CheckedState | null]`; parameters `value: CheckedState | null`)

### CheckboxCard

#### Props
Properties for the CheckboxCard component.
- `class`: the class of root element (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CheckboxCardUi>`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `CheckboxShape`; optional)
- `icon`: Icon rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `id`: Id. (type `string`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `CheckedState | null`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkbox (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxCard component.
- `update:modelValue`: Event handler called when the value of the checkbox changes. (type `[value: CheckedState | null]`; parameters `value: CheckedState | null`)

### CheckboxCardCompact

#### Props
Properties for the CheckboxCardCompact component.
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `id`: Id. (type `string`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `CheckedState | null`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkbox (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxCardCompact component.
- `update:modelValue`: Event handler called when the value of the checkbox changes. (type `[value: CheckedState | null]`; parameters `value: CheckedState | null`)

### CheckboxCardGroup

#### Props
Properties for the CheckboxCardGroup component.
- `class`: the class of group root element (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CheckboxCardUi>`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `CheckboxShape`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `rootProps`: Properties forwarded to the root element. (type `CheckboxRootProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T['value'][]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T['value'][]`; optional)
- `rovingFocus`: When `false`, navigating through the items using arrow keys will be disabled. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxCardGroup component.
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### CheckboxCardGroupCompact

#### Props
Properties for the CheckboxCardGroupCompact component.
- `items`: Items rendered by the component. (type `T[]`; required)
- `rootProps`: Properties forwarded to the root element. (type `CheckboxRootProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T['value'][]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T['value'][]`; optional)
- `rovingFocus`: When `false`, navigating through the items using arrow keys will be disabled. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxCardGroupCompact component.
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### CheckboxCompact

#### Props
Properties for the CheckboxCompact component.
- `label`: Label text rendered by the component. (type `string`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `id`: Id. (type `string`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `CheckedState | null`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkbox (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxCompact component.
- `update:modelValue`: Event handler called when the value of the checkbox changes. (type `[value: CheckedState | null]`; parameters `value: CheckedState | null`)

### CheckboxControl

#### Props
Properties for the CheckboxControl component.
- `id`: Id of the element (type `string`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CheckboxGroup

#### Props
Properties for the CheckboxGroup component.
- `class`: the class of group root element (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CheckboxUi>`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `CheckboxShape`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `rootProps`: Properties forwarded to the root element. (type `CheckboxRootProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T['value'][]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T['value'][]`; optional)
- `rovingFocus`: When `false`, navigating through the items using arrow keys will be disabled. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxGroup component.
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### CheckboxGroupCompact

#### Props
Properties for the CheckboxGroupCompact component.
- `items`: Items rendered by the component. (type `T[]`; required)
- `rootProps`: Properties forwarded to the root element. (type `CheckboxRootProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `CheckboxControlProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `CheckboxIndicatorProps`; optional)
- `labelProps`: Properties forwarded to the label element. (type `CheckboxLabelProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T['value'][]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T['value'][]`; optional)
- `rovingFocus`: When `false`, navigating through the items using arrow keys will be disabled. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxGroupCompact component.
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### CheckboxGroupRoot

#### Props
Properties for the CheckboxGroupRoot component.
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `rovingFocus`: When `false`, navigating through the items using arrow keys will be disabled. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxGroupRoot component.
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### CheckboxIndicator

#### Props
Properties for the CheckboxIndicator component.
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CheckboxLabel

- No documented props, emits, slots, or slot props were available.

### CheckboxRoot

#### Props
Properties for the CheckboxRoot component.
- `id`: Id. (type `string`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `CheckedState | null`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkbox (type `boolean`; default `false`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the CheckboxRoot component.
- `update:modelValue`: Event handler called when the value of the checkbox changes. (type `[value: CheckedState | null]`; parameters `value: CheckedState | null`)
