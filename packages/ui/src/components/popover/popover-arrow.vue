<script setup lang="ts">
import { computed } from 'vue';
import { PopoverArrow } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const { class: cls, width, height } = defineProps<PopoverArrowProps>();

const { arrow } = popoverVariants();

const mergedCls = computed(() => cn(arrow(), cls));
</script>

<template>
  <PopoverArrow as-child :width :height>
    <div :class="mergedCls"></div>
  </PopoverArrow>
</template>

<style scoped></style>
