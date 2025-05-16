<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupIndicator, useForwardProps } from '@soybean-ui/primitives';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioIndicatorProps } from '../types';

defineOptions({
  name: 'SRadioIndicator'
});

const { class: cls, color, ...delegatedProps } = defineProps<RadioIndicatorProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { indicator } = radioVariants();

const mergedCls = computed(() => cn(indicator({ color }), cls));
</script>

<template>
  <RadioGroupIndicator v-bind="forwardedProps" :class="mergedCls" />
</template>
