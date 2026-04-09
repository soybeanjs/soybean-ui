<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSubContent } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarSubContentProps } from './types';

defineOptions({
  name: 'SMenubarSubContent'
});

const props = withDefaults(defineProps<MenubarSubContentProps>(), {
  sideOffset: 8,
  alignOffset: -4
});

const cls = computed(() => cn(menubarVariants().subContent(), props.class));
</script>

<template>
  <MenubarSubContent v-bind="props" :class="cls">
    <slot />
  </MenubarSubContent>
</template>
