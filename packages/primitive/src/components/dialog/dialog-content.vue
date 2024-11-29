<script setup lang="ts">
import { computed } from 'vue';
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import DialogContentModal from './dialog-content-modal.vue';
import DialogContentNonModal from './dialog-content-non-modal.vue';
import { injectDialogRootContext } from './context';
import type { DialogContentEmits, DialogContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogContent'
});

const props = defineProps<DialogContentPropsWithPrimitive>();

const emit = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { open, modal } = injectDialogRootContext();

const { forwardRef } = useForwardExpose();

const present = computed(() => props.forceMount || open.value);
</script>

<template>
  <Presence :present="present">
    <DialogContentModal v-if="modal" :ref="forwardRef" v-bind="forwarded">
      <slot />
    </DialogContentModal>
    <DialogContentNonModal v-else :ref="forwardRef" v-bind="forwarded">
      <slot />
    </DialogContentNonModal>
  </Presence>
</template>
