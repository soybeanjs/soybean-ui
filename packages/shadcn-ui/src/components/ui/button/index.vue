<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { buttonVariants } from './variants';
import type { ButtonColor, ButtonSize, ButtonVariant } from './variants';

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  class: '',
  as: 'button',
  variant: 'solid',
  color: 'primary',
  size: 'md'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ color, variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
