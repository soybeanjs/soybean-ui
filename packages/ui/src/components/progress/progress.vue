<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0
});

const { root, indicator } = progressVariants({
  color: props.color,
  size: props.size
});

const delegatedProps = computedOmit(props, ['class', 'indicatorClass', 'modelValue']);
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cn(root(), props.class)">
    <ProgressIndicator
      :class="cn(indicator(), props.indicatorClass)"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>

<style scoped></style>
