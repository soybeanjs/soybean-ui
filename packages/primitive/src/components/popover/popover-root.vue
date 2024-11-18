<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { PopperRoot } from '../popper';
import { providePopoverRootContext } from './context';
import type { PopoverRootProps } from './types';

defineOptions({
  name: 'PopoverRoot'
});

const props = withDefaults(defineProps<PopoverRootProps>(), {
  defaultOpen: false,
  open: undefined,
  modal: false
});

const { modal } = toRefs(props);

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});

const triggerElement = ref<HTMLElement>();
const hasCustomAnchor = ref(false);

providePopoverRootContext({
  contentId: '',
  triggerId: '',
  modal,
  open,
  onOpenChange: value => {
    open.value = value;
  },
  onOpenToggle: () => {
    open.value = !open.value;
  },
  triggerElement,
  hasCustomAnchor
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
