<script setup lang="ts">
import { useForwardProps } from 'reka-ui';
import SButton from './button.vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const { color = 'accent', variant = 'ghost', shape = 'square', ...delegatedProps } = defineProps<ButtonProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SButton v-bind="forwardedProps" :color :variant :shape>
    <slot></slot>
  </SButton>
</template>

<style scoped></style>
