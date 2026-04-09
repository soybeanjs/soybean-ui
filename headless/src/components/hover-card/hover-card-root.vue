<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { PopperRoot } from '../popper';
import { provideHoverCardRootContext } from './context';
import type { HoverCardRootEmits, HoverCardRootProps } from './types';

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
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

provideHoverCardRootContext({
  ...transformPropsToContext(props, ['openDelay', 'closeDelay']),
  open
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
