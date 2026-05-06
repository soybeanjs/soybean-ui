<script setup lang="ts">
import Button from '../button/button.vue';
import { usePopoverRootContext } from './context';
import type { PopoverCloseProps, PopoverCloseEmits } from './types';

defineOptions({
  name: 'PopoverClose'
});

const props = defineProps<PopoverCloseProps>();

const emit = defineEmits<PopoverCloseEmits>();

const { onOpenChange } = usePopoverRootContext('PopoverClose');

const onClose = (event: PointerEvent) => {
  emit('close', event);
  onOpenChange(false);
};
</script>

<template>
  <Button v-bind="props" @click="onClose">
    <slot />
  </Button>
</template>
