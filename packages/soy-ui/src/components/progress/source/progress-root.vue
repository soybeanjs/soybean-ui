<script setup lang="ts">
import { computed } from 'vue';
import { ProgressRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, progressVariants } from '@soybean-ui/variants';
import type { ProgressRootEmits, ProgressRootProps } from '../types';

defineOptions({
  name: 'SProgressRoot'
});

const { class: cls, color, size, ...delegatedProps } = defineProps<ProgressRootProps>();

const emit = defineEmits<ProgressRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = progressVariants({ color, size });

  return cn(root(), cls);
});
</script>

<template>
  <ProgressRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ProgressRoot>
</template>
