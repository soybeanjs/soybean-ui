<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { MenuRoot } from '../menu';
import { useDirection, useForwardExpose } from '../../composables';
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

useForwardExpose();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.open,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();

const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

provideDropdownMenuRootContext({
  open,
  onOpenChange: value => {
    open.value = value;
  },
  onOpenToggle: () => {
    open.value = !open.value;
  },
  triggerId: '',
  triggerElement,
  contentId: '',
  modal,
  dir
});
</script>

<template>
  <MenuRoot v-model:open="open" :dir="dir" :modal="modal">
    <slot :open="open" />
  </MenuRoot>
</template>
