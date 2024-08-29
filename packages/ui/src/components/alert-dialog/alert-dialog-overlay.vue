<script setup lang="ts">
import { AlertDialogOverlay, useForwardProps } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { AlertDialogOverlayProps } from './types';

defineOptions({
  name: 'SAlertDialogOverlay'
});

const props = defineProps<AlertDialogOverlayProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { overlay } = dialogVariants();
</script>

<template>
  <AlertDialogOverlay v-bind="forwardedProps" :class="cn(overlay(), props.class)" />
</template>

<style scoped></style>
