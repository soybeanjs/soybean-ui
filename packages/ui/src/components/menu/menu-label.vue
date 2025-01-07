<script setup lang="ts">
import { computed } from 'vue';
import { MenuLabel } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuLabelProps } from './types';

defineOptions({
  name: 'SMenuLabel'
});

const { class: cls, size } = defineProps<MenuLabelProps>();

const mergedCls = computed(() => {
  const { label } = menuVariants({ size });

  return cn(label(), cls);
});
</script>

<template>
  <MenuLabel :class="mergedCls">
    <slot />
  </MenuLabel>
</template>
