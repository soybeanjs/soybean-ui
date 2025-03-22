<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import SButton from './button.vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const { color = 'accent', variant = 'ghost', shape = 'square', ...delegatedProps } = defineProps<ButtonProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SButton v-bind="forwardedProps" :color="color" :variant="variant" :shape="shape">
    <slot />
  </SButton>
</template>
