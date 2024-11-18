<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { PopperRoot } from '../popper';
import { injectMenuContext, provideMenuContext, provideMenuSubContext } from './context';
import type { MenuSubProps } from './types';

defineOptions({
  name: 'MenuSub'
});

defineProps<MenuSubProps>();

const open = defineModel<boolean>('open', { default: false });

const parentMenuContext = injectMenuContext();
const trigger = ref<HTMLElement>();
const content = ref<HTMLElement>();

// Prevent the parent menu from reopening with open submenus.
watchEffect(cleanupFn => {
  if (parentMenuContext?.open.value === false) open.value = false;
  cleanupFn(() => (open.value = false));
});

provideMenuContext({
  open,
  onOpenChange: value => {
    open.value = value;
  },
  content,
  onContentChange: element => {
    content.value = element;
  }
});

provideMenuSubContext({
  triggerId: '',
  contentId: '',
  trigger,
  onTriggerChange: element => {
    trigger.value = element;
  }
});
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
