<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxRootProps } from './types';

defineOptions({
  name: 'SCheckboxRoot'
});

const props = defineProps<CheckboxRootProps>();

const { root } = checkboxVariants();
</script>

<template>
  <Primitive as="div" :class="cn(root(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
