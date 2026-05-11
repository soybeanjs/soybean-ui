<script setup lang="ts">
import Button from '../button/button.vue';
import { usePopoverRootContext } from '../popover/context';
import { usePopconfirmUi } from './context';
import type { PopconfirmCancelProps, PopconfirmCancelEmits } from './types';

defineOptions({
  name: 'PopconfirmCancel'
});

const props = defineProps<PopconfirmCancelProps>();

const emit = defineEmits<PopconfirmCancelEmits>();

const cls = usePopconfirmUi('cancel');

const { onOpenChange } = usePopoverRootContext('PopconfirmCancel');

const handleClose = async (event: PointerEvent) => {
  emit('cancel', event);
  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="props" data-soybean-popconfirm-cancel :class="cls" @click="handleClose">
    <slot />
  </Button>
</template>
