<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import SButton from './button.vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'accent',
  variant: 'ghost',
  shape: 'square'
});

const forwarded = useForwardProps(props);
</script>

<template>
  <SButton v-bind="forwarded">
    <slot></slot>
  </SButton>
</template>

<style scoped></style>
