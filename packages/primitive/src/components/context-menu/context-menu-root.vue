<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, toRefs, watch } from 'vue';
import type { MenuEmits, MenuProps } from '../menu';
import { MenuRoot } from '../menu';
import type { Direction } from '../../composables/types';
import { createContext, useDirection, useForwardExpose } from '../../composables';

type ContextMenuRootContext = {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  modal: Ref<boolean>;
  dir: Ref<Direction>;
};

export interface ContextMenuRootProps extends Omit<MenuProps, 'open'> {}
export type ContextMenuRootEmits = MenuEmits;

export const [injectContextMenuRootContext, provideContextMenuRootContext] =
  createContext<ContextMenuRootContext>('ContextMenuRoot');

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  modal: true
});
const emit = defineEmits<ContextMenuRootEmits>();
const { dir: propDir, modal } = toRefs(props);
useForwardExpose();
const dir = useDirection(propDir);

const open = ref(false);

provideContextMenuRootContext({
  open,
  onOpenChange: (value: boolean) => {
    open.value = value;
  },
  dir,
  modal
});

watch(open, value => {
  emit('update:open', value);
});
</script>

<template>
  <MenuRoot v-model:open="open" :dir="dir" :modal="modal">
    <slot />
  </MenuRoot>
</template>
