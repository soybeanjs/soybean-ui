<script setup lang="ts">
import { ProgressRoot } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import type { ProgressRootProps } from './types';

defineOptions({
  name: 'SProgressRoot'
});

const props = withDefaults(defineProps<ProgressRootProps>(), {
  as: 'div'
});

const { root } = progressVariants({ size: props.size });
</script>

<template>
  <ProgressRoot :as="as" :as-child="asChild" :class="cn(root(), props.class)">
    <slot />
  </ProgressRoot>
</template>

<style scoped></style>
