<script setup lang="ts">
import { onWatcherCleanup, shallowRef, useTemplateRef, watchEffect } from 'vue';
import { useBodyScrollLock, useOmitProps, usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import type { DialogOverlayProps } from './types';

defineOptions({
  name: 'DialogOverlay'
});

const props = defineProps<DialogOverlayProps>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const overlayElement = useTemplateRef('overlayRef');
const { open, dataState } = useDialogRootContext('DialogOverlay');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(overlayElement, open);

watchEffect(() => {
  if (isPresent.value) {
    const cleanup = useBodyScrollLock();

    onWatcherCleanup(cleanup);
  }
});
</script>

<template>
  <div v-if="isPresent" v-bind="forwardedProps" ref="overlayRef" :data-state="dataState" style="pointer-events: auto">
    <slot />
  </div>
</template>
