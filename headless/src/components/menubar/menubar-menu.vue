<script setup lang="ts">
import { computed, useId, watch } from 'vue';
import { MenuRoot } from '../menu';
import { provideMenubarMenuContext, useMenubarRootContext } from './context';
import type { MenubarMenuProps } from './types';

defineOptions({
  name: 'MenubarMenu'
});

const props = defineProps<MenubarMenuProps>();

const fallbackValue = useId();

const { dir, modelValue, onMenuClose } = useMenubarRootContext('MenubarMenu');

const value = computed(() => props.value || `soybean-menubar-${fallbackValue}`);
const open = computed(() => modelValue.value === value.value);

const { wasKeyboardTriggerOpenRef } = provideMenubarMenuContext({
  value
});

watch(open, isOpen => {
  if (isOpen) return;

  wasKeyboardTriggerOpenRef.value = false;
});
</script>

<template>
  <MenuRoot
    :open="open"
    :modal="false"
    :dir="dir"
    @update:open="isOpen => {
      if (!isOpen) {
        onMenuClose(value.value);
      }
    }"
  >
    <slot :open="open" />
  </MenuRoot>
</template>
