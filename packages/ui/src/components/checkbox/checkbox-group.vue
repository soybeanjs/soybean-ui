<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import type { CheckboxWrapperProps } from './types';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = withDefaults(defineProps<CheckboxWrapperProps>(), {
  as: 'div'
});

const { wrapper } = checkboxVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(wrapper(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
