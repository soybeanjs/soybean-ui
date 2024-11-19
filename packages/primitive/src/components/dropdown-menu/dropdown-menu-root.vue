<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { MenuRoot } from '../menu';
import { useDirection, useForwardExpose } from '../../composables';
import { provideDropdownMenuRootContext } from './context';
import type { DropdownMenuRootProps } from './types';

defineOptions({
  name: 'DropdownMenuRoot'
});

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  modal: true,
  open: undefined
});

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

useForwardExpose();

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});

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
