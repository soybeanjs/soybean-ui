<script setup lang="ts">
import { computed } from 'vue';
import { transformPropsToContext } from '../../shared';
import { useDirection } from '../config-provider/context';
import { useControllableState } from '../../composables';
import { provideDialogRootContext } from './context';
import type { DialogRootProps, DialogRootEmits } from './types';

defineOptions({
  name: 'DialogRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<DialogRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen ?? false
);

const dir = useDirection(() => props.dir);

const modal = computed(() => props.isAlert === true || props.modal);

const { onOpenChange } = provideDialogRootContext({
  dir,
  open,
  modal,
  ...transformPropsToContext(props, ['isAlert', 'alertType'])
});

const close = () => {
  onOpenChange(false);
};
</script>

<template>
  <slot :open="open" :close="close" />
</template>
