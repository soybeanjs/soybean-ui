<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaScrollbar, useForwardProps } from 'radix-vue';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaScrollbarProps } from './types';

defineOptions({
  name: 'SScrollAreaThumb'
});

const { class: cls, ...delegatedProps } = defineProps<ScrollAreaScrollbarProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { scrollbar } = scrollAreaVariants({ orientation: delegatedProps.orientation });

  return cn(scrollbar(), cls);
});
</script>

<template>
  <ScrollAreaScrollbar v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ScrollAreaScrollbar>
</template>

<style scoped></style>
