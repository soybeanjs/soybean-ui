<script setup lang="ts">
import { computed } from 'vue';
import { PopoverClose } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import type { ThemeSize } from '@/theme';
import Button from '../button/button.vue';
import { usePopconfirmContext } from './context';
import type { PopconfirmCancelProps, PopconfirmCancelEmits } from './types';

defineOptions({
  name: 'SPopconfirmCancel'
});

const props = withDefaults(defineProps<PopconfirmCancelProps>(), {
  variant: 'pure'
});

const emit = defineEmits<PopconfirmCancelEmits>();

const forwardedProps = useOmitProps(props, ['text', 'beforeClose']);

const { size, cancelText, cancelProps, beforeCancel, onClose } = usePopconfirmContext('PopconfirmCancel');

const mergedProps = computed(() => ({
  ...cancelProps.value,
  ...forwardedProps.value
}));
const text = computed(() => props.text ?? cancelText.value ?? 'Cancel');

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
  <PopoverClose as-child :before-close="beforeClose ?? beforeCancel" @close="handleClose">
    <Button v-bind="mergedProps" :size="mergedSize">
      <slot>{{ text }}</slot>
    </Button>
  </PopoverClose>
</template>
