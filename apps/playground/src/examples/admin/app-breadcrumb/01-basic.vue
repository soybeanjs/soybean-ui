<script setup lang="ts">
import { SAppBreadcrumb } from '@soybeanjs/admin';
import type { AppBreadcrumbItem } from '@soybeanjs/admin';

const items: AppBreadcrumbItem[] = [
  { label: 'Home', value: 'home' },
  {
    label: 'Components',
    value: 'components',
    children: [
      { label: 'Button', value: 'button' },
      { label: 'Menu', value: 'menu' },
      { label: 'Breadcrumb', value: 'breadcrumb' }
    ]
  },
  { label: 'Breadcrumb', value: 'breadcrumb' }
];
</script>

<template>
  <div class="flex items-center rounded-md border border-solid border-border p-4">
    <SAppBreadcrumb :items="items" />
  </div>
</template>
