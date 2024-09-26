<script setup lang="ts">
import { computed } from 'vue';
import { PinInputRoot, useForwardPropsEmits } from 'radix-vue';
import type { PinInputRootEmits } from 'radix-vue';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputRootProps } from './types';

defineOptions({
  name: 'SPinInputRoot'
});

const { class: rootCls, separate, ...delegatedProps } = defineProps<PinInputRootProps>();

const emit = defineEmits<PinInputRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { root } = pinInputVariants({ separate });

  return cn(root(), rootCls);
});
</script>

<template>
  <PinInputRoot v-bind="forwarded" :class="cls">
    <slot />
  </PinInputRoot>
</template>
