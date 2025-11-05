<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, useTemplateRef, watchEffect } from 'vue';
import { useBodyScrollLock, usePresence } from '../../composables';
import { useDialogRootContext, useDialogThemeContext } from './context';
import type { DialogOverlayProps } from './types';

defineOptions({
  name: 'DialogOverlay'
});

const props = defineProps<DialogOverlayProps>();

const overlayElement = useTemplateRef('overlayRef');
const { open, dataState } = useDialogRootContext('DialogOverlay');

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.overlay);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(overlayElement, open);

watchEffect(() => {
  if (isPresent.value) {
    const cleanup = useBodyScrollLock();

    onWatcherCleanup(cleanup);
  }
});
</script>

<template>
  <div v-if="isPresent" ref="overlayRef" :class="cls" :data-state="dataState" style="pointer-events: auto">
    <slot />
  </div>
</template>
