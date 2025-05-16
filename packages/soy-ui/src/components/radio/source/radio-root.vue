<script setup lang="ts">
import { computed } from 'vue';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioRootProps } from '../types';

defineOptions({
  name: 'SRadioRoot'
});

const { class: cls, size } = defineProps<RadioRootProps>();

const mergedCls = computed(() => {
  const { root } = radioVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
