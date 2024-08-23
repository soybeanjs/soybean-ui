<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import type { CheckboxRootProps } from './types';

defineOptions({
  name: 'SCheckboxRoot'
});

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  as: 'div'
});

const { root } = checkboxVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
