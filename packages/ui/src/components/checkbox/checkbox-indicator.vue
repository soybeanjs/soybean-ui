<script setup lang="ts">
import { CheckboxIndicator, useForwardProps } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import type { CheckboxIndicatorProps } from './types';

defineOptions({
  name: 'SCheckboxIndicator'
});

const props = defineProps<CheckboxIndicatorProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const { indicator } = checkboxVariants();
</script>

<template>
  <CheckboxIndicator v-bind="forwarded" :class="cn(indicator(), props.class)">
    <slot />
  </CheckboxIndicator>
</template>

<style scoped></style>
