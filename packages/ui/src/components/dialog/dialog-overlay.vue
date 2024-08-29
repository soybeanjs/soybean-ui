<script setup lang="ts">
import { DialogOverlay, useForwardProps } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DialogOverlayProps } from './types';

defineOptions({
  name: 'SDialogOverlay'
});

const props = defineProps<DialogOverlayProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { overlay } = dialogVariants();
</script>

<template>
  <DialogOverlay v-bind="forwardedProps" :class="cn(overlay(), props.class)" />
</template>

<style scoped></style>
