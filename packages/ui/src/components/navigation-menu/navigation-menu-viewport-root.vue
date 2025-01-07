<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuViewportRootProps } from './types';

defineOptions({
  name: 'SNavigationMenuViewportRoot'
});

const { class: cls } = defineProps<NavigationMenuViewportRootProps>();

const { viewportRoot } = navigationMenuVariants();

const mergedCls = computed(() => cn(viewportRoot(), cls));
</script>

<template>
  <Primitive :class="mergedCls">
    <slot />
  </Primitive>
</template>
