<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaScrollbar, useForwardProps } from '@soybean-ui/primitives';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaScrollbarProps } from '../types';

defineOptions({
  name: 'SScrollAreaThumb'
});

const { class: cls, size, orientation, ...delegatedProps } = defineProps<ScrollAreaScrollbarProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { scrollbar } = scrollAreaVariants({ size, orientation });

  return cn(scrollbar(), cls);
});
</script>

<template>
  <ScrollAreaScrollbar v-bind="forwardedProps" :class="mergedCls" :orientation="orientation">
    <slot />
  </ScrollAreaScrollbar>
</template>
