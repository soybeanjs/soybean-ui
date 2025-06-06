<script setup lang="ts">
import { onWatcherCleanup, watchEffect } from 'vue';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideMenuContext, provideMenuSubContext, useMenuContext } from './context';
import type { MenuSubEmits, MenuSubProps } from './types';

defineOptions({
  name: 'MenuSub',
  inheritAttrs: false
});

const props = withDefaults(defineProps<MenuSubProps>(), {
  open: undefined
});

const emit = defineEmits<MenuSubEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const parentContext = useMenuContext('MenuSub');

// Prevent the parent menu from reopening with open submenus.
watchEffect(() => {
  if (parentContext.open.value === false) {
    open.value = false;
  }

  onWatcherCleanup(() => {
    open.value = false;
  });
});

provideMenuContext({
  open
});

provideMenuSubContext();
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
