<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { type ButtonVariants, buttonVariants } from './class';

export interface ButtonProps extends PrimitiveProps {
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
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
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ color, size }), props.class)">
    <slot />
  </Primitive>
</template>
