<script setup lang="ts">
import Button from '../button/button.vue';
import { usePopoverRootContext } from '../popover/context';
import { usePopconfirmUi } from './context';
import type { PopconfirmConfirmEmits, PopconfirmConfirmProps } from './types';

defineOptions({
  name: 'PopconfirmConfirm'
});

const props = defineProps<PopconfirmConfirmProps>();

const emit = defineEmits<PopconfirmConfirmEmits>();

const cls = usePopconfirmUi('confirm');

const { onOpenChange } = usePopoverRootContext('PopconfirmConfirm');

const handleClose = (event: PointerEvent) => {
  emit('confirm', event);
  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="props" data-soybean-popconfirm-confirm :class="cls" @click="handleClose">
    <slot />
  </Button>
</template>
