<script setup lang="ts">
import { computed } from 'vue';
import { Primitive, useForwardProps } from '@soybean-ui/primitives';
import { buttonVariants, cn } from '@soybean-ui/variants';
import type { ButtonPropsWithPrimitive } from '../types';

defineOptions({
  name: 'SButton'
});

const {
  class: cls,
  as = 'button',
  color,
  variant,
  size,
  shape,
  shadow,
  fitContent,
  ...delegatedProps
} = defineProps<ButtonPropsWithPrimitive>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), cls));
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="mergedCls" :as="as">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Primitive>
</template>
