<script setup lang="ts">
import { onWatcherCleanup, watchEffect } from 'vue';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideMenuSubContext, useMenuRootContext } from './context';
import type { MenuSubEmits, MenuSubProps } from './types';

defineOptions({
  name: 'MenuSub',
  inheritAttrs: false
});

const props = withDefaults(defineProps<MenuSubProps>(), {
  open: undefined
});

const emit = defineEmits<MenuSubEmits>();

const subOpen = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const { open } = useMenuRootContext('MenuSub');

// Prevent the parent menu from reopening with open submenus.
watchEffect(() => {
  if (open.value === false) {
    subOpen.value = false;
  }

  onWatcherCleanup(() => {
    subOpen.value = false;
  });
});

provideMenuSubContext({
  subOpen
});
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
