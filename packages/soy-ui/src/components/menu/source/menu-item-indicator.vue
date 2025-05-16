<script setup lang="ts">
import { computed } from 'vue';
import { MenuItemIndicator, useForwardProps } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuItemIndicatorProps } from '../types';

defineOptions({
  name: 'SMenuItemIndicator'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenuItemIndicatorProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { itemIndicator } = menuVariants({ size });

  return cn(itemIndicator(), cls);
});
</script>

<template>
  <MenuItemIndicator v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </MenuItemIndicator>
</template>
