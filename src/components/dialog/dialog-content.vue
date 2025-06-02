<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import DialogContentImpl from './dialog-content-impl.vue';
import { useDialogContentListeners } from './shared';
import type { DialogContentEmits, DialogContentProps } from './types';

defineOptions({
  name: 'DialogContent'
});

const props = defineProps<DialogContentProps>();
const emit = defineEmits<DialogContentEmits>();

const { contentElement, open, modal, triggerElement } = useDialogRootContext('DialogContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const events = useDialogContentListeners({
  modal,
  triggerElement,
  emit
});
</script>

<template>
  <DialogContentImpl
    v-if="isPresent"
    v-bind="props"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    v-on="events"
  >
    <slot />
  </DialogContentImpl>
</template>
