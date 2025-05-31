<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
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

const open = useControllableState(
  () => props.open,
  value => {
    if (value === undefined) return;
    emit('update:open', value);
  },
  props.defaultOpen
);

const { onOpenChange } = provideDialogRootContext({
  open,
  ...transformPropsToContext(props, ['modal'])
});

const close = () => {
  onOpenChange(false);
};
</script>

<template>
  <slot :open="open" :close="close" />
</template>
