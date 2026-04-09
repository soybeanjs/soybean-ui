<script setup lang="ts">
import { computed } from 'vue';
import { MenubarRoot } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarProps } from './types';

defineOptions({
  name: 'SMenubar'
});

const props = defineProps<MenubarProps>();

const cls = computed(() => cn(menubarVariants().root(), props.class));
</script>

<template>
  <MenubarRoot v-bind="props" :class="cls">
    <slot />
  </MenubarRoot>
</template>
