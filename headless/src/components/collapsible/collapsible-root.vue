<script setup lang="ts">
import { useControllableState, useOmitProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { provideCollapsibleRootContext, useCollapsibleUi } from './context';
import type { CollapsibleRootEmits, CollapsibleRootProps } from './types';

defineOptions({
  name: 'CollapsibleRoot'
});

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  open: undefined,
  defaultOpen: false,
  unmountOnHide: true
});

const emit = defineEmits<CollapsibleRootEmits>();

const forwardedProps = useOmitProps(props, ['open', 'defaultOpen', 'disabled', 'unmountOnHide']);

const cls = useCollapsibleUi('root');

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
  <Primitive v-bind="forwardedProps" :class="cls" :data-disabled="dataDisabled" :data-state="dataState">
    <slot :open="open" />
  </Primitive>
</template>
