<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn, radioVariants } from '@soybean-unify/ui-variants';
import type { RadioRootProps } from './types';

defineOptions({
  name: 'SRadioRoot'
});

const props = withDefaults(defineProps<RadioRootProps>(), {
  as: 'div'
});

const { root } = radioVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
