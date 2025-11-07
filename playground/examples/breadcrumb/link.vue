<script setup lang="ts">
import { SBreadcrumb, SCard } from '@ui';
import type { BreadcrumbOptionData } from '@ui';

const items = [
  {
    label: 'Home',
    icon: 'lucide:home'
  },
  {
    label: 'Vue',
    linkProps: {
      href: 'https://vuejs.org'
    }
  },
  {
    label: 'SoybeanUI',
    linkProps: {
      href: 'https://soybean-ui.com'
    }
  }
] satisfies BreadcrumbOptionData[];
</script>

<template>
  <SCard title="Link">
    <SBreadcrumb :items="items" />
  </SCard>
</template>
