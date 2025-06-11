<script setup lang="ts">
import { ref, toRef } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { provideDialogRootContext } from './context';
import type { DialogRootEmits, DialogRootProps } from './types';

defineOptions({
  name: 'DialogRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true
});

const emit = defineEmits<DialogRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();
const contentElement = ref<HTMLElement>();

const close = () => {
  open.value = false;
};

provideDialogRootContext({
  open,
  modal: toRef(() => props.modal),
  triggerElement,
  contentElement
});
</script>

<template>
  <slot :open="open" :close="close" />
</template>
