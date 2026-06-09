<script setup lang="ts">
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import { useDialogRootContext, useDialogUi } from './context.js';
import type { DialogCloseProps, DialogCloseEmits } from './types.js';

defineOptions({
  name: 'DialogClose'
});

const props = withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button'
});

const emit = defineEmits<DialogCloseEmits>();

const cls = useDialogUi('close');

const { onOpenChange } = useDialogRootContext('DialogClose');

const onClose = async (event: MouseEvent) => {
  emit('close', event);

  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="props" data-soybean-dialog-close :class="cls" @click="onClose">
    <slot>
      <Icon icon="lucide:x" />
    </slot>
  </Button>
</template>
