<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { PopperRoot } from '../popper';
import { providePopoverRootContext } from './context';
import type { PopoverRootEmits, PopoverRootProps } from './types';

defineOptions({
  name: 'PopoverRoot'
});

const props = withDefaults(defineProps<PopoverRootProps>(), {
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<PopoverRootEmits>();

const { modal } = toRefs(props);

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

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
