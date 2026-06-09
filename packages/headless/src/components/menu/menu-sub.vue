<script setup lang="ts">
import { computed, onWatcherCleanup, watchEffect } from 'vue';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideMenuContext, useMenuContext } from './context';
import type { MenuSubProps, MenuSubEmits } from './types';

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
    emit('update:open', value);
  },
  props.defaultOpen
);

const parentContext = useMenuContext('MenuSub');

const dir = computed(() => parentContext.dir.value);

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
  dir,
  open
});
</script>

<template>
  <PopperRoot :dir="dir">
    <slot />
  </PopperRoot>
</template>
