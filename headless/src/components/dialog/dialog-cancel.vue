<script setup lang="ts">
import Button from '../button/button.vue';
import { useDialogRootContext, useDialogUi } from './context';
import type { DialogCancelProps, DialogCancelEmits } from './types';

defineOptions({
  name: 'DialogCancel'
});

const props = withDefaults(defineProps<DialogCancelProps>(), {
  as: 'button'
});

const emit = defineEmits<DialogCancelEmits>();

const cls = useDialogUi('cancel');

const { setCancelElement, onOpenChange } = useDialogRootContext('DialogCancel');

const onCancel = async (event: MouseEvent) => {
  if (event.defaultPrevented) return;

  onOpenChange(false);
  emit('cancel', event);
};
</script>

<template>
  <Button :ref="setCancelElement" v-bind="props" :class="cls" @click="onCancel">
    <slot />
  </Button>
</template>
