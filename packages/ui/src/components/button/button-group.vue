<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { buttonGroupVariants, cn } from '@soybean-unify/ui-variants';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'SButtonGroup'
});

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonGroupVariants(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
