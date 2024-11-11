<script setup lang="ts">
import { computed } from 'vue';
import { PinInputRoot, useForwardPropsEmits } from 'reka-ui';
import { cn, pinInputVariants } from '@soybean-ui/variants';
import type { PinInputRootEmits, PinInputRootProps } from './types';

defineOptions({
  name: 'SPinInputRoot'
});

const { class: cls, separate, ...delegatedProps } = defineProps<PinInputRootProps>();

const emit = defineEmits<PinInputRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = pinInputVariants({ separate });

  return cn(root(), cls);
});
</script>

<template>
  <PinInputRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </PinInputRoot>
</template>
