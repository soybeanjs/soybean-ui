<script setup lang="ts">
import Button from '../button/button.vue';
import Icon from '../_icon/icon.vue';
import { useDialogRootContext, useDialogUi } from './context';
import type { DialogCloseProps, DialogCloseEmits } from './types';

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

  if (event.defaultPrevented) return;

  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="props" :class="cls" @click="onClose">
    <slot>
      <Icon icon="lucide:x" />
    </slot>
  </Button>
</template>
