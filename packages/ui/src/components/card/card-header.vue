<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardSplit } from '@soybean-ui/variants';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'SCardHeader'
});

const { class: cls, size, split } = defineProps<CardHeaderProps>();

const mergedCls = computed(() => {
  const headerSplit: CardSplit = split ? 'header' : 'none';

  const { header } = cardVariants({ size, split: headerSplit });

  return cn(header(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
