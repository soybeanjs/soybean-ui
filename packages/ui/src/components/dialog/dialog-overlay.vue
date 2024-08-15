<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { DialogOverlay, useForwardProps } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-unify/ui-variants';
import type { DialogOverlayProps } from './types';

defineOptions({
  name: 'SDialogOverlay'
});

const props = defineProps<DialogOverlayProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { overlay } = dialogVariants();
</script>

<template>
  <DialogOverlay v-bind="forwardedProps" :class="cn(overlay(), props.class)" />
</template>

<style scoped></style>
