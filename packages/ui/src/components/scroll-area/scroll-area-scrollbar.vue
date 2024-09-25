<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaScrollbar, useForwardProps } from 'radix-vue';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaScrollbarProps } from './types';

defineOptions({
  name: 'SScrollAreaThumb'
});

const { class: scrollbarCls, ...delegatedProps } = defineProps<ScrollAreaScrollbarProps>();

const cls = computed(() => {
  const { scrollbar } = scrollAreaVariants({ orientation: delegatedProps.orientation });

  return cn(scrollbar(), scrollbarCls);
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ScrollAreaScrollbar :class="cls" v-bind="forwardedProps">
    <slot />
  </ScrollAreaScrollbar>
</template>

<style scoped></style>
