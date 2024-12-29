<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useForwardExpose, useId } from '../../composables';
import { MenuRoot } from '../menu';
import { injectMenubarRootContext, provideMenubarMenuContext } from './context';
import type { MenubarMenuProps } from './types';

defineOptions({
  name: 'MenubarMenu'
});

const props = defineProps<MenubarMenuProps>();

const value = useId(props.value);
const { modelValue, onMenuClose, dir } = injectMenubarRootContext();

const triggerElement = ref<HTMLElement>();
const wasKeyboardTriggerOpenRef = ref(false);

const open = computed(() => modelValue.value === value);

function onUpdateOpen(val: boolean) {
  if (val) return;

  // Menu only calls `@update:open` when dismissing so we
  // want to close our MenuBar based on the same events.
  onMenuClose();
}

watch(open, () => {
  if (!open.value) {
    wasKeyboardTriggerOpenRef.value = false;
  }
});

provideMenubarMenuContext({
  value,
  triggerElement,
  triggerId: value,
  contentId: '',
  wasKeyboardTriggerOpenRef
});

useForwardExpose();
</script>

<template>
  <MenuRoot :open="open" :modal="false" :dir="dir" @update:open="onUpdateOpen">
    <slot />
  </MenuRoot>
</template>
