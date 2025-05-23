<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useBodyScrollLock, usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import type { DialogOverlayProps } from './types';

const props = defineProps<DialogOverlayProps>();

const overlayElement = useTemplateRef('overlayRef');
const { modal, open, dataState } = useDialogRootContext('DialogOverlay');

const isPresent = usePresence(
  overlayElement,
  computed(() => props.forceMount || open.value)
);

const visible = computed(() => modal.value && isPresent.value);

useBodyScrollLock(visible.value);
</script>

<template>
  <div v-if="visible" ref="overlayRef" :class="props.class" :data-state="dataState" style="pointer-events: auto">
    <slot />
  </div>
</template>
