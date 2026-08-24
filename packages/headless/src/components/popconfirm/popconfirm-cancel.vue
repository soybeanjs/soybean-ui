<script setup lang="ts">
import { usePopperV2RootContext } from '../popper-v2/context';
import Button from '../button/button.vue';
import { usePopconfirmUi } from './context';
import type { PopconfirmCancelProps, PopconfirmCancelEmits } from './types';

defineOptions({
  name: 'PopconfirmCancel'
});

const props = defineProps<PopconfirmCancelProps>();

const emit = defineEmits<PopconfirmCancelEmits>();

const cls = usePopconfirmUi('cancel');

const { onOpenChange } = usePopperV2RootContext('PopconfirmCancel');

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
