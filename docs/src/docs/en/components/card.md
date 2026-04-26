# Card

## Overview

A container component that groups related content and actions. It supports headers, footers, titles, descriptions, and can be split into sections.

## Usage

```vue
<script setup lang="ts">
import { SCard, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Notifications" description="You have 3 unread messages.">
    <div class="py-4">
      <p>Your subscription expires soon.</p>
    </div>
    <template #footer>
      <SButton class="w-full">Mark all as read</SButton>
    </template>
  </SCard>
</template>
```

## Demos

```playground
base
only-content
split
title-slot
collapsible
```

## API

<ComponentApi component="card" />
