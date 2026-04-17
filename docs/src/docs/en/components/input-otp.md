# InputOtp

## Overview

InputOtp is a one-time-password input built around a real native input. It keeps the robust selection, paste, and mobile autofill behavior from vue-input-otp while exposing a default SoybeanUI presentation and a fully custom scoped slot.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('');
</script>

<template>
  <SInputOtp v-model="otp" :maxlength="6" placeholder="123456" aria-label="Verification code" />
</template>
```

## Demo

```playground
basic
placeholder
custom-slot
disabled
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root container.' },
  { name: 'modelValue', type: 'string', default: '-', description: 'Controlled OTP value.' },
  { name: 'defaultValue', type: 'string', default: '`\'\'`', description: 'Uncontrolled initial OTP value.' },
  { name: 'maxlength', type: 'number', default: '-', description: 'Number of OTP slots.', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder characters shown per slot.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the OTP input is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the OTP input is read-only.' },
  { name: 'autocomplete', type: 'string', default: '`one-time-code`', description: 'Autocomplete value passed to the native input.' },
  { name: 'inputmode', type: 'InputOtpInputMode', default: '`numeric`', description: 'Virtual keyboard mode for mobile devices.' },
  { name: 'textAlign', type: 'InputOtpTextAlign', default: '`left`', description: 'Text alignment used by the hidden native input.' },
  { name: 'pattern', type: 'string | RegExp', default: '-', description: 'Pattern used to validate the whole OTP string.' },
  { name: 'pasteTransformer', type: '(pasted: string | undefined) => string', default: '-', description: 'Transforms clipboard text before insertion.' },
  { name: 'pushPasswordManagerStrategy', type: 'InputOtpPushPasswordManagerStrategy', default: '`increase-width`', description: 'How to handle password manager badges.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual slot size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for the default visual structure.' }
]"/>

> Note: `SInputOtp` also accepts native input attributes such as `name`, `required`, `autofocus`, and `aria-label`.

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Emitted when the OTP value changes.' },
  { name: 'complete', parameters: '(value: string) => void', description: 'Emitted when the OTP reaches `maxlength`.' },
  { name: 'input', parameters: '(value: string) => void', description: 'Emitted on each valid input update.' },
  { name: 'change', parameters: '(event: Event) => void', description: 'Forwarded native change event.' },
  { name: 'select', parameters: '(event: Event) => void', description: 'Forwarded native select event.' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: 'Forwarded native focus event.' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: 'Forwarded native blur event.' },
  { name: 'mouseover', parameters: '(event: MouseEvent) => void', description: 'Forwarded native mouseover event.' },
  { name: 'mouseleave', parameters: '(event: MouseEvent) => void', description: 'Forwarded native mouseleave event.' },
  { name: 'paste', parameters: '(event: ClipboardEvent) => void', description: 'Forwarded native paste event.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'InputOtpRootSlotProps', description: 'Custom render function for all visible OTP slots.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class mapping for the default visual structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'positioner', type: 'string', description: 'Hidden input overlay wrapper class.' },
      { name: 'input', type: 'string', description: 'Real native input class.' },
      { name: 'group', type: 'string', description: 'Grid wrapper class.' },
      { name: 'slot', type: 'string', description: 'Single OTP slot class.' },
      { name: 'char', type: 'string', description: 'Filled character class.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder character class.' },
      { name: 'caret', type: 'string', description: 'Fake caret class.' }
    ]
  },
  {
    name: 'InputOtpRootSlotProps',
    description: 'Scoped slot payload.',
    fields: [
      { name: 'slots', type: 'InputOtpSlotProps[]', description: 'Per-slot render state.' },
      { name: 'isFocused', type: 'boolean', description: 'Whether the hidden input is focused.' },
      { name: 'isHovering', type: 'boolean', description: 'Whether the input is being hovered.' }
    ]
  },
  {
    name: 'InputOtpSlotProps',
    description: 'Single slot render state.',
    fields: [
      { name: 'char', type: 'string | null', description: 'Current slot character.' },
      { name: 'placeholderChar', type: 'string | null', description: 'Current placeholder character.' },
      { name: 'isActive', type: 'boolean', description: 'Whether the slot is selected or active.' },
      { name: 'hasFakeCaret', type: 'boolean', description: 'Whether the slot should show a fake caret.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="InputOtpInputMode" description="Input mode type" type="'numeric' | 'text'" />

<UnionType name="InputOtpTextAlign" description="Input text alignment type" type="'left' | 'center' | 'right'" />

<UnionType name="InputOtpPushPasswordManagerStrategy" description="Password manager badge handling strategy" type="'increase-width' | 'none'" />
