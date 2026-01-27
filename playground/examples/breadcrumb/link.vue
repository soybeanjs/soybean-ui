<script setup lang="ts">
import { SBreadcrumb } from '@soybeanjs/ui';
import type { BreadcrumbOptionData } from '@soybeanjs/ui';

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
    label: 'SoybeanUI',
    href: 'https://ui.soybeanjs.cn'
  }
] satisfies BreadcrumbOptionData[];
</script>

<template>
  <div>
    <h3 class="playground-title">Link</h3>
    <SBreadcrumb :items="items" />
  </div>
</template>
