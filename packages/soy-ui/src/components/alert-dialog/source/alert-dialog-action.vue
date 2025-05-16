<script setup lang="ts">
import { AlertDialogAction, useForwardProps } from '@soybean-ui/primitives';
import SButton from '../../button/source/button.vue';
import type { ButtonProps } from '../../button/types';

defineOptions({
  name: 'SAlertDialogAction'
});

const props = defineProps<ButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <AlertDialogAction as-child>
    <SButton v-bind="forwardedProps">
      <slot>Confirm</slot>
    </SButton>
  </AlertDialogAction>
</template>
