<script setup lang="ts">
import { toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useForwardExpose } from '../../composables';
import MenuRoot from '../menu/menu-root.vue';
import { provideDropdownMenuRootContext } from './context';
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from './types';

defineOptions({
  name: 'DropdownMenuRoot'
});

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  modal: true,
  open: undefined
});

const emit = defineEmits<DropdownMenuRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

provideDropdownMenuRootContext({
  open,
  modal,
  dir
});

useForwardExpose();
</script>

<template>
  <MenuRoot v-model:open="open" :dir="dir" :modal="modal">
    <slot :open="open" />
  </MenuRoot>
</template>
