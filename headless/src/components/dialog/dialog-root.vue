<script setup lang="ts">
import type { ShallowRef } from 'vue';
import { computed } from 'vue';
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
  modal: true
});

const emit = defineEmits<DialogRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen ?? false
) as ShallowRef<boolean>;

const modal = computed(() => props.isAlert === true || props.modal);

const { onOpenChange } = provideDialogRootContext({
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
