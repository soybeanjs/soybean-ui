<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MenuRoot } from '../menu';
import { useForwardExpose, useId } from '../../composables';
import { injectMenubarRootContext, provideMenubarMenuContext } from './context';
import type { MenubarMenuProps } from './types';

defineOptions({
  name: 'MenubarMenu'
});

const props = defineProps<MenubarMenuProps>();

const value = useId(props.value);
const rootContext = injectMenubarRootContext();
useForwardExpose();

const triggerElement = ref<HTMLElement>();
const wasKeyboardTriggerOpenRef = ref(false);

const open = computed(() => rootContext.modelValue.value === value);

watch(open, () => {
  if (!open.value) wasKeyboardTriggerOpenRef.value = false;
});

provideMenubarMenuContext({
  value,
  triggerElement,
  triggerId: value,
  contentId: '',
  wasKeyboardTriggerOpenRef
});
</script>

<template>
  <MenuRoot
    :open="open"
    :modal="false"
    :dir="rootContext.dir.value"
    @update:open="
      value => {
        // Menu only calls `@update:open` when dismissing so we
        // want to close our MenuBar based on the same events.
        if (!value) rootContext.onMenuClose();
      }
    "
  >
    <slot />
  </MenuRoot>
</template>
