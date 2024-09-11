<script setup lang="ts">
import { ProgressRoot } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import { computed } from 'vue';
import { computedOmit } from '../../shared';
import type { ProgressRootProps } from './types';

defineOptions({
  name: 'SProgressRoot'
});

const props = withDefaults(defineProps<ProgressRootProps>(), {
  as: 'div'
});

const delegatedProps = computedOmit(props, ['class']);

const cls = computed(() => {
  const { root } = progressVariants({ size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cls">
    <slot />
  </ProgressRoot>
</template>

<style scoped></style>
