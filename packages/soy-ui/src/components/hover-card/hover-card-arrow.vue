<script setup lang="ts">
import { computed } from 'vue';
import { HoverCardArrow } from '@soybean-ui/primitives';
import { cn, hoverCardVariants } from '@soybean-ui/variants';
import type { HoverCardArrowProps } from './types';

defineOptions({
  name: 'SHoverCardArrow'
});

const { class: cls, width, height } = defineProps<HoverCardArrowProps>();

const { arrow } = hoverCardVariants();

const mergedCls = computed(() => cn(arrow(), cls));
</script>

<template>
  <HoverCardArrow as-child :width="width" :height="height">
    <div :class="mergedCls"></div>
  </HoverCardArrow>
</template>
