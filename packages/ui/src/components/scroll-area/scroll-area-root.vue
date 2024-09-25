<script setup lang="ts">
import { ScrollAreaRoot, useForwardProps } from 'radix-vue';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaRootProps } from './types';

defineOptions({
  name: 'SScrollAreaRoot'
});

const { class: cls, ...delegatedProps } = defineProps<ScrollAreaRootProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { root } = scrollAreaVariants();
</script>

<template>
  <ScrollAreaRoot v-bind="forwardedProps" :class="cn(root(), cls)">
    <slot />
  </ScrollAreaRoot>
</template>

<style scoped></style>
