<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import { buttonVariants, cn } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButton'
});

const props = defineProps<ButtonProps>();

const delegatedProps = computedOmit(props, ['class', 'color', 'variant', 'size', 'shape', 'fitContent', 'shadow']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <button
    v-bind="forwardedProps"
    :class="cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), props.class)"
  >
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<style scoped></style>
