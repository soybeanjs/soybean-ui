<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { PopoverArrow, useForwardProps } from 'radix-vue';
import { cn } from '@soybean-unify/ui-variants';
import type { PopoverArrowProps } from './types';

defineOptions({
  name: 'SPopoverArrow'
});

const props = withDefaults(defineProps<PopoverArrowProps>(), {
  width: 12,
  height: 6
});

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <PopoverArrow v-bind="forwardedProps" :class="cn('fill-border', props.class)" />
</template>

<style scoped></style>
