<script setup lang="ts">
import { useControllableState, useIsUsingKeyboard } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { PopperRoot } from '../popper';
import { provideMenuRootContext } from './context';
import type { MenuRootEmits, MenuRootProps } from './types';

defineOptions({
  name: 'MenuRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: false,
  modal: true
});

const emit = defineEmits<MenuRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

const isUsingKeyboard = useIsUsingKeyboard();

provideMenuRootContext({
  ...transformPropsToContext(props, ['open', 'modal', 'dir']),
  open,
  isUsingKeyboard
});
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
