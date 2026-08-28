<script setup lang="ts">
import { STreeNav } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  { value: 'home', label: 'Home', to: '/' },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/soybean-ui',
    external: true,
    target: '_blank'
  },
  { value: 'twitter', label: 'Twitter', href: 'https://twitter.com/soybeanjs', external: true }
];
</script>

<template>
  <STreeNav :items="items" default-value="home" />
</template>
