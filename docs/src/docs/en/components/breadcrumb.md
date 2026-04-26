# Breadcrumb

## Overview

Breadcrumbs allow users to navigate through the hierarchy of pages. It displays the current location within the application structure.

## Usage

```vue
<script setup lang="ts">
import { SBreadcrumb } from '@soybeanjs/ui';

const items = [{ label: 'Home', link: '/' }, { label: 'Components', link: '/components' }, { label: 'Breadcrumb' }];
</script>

<template>
  <SBreadcrumb :items="items" />
</template>
```

> `SBreadcrumb` delegates its list aggregation to headless `BreadcrumbCompact`. For unstyled, data-driven composition, import `BreadcrumbCompact` from `@soybeanjs/headless/breadcrumb`.

## Demos

```playground
base
separator
link
item-dropdown
ellipsis-dropdown
```

## API

<ComponentApi component="breadcrumb" />
