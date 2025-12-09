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
  <div>
    <h3 class="playground-title">Link</h3>
    <SBreadcrumb :items="items" />
  </div>
</template>
