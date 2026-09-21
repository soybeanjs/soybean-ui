<script setup lang="ts">
import { STreeNav } from '@vean/ui';
import type { TreeNavOptionData } from '@vean/ui';

const items: TreeNavOptionData[] = [
  { value: 'home', label: 'Home', to: '/' },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/vean-ui',
    external: true,
    target: '_blank'
  },
  { value: 'twitter', label: 'Twitter', href: 'https://twitter.com/soybeanjs', external: true }
];
</script>

<template>
  <STreeNav :items="items" default-value="home" />
</template>
