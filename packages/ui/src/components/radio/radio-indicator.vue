<script setup lang="ts">
import { RadioGroupIndicator, useForwardProps } from 'radix-vue';
import { cn, radioVariants } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import type { RadioIndicatorProps } from './types';

defineOptions({
  name: 'SRadioIndicator'
});

const props = defineProps<RadioIndicatorProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const { indicator } = radioVariants();
</script>

<template>
  <RadioGroupIndicator v-bind="forwarded" :class="cn(indicator(), props.class)">
    <slot />
  </RadioGroupIndicator>
</template>

<style scoped></style>
