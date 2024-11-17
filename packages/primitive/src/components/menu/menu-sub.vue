<script lang="ts">
import type { Ref } from 'vue';
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useVModel } from '@vueuse/core';
import { PopperRoot } from '../popper';
import { createContext } from '../../_shared';
import { injectMenuContext, provideMenuContext } from './menu-root.vue';
import type { MenuContext } from './menu-root.vue';

export interface MenuSubContext {
  contentId: string;
  triggerId: string;
  trigger: Ref<HTMLElement | undefined>;
  onTriggerChange: (trigger: HTMLElement | undefined) => void;
  parentMenuContext?: MenuContext;
}

export const [injectMenuSubContext, provideMenuSubContext] = createContext<MenuSubContext>('MenuSub');

export interface MenuSubProps {
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
}

export type MenuSubEmits = {
  /** Event handler called when the open state of the submenu changes. */
  'update:open': [payload: boolean];
};

const props = withDefaults(defineProps<MenuSubProps>(), {
  open: undefined
});
const emits = defineEmits<MenuSubEmits>();

const open = useVModel(props, 'open', emits, {
  defaultValue: false,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

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
