<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogClose } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Button from '../button/button.vue';
import { useAlertDialogContext } from './context';
import type { AlertDialogConfirmProps, AlertDialogConfirmEmits } from './types';

defineOptions({
  name: 'SAlertDialogConfirm'
});

const props = defineProps<AlertDialogConfirmProps>();

const emit = defineEmits<AlertDialogConfirmEmits>();

const forwardedProps = useOmitProps(props, ['text', 'beforeClose']);

const { size, confirmText, confirmProps, beforeConfirm, onClose } = useAlertDialogContext('AlertDialogConfirm');

const mergedProps = computed(() => ({
  ...confirmProps.value,
  ...forwardedProps.value
}));
const text = computed(() => props.text ?? confirmText.value ?? 'Confirm');

const mergedSize = computed(() => props.size ?? size.value);

const handleClose = () => {
  emit('close');
  onClose();
};
</script>

<template>
  <AlertDialogClose as-child :before-close="beforeClose ?? beforeConfirm" @close="handleClose">
    <Button v-bind="mergedProps" :size="mergedSize">
      <slot>{{ text }}</slot>
    </Button>
  </AlertDialogClose>
</template>
