<script setup lang="ts">
import { AlertDialogCancel, useForwardProps } from '@soybean-ui/primitives';
import SButton from '../../button/source/button.vue';
import type { ButtonProps } from '../../button/types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const { variant = 'plain', ...delegatedProps } = defineProps<ButtonProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AlertDialogCancel as-child>
    <SButton v-bind="forwardedProps" :variant="variant">
      <slot>Cancel</slot>
    </SButton>
  </AlertDialogCancel>
</template>
