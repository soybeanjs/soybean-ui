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
</script>

<template>
  <SCard title="Custom Separator">
    <SBreadcrumb :items="items">
      <template #separator>&nbsp;/&nbsp;</template>
    </SBreadcrumb>
  </SCard>
</template>
