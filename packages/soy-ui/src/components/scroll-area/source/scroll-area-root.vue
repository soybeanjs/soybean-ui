<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaRoot, useForwardProps } from '@soybean-ui/primitives';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaRootProps } from '../types';

defineOptions({
  name: 'SScrollAreaRoot'
});

const { class: cls, ...delegatedProps } = defineProps<ScrollAreaRootProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { root } = scrollAreaVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <ScrollAreaRoot v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ScrollAreaRoot>
</template>
