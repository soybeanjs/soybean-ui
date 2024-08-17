<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { AlertDialogOverlay, useForwardProps } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-unify/ui-variants';
import type { AlertDialogOverlayProps } from './types';

defineOptions({
  name: 'SAlertDialogOverlay'
});

const props = defineProps<AlertDialogOverlayProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { overlay } = dialogVariants();
</script>

<template>
  <AlertDialogOverlay v-bind="forwardedProps" :class="cn(overlay(), props.class)" />
</template>

<style scoped></style>
