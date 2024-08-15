<script setup lang="ts">
import { reactiveOmit, reactivePick } from '@vueuse/core';
import { DialogPortal, DialogRoot, DialogTrigger, useForwardProps, useForwardPropsEmits } from 'radix-vue';
import type { DialogContentEmits, DialogRootEmits } from 'radix-vue';
import SDialogContent from './dialog-content.vue';
import SDialogOverlay from './dialog-overlay.vue';
import type { DialogProps } from './types';

defineOptions({
  name: 'SDialog'
});

const props = defineProps<DialogProps>();

const emit = defineEmits<DialogRootEmits & DialogContentEmits>();

const delegatedRootProps = reactivePick(props, ['open', 'defaultOpen', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = reactiveOmit(props, ['open', 'defaultOpen', 'modal', 'portalProps', 'overlayProps']);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);
</script>

<template>
  <DialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <SDialogOverlay v-bind="overlayProps" />
      <SDialogContent v-bind="forwardedContent">
        <template #header>
          <slot name="header" />
        </template>
        <template #title>
          <slot name="title" />
        </template>
        <template #description>
          <slot name="description" />
        </template>
        <template #extra>
          <slot name="extra" />
        </template>
        <template #close>
          <slot name="close" />
        </template>
        <slot />
        <template #footer>
          <slot name="footer" />
        </template>
      </SDialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped></style>
