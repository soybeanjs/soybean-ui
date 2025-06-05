<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { useControllableState } from '../../composables';
import { MenuRoot } from '../menu';
import { provideDropdownMenuRootContext } from './context';
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from './types';

defineOptions({
  name: 'DropdownMenuRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<DropdownMenuRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const { dir } = provideDropdownMenuRootContext({
  ...transformPropsToContext(props, ['open', 'modal', 'dir']),
  open
});
</script>

<template>
  <MenuRoot v-model:open="open" :default-open="defaultOpen" :dir="dir" :modal="modal">
    <slot :open="open" />
  </MenuRoot>
</template>
