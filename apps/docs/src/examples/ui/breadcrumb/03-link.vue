<script setup lang="ts">
import { SBreadcrumb } from '@vean/ui';
import type { BreadcrumbOptionData } from '@vean/ui';

const items = [
  {
    label: 'Home',
    icon: 'lucide:home'
  },
  {
    label: 'Vue',
    href: 'https://vuejs.org'
  },
  {
    label: 'VeanUI',
    href: 'https://veanui.com'
  }
] satisfies BreadcrumbOptionData[];
</script>

<template>
  <SBreadcrumb :items="items" />
</template>
