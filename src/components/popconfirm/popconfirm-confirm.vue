<script setup lang="ts">
import { computed } from 'vue';
import { PopoverClose } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import type { ThemeSize } from '@/theme';
import Button from '../button/button.vue';
import { usePopconfirmContext } from './context';
import type { PopconfirmConfirmProps, PopconfirmConfirmEmits } from './types';

defineOptions({
  name: 'SPopconfirmConfirm'
});

const props = defineProps<PopconfirmConfirmProps>();

const emit = defineEmits<PopconfirmConfirmEmits>();

const forwardedProps = useOmitProps(props, ['text', 'beforeClose']);

const { size, confirmText, confirmProps, beforeConfirm, onClose } = usePopconfirmContext('PopconfirmConfirm');

const mergedProps = computed(() => ({
  ...confirmProps.value,
  ...forwardedProps.value
}));
const text = computed(() => props.text ?? confirmText.value ?? 'Confirm');

const sizeMap: Record<ThemeSize, ThemeSize> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
  '2xl': 'xl'
};

const mergedSize = computed(() => props.size ?? sizeMap[size.value ?? 'md']);

const handleClose = () => {
  emit('close');
  onClose();
};
</script>

<template>
  <PopoverClose as-child :before-close="beforeClose ?? beforeConfirm" @close="handleClose">
    <Button v-bind="mergedProps" :size="mergedSize">
      <slot>{{ text }}</slot>
    </Button>
  </PopoverClose>
</template>
