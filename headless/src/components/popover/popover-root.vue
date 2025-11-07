<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { PopperRoot } from '../popper';
import { providePopoverRootContext } from './context';
import type { PopoverRootEmits, PopoverRootProps } from './types';

defineOptions({
  name: 'PopoverRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopoverRootProps>(), {
  open: undefined,
  defaultOpen: false,
  avoidCollisions: true
});

const emit = defineEmits<PopoverRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const close = () => {
  open.value = false;
};

providePopoverRootContext({
  ...transformPropsToContext(props, ['modal']),
  open
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" :close="close" />
  </PopperRoot>
</template>
