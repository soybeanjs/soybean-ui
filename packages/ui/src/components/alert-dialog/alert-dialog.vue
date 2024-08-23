<script setup lang="ts">
import { reactiveOmit, reactivePick } from '@vueuse/core';
import {
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTrigger,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import type { AlertDialogContentEmits, AlertDialogEmits } from 'radix-vue';
import SAlertDialogContent from './alert-dialog-content.vue';
import SAlertDialogOverlay from './alert-dialog-overlay.vue';
import type { AlertDialogProps } from './types';

defineOptions({
  name: 'SAlertDialog'
});

const props = defineProps<AlertDialogProps>();

const emit = defineEmits<AlertDialogEmits & AlertDialogContentEmits>();

const delegatedRootProps = reactivePick(props, ['open', 'defaultOpen']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = reactiveOmit(props, [
  'open',
  'defaultOpen',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'forceMountOverlay'
]);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);
</script>

<template>
  <AlertDialogRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SAlertDialogOverlay :force-mount="forceMountOverlay" :class="overlayClass" />
      <SAlertDialogContent v-bind="forwardedContent">
        <template #header>
          <slot name="header" />
        </template>
        <template #title-root>
          <slot name="title-root" />
        </template>
        <template #title>
          <slot name="title" />
        </template>
        <template #title-leading>
          <slot name="title-leading" />
        </template>
        <template #title-trailing>
          <slot name="title-trailing" />
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
      </SAlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped></style>
