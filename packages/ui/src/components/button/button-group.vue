<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { buttonGroupVariants, cn } from '@soybean-ui/variants';
import type { ButtonGroupProps } from './types';

defineOptions({
  name: 'SButtonGroup'
});

const props = defineProps<ButtonGroupProps>();
</script>

<template>
  <Primitive as="div" :class="cn(buttonGroupVariants({ orientation }), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
