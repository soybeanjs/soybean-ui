<script setup lang="ts">
import { SBreadcrumb } from '@soybeanjs/ui';
import type { BreadcrumbOptionData } from '@soybeanjs/ui';

const items = [
  {
    label: 'Home',
    value: 'home',
    icon: 'lucide:home'
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:component'
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: 'lucide:folder'
  }
] satisfies BreadcrumbOptionData[];

function handleClick(item: BreadcrumbOptionData) {
  console.log('clicked:', item);
}
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <SBreadcrumb :items="items" @click="handleClick" />
  </div>
</template>
