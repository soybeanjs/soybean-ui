<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSeparator } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarSeparatorProps } from './types';

defineOptions({
  name: 'SMenubarSeparator'
});

const props = defineProps<MenubarSeparatorProps>();

const cls = computed(() => cn(menubarVariants().separator(), props.class));
</script>

<template>
  <MenubarSeparator v-bind="props" :class="cls" />
</template>
