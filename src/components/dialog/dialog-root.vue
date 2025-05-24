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

provideDialogRootContext({
  open,
  ...transformPropsToContext(props, ['modal'])
});
</script>

<template>
  <slot :open="open" />
</template>
