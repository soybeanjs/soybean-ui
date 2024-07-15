<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive } from 'radix-vue';
import type { PrimitiveProps } from 'radix-vue';
import { buttonVariants } from '@soybean-unify/ui-variants';
import type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';

defineOptions({
  name: 'SuButton'
});

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button'
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="disabled"
    :class="cn(buttonVariants({ color, variant, size, shape }), props.class)"
  >
    <slot name="before" />
    <slot />
    <slot name="after" />
  </Primitive>
</template>

<style scoped></style>
