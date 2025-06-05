<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useHideOthers, usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import DialogContentImpl from './dialog-content-impl.vue';
import { useDialogContentEvents } from './shared';
import type { DialogContentEmits, DialogContentProps } from './types';

defineOptions({
  name: 'DialogContent'
});

const props = defineProps<DialogContentProps>();
const emit = defineEmits<DialogContentEmits>();

const listeners = useForwardListeners(emit);

const { contentElement, open, modal, triggerElement } = useDialogRootContext('DialogContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const { onPointerDownOutside, onFocusOutside, onInteractOutside, onCloseAutoFocus } = useDialogContentEvents({
  modal,
  triggerElement
});

useHideOthers(contentElement, modal);
</script>

<template>
  <DialogContentImpl
    v-if="isPresent"
    v-bind="props"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    v-on="listeners"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @close-auto-focus="onCloseAutoFocus"
  >
    <slot />
  </DialogContentImpl>
</template>
