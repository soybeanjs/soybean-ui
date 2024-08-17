<script setup lang="ts">
import { AlertDialogCancel, useForwardProps } from 'radix-vue';
import SButton from '../button/button.vue';
import type { ButtonProps } from '../button/types';

defineOptions({
  name: 'SAlertDialogCancel'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'plain'
});

const forwarded = useForwardProps(props);
</script>

<template>
  <AlertDialogCancel as-child>
    <SButton v-bind="forwarded">
      <slot>Cancel</slot>
    </SButton>
  </AlertDialogCancel>
</template>

<style scoped></style>
