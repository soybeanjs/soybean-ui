<script setup lang="ts">
import { computed } from 'vue';
import { ProgressRoot, useForwardPropsEmits } from 'radix-vue';
import type { ProgressRootEmits } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ProgressRootProps } from './types';

defineOptions({
  name: 'SProgressRoot'
});

const props = withDefaults(defineProps<ProgressRootProps>(), {
  as: 'div'
});

const emit = defineEmits<ProgressRootEmits>();

const delegatedProps = computedOmit(props, ['class', 'color', 'size']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { root } = progressVariants({ color: props.color, size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <ProgressRoot v-bind="forwarded" :class="cls">
    <slot />
  </ProgressRoot>
</template>

<style scoped></style>
