<script setup lang="ts">
import { cn, inputVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { InputProps } from './types';

defineOptions({
  name: 'SInput'
});

const props = defineProps<InputProps>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const modelValue = defineModel<string>();
</script>

<template>
  <input v-bind="delegatedProps" v-model="modelValue" :class="cn(inputVariants({ size }), props.class)" />
</template>

<style scoped></style>
