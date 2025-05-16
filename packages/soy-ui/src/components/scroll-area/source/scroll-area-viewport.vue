<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaViewport, useForwardProps } from '@soybean-ui/primitives';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaViewportProps } from '../types';

defineOptions({
  name: 'SScrollAreaViewport'
});

const { class: cls, ...delegatedProps } = defineProps<ScrollAreaViewportProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { viewport } = scrollAreaVariants();

const mergedCls = computed(() => cn(viewport(), cls));
</script>

<template>
  <ScrollAreaViewport v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ScrollAreaViewport>
</template>
