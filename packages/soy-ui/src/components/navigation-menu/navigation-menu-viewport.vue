<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuViewport, useForwardProps } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuViewportProps } from './types';

defineOptions({
  name: 'SNavigationMenuViewport',
  inheritAttrs: false
});

const { class: cls, size, rootClass, ...delegatedProps } = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { viewport, viewportRoot } = navigationMenuVariants({ size });

  return {
    cls: cn(viewport(), cls),
    root: cn(viewportRoot(), rootClass)
  };
});
</script>

<template>
  <div :class="mergedCls.root">
    <NavigationMenuViewport v-bind="forwardedProps" :class="mergedCls.cls" />
  </div>
</template>
