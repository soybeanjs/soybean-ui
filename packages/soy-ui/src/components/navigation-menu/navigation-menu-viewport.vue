<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuViewport, useForwardProps } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuViewportProps } from './types';

defineOptions({
  name: 'SNavigationMenuViewport'
});

const { class: cls, size, ...delegatedProps } = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { viewport } = navigationMenuVariants({ size });

  return cn(viewport(), cls);
});
</script>

<template>
  <NavigationMenuViewport v-bind="forwardedProps" :class="mergedCls" />
</template>
