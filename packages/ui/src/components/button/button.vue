<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { buttonVariants, cn } from '@soybean-ui/variants';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButton'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  disabled: false
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="disabled"
    :class="cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), props.class)"
  >
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Primitive>
</template>

<style scoped></style>
