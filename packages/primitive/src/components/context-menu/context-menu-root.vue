<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { useDirection, useForwardExpose } from '../../composables';
import MenuRoot from '../menu/menu-root.vue';
import { provideContextMenuRootContext } from './context';
import type { ContextMenuRootEmits, ContextMenuRootProps } from './types';

defineOptions({
  name: 'ContextMenuRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  modal: true
});

const emit = defineEmits<ContextMenuRootEmits>();

const { dir: propDir, modal } = toRefs(props);

const dir = useDirection(propDir);

const open = ref(false);

watch(open, value => {
  emit('update:open', value);
});

provideContextMenuRootContext({
  open,
  onOpenChange: (value: boolean) => {
    open.value = value;
  },
  dir,
  modal
});

useForwardExpose();
</script>

<template>
  <MenuRoot v-model:open="open" :dir="dir" :modal="modal">
    <slot />
  </MenuRoot>
</template>
