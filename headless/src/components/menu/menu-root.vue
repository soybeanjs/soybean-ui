<script setup lang="ts">
import { useControllableState, useIsUsingKeyboard } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { PopperRoot } from '../popper';
import { provideMenuContext, provideMenuRootContext } from './context';
import type { MenuRootEmits, MenuRootProps } from './types';

defineOptions({
  name: 'MenuRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<MenuRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const isUsingKeyboard = useIsUsingKeyboard();

const onClose = () => {
  open.value = false;
};

provideMenuContext({
  open,
  isRoot: true
});

provideMenuRootContext({
  ...transformPropsToContext(props, ['modal', 'dir']),
  onClose,
  isUsingKeyboard
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
