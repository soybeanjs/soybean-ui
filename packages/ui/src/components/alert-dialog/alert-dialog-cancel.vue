<script setup lang="ts">
import { AlertDialogCancel, useForwardProps } from 'radix-vue';
import SButton from '../button/button.vue';
import type { ButtonProps } from '../button/types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const { variant = 'plain', ...delegatedProps } = defineProps<ButtonProps>();

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <AlertDialogCancel as-child>
    <SButton v-bind="forwarded" :variant>
      <slot>Cancel</slot>
    </SButton>
  </AlertDialogCancel>
</template>

<style scoped></style>
