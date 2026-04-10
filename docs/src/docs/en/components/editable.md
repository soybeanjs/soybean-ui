# Editable

## Overview

An inline text editor that switches between preview and edit states.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SEditable } from '@soybeanjs/ui';

const value = ref('Click to edit');
</script>

<template>
  <SEditable v-model="value" placeholder="Enter text" />
</template>
```

## Demo

```playground
basic
size
disabled
activation-mode
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root element.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Component size.' },
  { name: 'v-model', type: 'string', default: '-', description: 'Controlled value.' },
  { name: 'defaultValue', type: 'string', default: '-', description: 'Initial value for uncontrolled usage.' },
  { name: 'placeholder', type: 'string | { edit?: string; preview?: string }', default: '-', description: 'Placeholder text for edit and preview states.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether interaction is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether editing is readonly.' },
  { name: 'activationMode', type: `'focus' | 'dblclick' | 'none'`, default: `'focus'`, description: 'How the component enters edit mode.' },
  { name: 'submitMode', type: `'blur' | 'enter' | 'none' | 'both'`, default: `'blur'`, description: 'How the current value is submitted.' },
  { name: 'selectOnFocus', type: 'boolean', default: 'false', description: 'Whether text is selected when edit mode starts.' },
  { name: 'startWithEditMode', type: 'boolean', default: 'false', description: 'Whether the component starts in edit mode.' },
  { name: 'maxLength', type: 'number', default: '-', description: 'Maximum number of allowed characters.' },
  { name: 'autoResize', type: 'boolean', default: 'false', description: 'Whether the input surface auto resizes with its content.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements.' },
  { name: 'areaProps', type: 'EditableAreaProps', default: '-', description: 'Pass-through props for EditableArea.' },
  { name: 'previewProps', type: 'EditablePreviewProps', default: '-', description: 'Pass-through props for EditablePreview.' },
  { name: 'inputProps', type: 'EditableInputProps', default: '-', description: 'Pass-through props for EditableInput.' },
  { name: 'editTriggerProps', type: 'EditableEditTriggerProps', default: '-', description: 'Pass-through props for the edit trigger.' },
  { name: 'submitTriggerProps', type: 'EditableSubmitTriggerProps', default: '-', description: 'Pass-through props for the submit trigger.' },
  { name: 'cancelTriggerProps', type: 'EditableCancelTriggerProps', default: '-', description: 'Pass-through props for the cancel trigger.' }
]"/>

> Note: `SEditable` also inherits native form props such as `id`, `name`, and `required`.

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Emitted when the value changes.' },
  { name: 'submit', parameters: '(value: string) => void', description: 'Emitted when the edited value is submitted.' },
  { name: 'update:state', parameters: '(state: \'edit\' | \'submit\' | \'cancel\') => void', description: 'Emitted when the editing state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Fully custom content.' },
  { name: 'preview', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Custom preview content.' },
  { name: 'input', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Custom input content.' },
  { name: 'edit-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Custom edit trigger.' },
  { name: 'submit-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Custom submit trigger.' },
  { name: 'cancel-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: 'Custom cancel trigger.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class map.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'area', type: 'string', description: 'Editable surface class.' },
      { name: 'preview', type: 'string', description: 'Preview text class.' },
      { name: 'input', type: 'string', description: 'Input class.' },
      { name: 'controls', type: 'string', description: 'Action button group class.' },
      { name: 'editTrigger', type: 'string', description: 'Edit trigger class.' },
      { name: 'submitTrigger', type: 'string', description: 'Submit trigger class.' },
      { name: 'cancelTrigger', type: 'string', description: 'Cancel trigger class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
