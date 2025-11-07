<script setup lang="ts">
import { SBreadcrumb, SCard } from '@ui';
import type { BreadcrumbOptionData } from '@ui';

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
  <SCard title="Base">
    <SBreadcrumb :items="items" @click="handleClick" />
  </SCard>
</template>
