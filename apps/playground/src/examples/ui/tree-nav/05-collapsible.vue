<script setup lang="ts">
import { STreeNav } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  { value: 'guide', label: 'Guide' },
  { value: 'api', label: 'API Reference' },
  { value: 'examples', label: 'Examples' },
  { value: 'themes', label: 'Themes' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'faq', label: 'FAQ' },
  { value: 'discord', label: 'Discord', href: 'https://discord.gg/soybeanjs', external: true }
];
</script>

<template>
  <div class="w-100 overflow-hidden rounded-md border p-2">
    <STreeNav :items="items" collapsible size="sm" trigger="click" more-label="More links" />
  </div>
</template>
