<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { buttonVariants, cn } from '@soybean-unify/ui-variants';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButton'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button'
});

const delegatedProps = reactiveOmit(props, ['class', 'color', 'variant', 'size', 'shape']);
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn(buttonVariants({ color, variant, size, shape }), props.class)">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </Primitive>
</template>

<style scoped></style>
