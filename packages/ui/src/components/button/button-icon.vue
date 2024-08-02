<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import type { ButtonProps } from './types';
import SButton from './button.vue';

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
    <slot class="h-1.25em w-1.25em"></slot>
  </SButton>
</template>

<style scoped></style>
