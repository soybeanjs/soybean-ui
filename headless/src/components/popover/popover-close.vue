<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { usePopoverRootContext } from './context';
import type { PopoverCloseProps, PopoverCloseEmits } from './types';

defineOptions({
  name: 'PopoverClose'
});

const props = withDefaults(defineProps<PopoverCloseProps>(), {
  as: 'button'
});

const emit = defineEmits<PopoverCloseEmits>();

const { onOpenChange } = usePopoverRootContext('PopoverClose');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const onClose = async () => {
  const result = await props.beforeClose?.();
  if (result === false) return;

  onOpenChange(false);
  emit('close');
};
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :type="tag" @click="onClose">
    <slot />
  </Primitive>
</template>
