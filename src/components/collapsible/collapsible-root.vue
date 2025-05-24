<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { provideCollapsibleRootContext } from './context';
import type { CollapsibleRootEmits, CollapsibleRootProps } from './types';

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  open: undefined,
  defaultOpen: false,
  unmountOnHide: true
});

const emit = defineEmits<CollapsibleRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    if (value === undefined) return;
    emit('update:open', value);
  },
  props.defaultOpen || false
);

const { dataDisabled, dataState } = provideCollapsibleRootContext({
  open,
  ...transformPropsToContext(props, ['disabled', 'unmountOnHide'])
});

defineExpose({
  open
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :data-disabled="dataDisabled" :data-state="dataState">
    <slot :open="open" />
  </Primitive>
</template>
