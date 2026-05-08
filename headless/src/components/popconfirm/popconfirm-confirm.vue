<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import { usePopoverRootContext } from '../popover/context';
import { usePopconfirmContext, usePopconfirmUi } from './context';
import { canClosePopconfirm } from './shared';
import type { PopconfirmConfirmEmits, PopconfirmConfirmProps } from './types';

defineOptions({
  name: 'PopconfirmConfirm'
});

const props = withDefaults(defineProps<PopconfirmConfirmProps>(), {
  as: 'button'
});

const emit = defineEmits<PopconfirmConfirmEmits>();

const forwardedProps = useOmitProps(props, ['text', 'beforeClose']);

const cls = usePopconfirmUi('confirm');

const { confirmText, confirmProps, beforeConfirm, onClose } = usePopconfirmContext('PopconfirmConfirm');
const { onOpenChange } = usePopoverRootContext('PopconfirmConfirm');

const mergedProps = computed(() => ({
  ...confirmProps.value,
  ...forwardedProps.value
}));

const text = computed(() => props.text ?? confirmText.value ?? 'Confirm');

const handleClose = async () => {
  if (!(await canClosePopconfirm(props.beforeClose ?? beforeConfirm))) {
    return;
  }

  emit('close');
  onClose();
  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="mergedProps" :class="cls" data-slot="confirm" @click="handleClose">
    <slot>{{ text }}</slot>
  </Button>
</template>
