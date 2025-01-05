<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, separatorVariants } from '@soybean-ui/variants';
import type { SeparatorLabelProps } from './types';

defineOptions({
  name: 'SSeparatorLabel'
});

const { class: cls, align, orientation } = defineProps<SeparatorLabelProps>();

const mergedCls = computed(() => {
  const { label } = separatorVariants({ align, orientation });

  return cn(label(), cls);
});
</script>

<template>
  <Primitive as="span" :class="mergedCls">
    <slot />
  </Primitive>
</template>
