<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import { usePopoverRootContext } from '../popover/context';
import { usePopconfirmContext, usePopconfirmUi } from './context';
import { canClosePopconfirm } from './shared';
import type { PopconfirmCancelEmits, PopconfirmCancelProps } from './types';

defineOptions({
  name: 'PopconfirmCancel'
});

const props = withDefaults(defineProps<PopconfirmCancelProps>(), {
  as: 'button'
});

const emit = defineEmits<PopconfirmCancelEmits>();

const forwardedProps = useOmitProps(props, ['text', 'beforeClose']);

const cls = usePopconfirmUi('cancel');

const { cancelText, cancelProps, beforeCancel, onClose } = usePopconfirmContext('PopconfirmCancel');
const { onOpenChange } = usePopoverRootContext('PopconfirmCancel');

const mergedProps = computed(() => ({
  ...cancelProps.value,
  ...forwardedProps.value
}));

const text = computed(() => props.text ?? cancelText.value ?? 'Cancel');

const handleClose = async () => {
  if (!(await canClosePopconfirm(props.beforeClose ?? beforeCancel))) {
    return;
  }

  emit('close');
  onClose();
  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="mergedProps" :class="cls" data-slot="cancel" @click="handleClose">
    <slot>{{ text }}</slot>
  </Button>
</template>
