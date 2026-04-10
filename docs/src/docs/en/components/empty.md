# Empty

## Overview

A lightweight empty state component for highlighting missing content, actions, and follow-up guidance.

## Usage

```vue
<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="No projects yet"
    description="Create your first project to start organizing work."
    icon="lucide:folder-plus"
    media-variant="icon"
  >
    <SButton>Create project</SButton>
  </SEmpty>
</template>
```

## Demos

```playground
basic
icon
slot
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root element custom class.' },
  { name: 'title', type: 'string', default: '-', description: 'Empty state title text.' },
  { name: 'description', type: 'string', default: '-', description: 'Supporting description text.' },
  { name: 'icon', type: 'IconValue', default: '-', description: 'Shortcut icon rendered in the media slot.' },
  { name: 'mediaVariant', type: 'EmptyMediaVariant', default: `'default'`, description: 'Media slot visual style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' },
  { name: 'headerProps', type: 'object', default: '{}', description: 'Props passed to the header container.' },
  { name: 'mediaProps', type: 'object', default: '{}', description: 'Props passed to the media container.' },
  { name: 'contentProps', type: 'object', default: '{}', description: 'Props passed to the content container.' },
  { name: 'titleProps', type: 'object', default: '{}', description: 'Props passed to the title element.' },
  { name: 'descriptionProps', type: 'object', default: '{}', description: 'Props passed to the description element.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Action area or custom content under the header.' },
  { name: 'media', parameters: '-', description: 'Custom media content shown above the text block.' },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'media', type: 'string', description: 'Media wrapper class.' },
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'title', type: 'string', description: 'Title element class.' },
      { name: 'description', type: 'string', description: 'Description element class.' },
    ],
  }
]"/>

<UnionType name="EmptyMediaVariant" description="Media slot style variant" type="'default' | 'icon'" />
