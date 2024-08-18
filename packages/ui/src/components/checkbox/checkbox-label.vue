<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import type { CheckboxLabelProps } from './types';

defineOptions({
  name: 'SCheckboxLabel'
});

const props = withDefaults(defineProps<CheckboxLabelProps>(), {
  as: 'span'
});

const { label } = checkboxVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(label(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
