<script setup lang="ts">
import { computed } from 'vue';
import { ToastRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastRootEmits, ToastRootProps } from '../types';

defineOptions({
  name: 'SToastRoot',
  inheritAttrs: false
});

const { class: cls, size, iconType: _iconType, richColor, ...delegatedProps } = defineProps<ToastRootProps>();

const emit = defineEmits<ToastRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = toastVariants({ size, richColor });

  return cn(root(), cls);
});
</script>

<template>
  <ToastRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ToastRoot>
</template>
