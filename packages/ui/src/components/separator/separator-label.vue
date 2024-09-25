<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, separatorVariants } from '@soybean-ui/variants';
import type { SeparatorLabelProps } from './types';

defineOptions({
  name: 'SSeparatorLabel'
});

const props = defineProps<SeparatorLabelProps>();

const cls = computed(() => {
  const { align, orientation } = props;

  const { label } = separatorVariants({ align, orientation });

  return cn(label(), props.class);
});
</script>

<template>
  <Primitive as="span" :class="cls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
