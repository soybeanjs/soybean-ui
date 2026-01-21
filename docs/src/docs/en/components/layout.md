# Layout

## Overview

The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Usage

```vue
<script setup lang="ts">
import { SLayout } from '@soybeanjs/ui';
</script>

<template>
  <SLayout>
    <template #sidebar>Sidebar Content</template>
    <template #header>Header Content</template>
    <template #tab>Tabs Content</template>
    Main Content
    <template #footer>Footer Content</template>
  </SLayout>
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Layout size configuration.' },
  { name: 'sidebarProps', type: 'LayoutSidebarProps', default: '{}', description: 'Props for the sidebar.' },
  { name: 'headerProps', type: 'LayoutHeaderProps', default: '{}', description: 'Props for the header.' },
  { name: 'mainProps', type: 'LayoutMainProps', default: '{}', description: 'Props for the main area.' },
  { name: 'tabProps', type: 'LayoutTabProps', default: '{}', description: 'Props for the tab area.' },
  { name: 'footerProps', type: 'LayoutFooterProps', default: '{}', description: 'Props for the footer.' },
  { name: 'railProps', type: 'LayoutRailProps', default: '{}', description: 'Props for the rail (mini sidebar).' },
  { name: 'mobileProps', type: 'LayoutMobileProps', default: '{}', description: 'Props for mobile drawer.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'sidebar', parameters: '-', description: 'Sidebar content.' },
  { name: 'header', parameters: '-', description: 'Header content.' },
  { name: 'tab', parameters: '-', description: 'Tab bar content.' },
  { name: 'default', parameters: '-', description: 'Main content area.' },
  { name: 'footer', parameters: '-', description: 'Footer content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'sidebar', type: 'string', description: 'Sidebar container class.' },
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'main', type: 'string', description: 'Main area wrapper class.' },
      { name: 'footer', type: 'string', description: 'Footer container class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
