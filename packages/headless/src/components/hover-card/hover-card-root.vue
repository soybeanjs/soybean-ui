<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideHoverCardRootContext } from './context';
import type { HoverCardRootProps, HoverCardRootEmits } from './types';

defineOptions({
  name: 'HoverCardRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: false,
  open: undefined,
  openDelay: 700,
  closeDelay: 300
});

const emit = defineEmits<HoverCardRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

provideHoverCardRootContext({
  ...transformPropsToContext(props, ['openDelay', 'closeDelay']),
  open
});
</script>

<template>
  <PopperRoot :dir="dir">
    <slot :open="open" />
  </PopperRoot>
</template>
