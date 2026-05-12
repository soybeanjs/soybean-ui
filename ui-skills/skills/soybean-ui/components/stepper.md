# Stepper

Source URL: https://ui.soybeanjs.cn/components/stepper
Markdown URL: https://ui.soybeanjs.cn/components/stepper.md
Category: Navigation
Description: Displays progress through a multi-step workflow.

## Overview

Displays progress through a multi-step workflow.

## Usage

Usage examples for stepper are rendered on the site.

## Demo

Interactive demos for stepper are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (9): Stepper, StepperCompact, StepperDescription, StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle, StepperTrigger.

### Stepper

#### Props

Properties for the Stepper component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<StepperUi>`; optional)
- `items`: Items rendered by the component. (type `StepperItemData[]`; required)
- `itemProps`: Properties forwarded to the item element. (type `StepperItemProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `StepperTriggerProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `StepperIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `SeparatorRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `StepperTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `StepperDescriptionProps`; optional)
- `defaultValue`: The value of the step that should be active when initially rendered. (type `number`; default `1`; optional)
- `modelValue`: The controlled value of the step to activate. Can be bind as `v-model`. (type `number`; optional)
- `orientation`: The orientation of the stepper. (type `DataOrientation`; default `'horizontal'`; optional)
- `dir`: The reading direction of the stepper. (type `Direction`; optional)
- `linear`: Whether the steps must be completed in order. (type `boolean`; default `true`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the Stepper component.

- `update:modelValue`: Emitted when the model value changes. (type `[payload: number]`; parameters `payload: number`)

#### Slots

Slots for the Stepper component.

- `item`: Custom content for the item slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)

### StepperCompact

#### Props

Properties for the StepperCompact component.

- `items`: Items rendered by the component. (type `StepperItemData[]`; required)
- `itemProps`: Properties forwarded to the item element. (type `StepperItemProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `StepperTriggerProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `StepperIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `SeparatorRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `StepperTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `StepperDescriptionProps`; optional)
- `defaultValue`: The value of the step that should be active when initially rendered. (type `number`; default `1`; optional)
- `modelValue`: The controlled value of the step to activate. Can be bind as `v-model`. (type `number`; optional)
- `orientation`: The orientation of the stepper. (type `DataOrientation`; default `'horizontal'`; optional)
- `dir`: The reading direction of the stepper. (type `Direction`; optional)
- `linear`: Whether the steps must be completed in order. (type `boolean`; default `true`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the StepperCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[payload: number]`; parameters `payload: number`)

#### Slots

Slots for the StepperCompact component.

- `item`: Custom content for the item slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `((props: StepperItemData & { step: number; state: StepperState; }) => any) | undefined`)

### StepperDescription

#### Props

Properties for the StepperDescription component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### StepperIndicator

#### Props

Properties for the StepperIndicator component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### StepperItem

#### Props

Properties for the StepperItem component.

- `step`: The step index, starting from `1`. (type `number`; required)
- `disabled`: When `true`, prevents the user from interacting with the step. (type `boolean`; optional)
- `completed`: Shows whether the step is completed. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### StepperRoot

#### Props

Properties for the StepperRoot component.

- `defaultValue`: The value of the step that should be active when initially rendered. (type `number`; default `1`; optional)
- `modelValue`: The controlled value of the step to activate. Can be bind as `v-model`. (type `number`; optional)
- `orientation`: The orientation of the stepper. (type `DataOrientation`; default `'horizontal'`; optional)
- `dir`: The reading direction of the stepper. (type `Direction`; optional)
- `linear`: Whether the steps must be completed in order. (type `boolean`; default `true`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the StepperRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[payload: number]`; parameters `payload: number`)

### StepperSeparator

#### Props

Properties for the StepperSeparator component.

- `orientation`: Orientation of the component. Either `vertical` or `horizontal`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)

### StepperTitle

#### Props

Properties for the StepperTitle component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### StepperTrigger

#### Props

Properties for the StepperTrigger component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
