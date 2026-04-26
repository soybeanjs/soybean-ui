# Alert

## Overview

Displays a callout for user attention. Useful for warnings, errors, or information.

## Usage

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

> `SAlert` now delegates the default icon/title/description/close composition to headless `AlertCompact`. When you need the unstyled composition entrypoint directly, import it from `@soybeanjs/headless/alert`.

## Demos

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

<ComponentApi component="alert" />
