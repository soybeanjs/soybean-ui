<script setup lang="ts">
import { ScrollAreaViewport, useForwardProps } from 'radix-vue';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaViewportProps } from './types';

defineOptions({
  name: 'SScrollAreaViewport'
});

const { class: cls, ...delegatedProps } = defineProps<ScrollAreaViewportProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { viewport } = scrollAreaVariants();
</script>

<template>
  <ScrollAreaViewport v-bind="forwardedProps" :class="cn(viewport(), cls)">
    <slot />
  </ScrollAreaViewport>
</template>

<style scoped></style>
