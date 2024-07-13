<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { buttonVariants } from './variants';
import type { ButtonColor, ButtonSize, ButtonVariant } from './variants';

export interface ButtonProps extends PrimitiveProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  color: 'primary',
  size: 'md',
  class: ''
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ color, variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
