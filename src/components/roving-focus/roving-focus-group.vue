<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { provideRovingFocusGroupContext } from './context';
import type { RovingFocusGroupEmits, RovingFocusGroupProps } from './types';

defineOptions({
  name: 'RovingFocusGroup'
});

const props = withDefaults(defineProps<RovingFocusGroupProps>(), {
  loop: false,
  orientation: undefined,
  preventScrollOnEntryFocus: false
});

const emit = defineEmits<RovingFocusGroupEmits>();

const { onContainerElementChange, rovingFocusGroupProps, rovingFocusGroupListeners, getOrderedItems } =
  provideRovingFocusGroupContext({
    ...transformPropsToContext(props, [
      'loop',
      'orientation',
      'dir',
      'currentTabStopId',
      'defaultCurrentTabStopId',
      'preventScrollOnEntryFocus'
    ]),
    onUpdateCurrentTabStopId: (value: string | null | undefined) => {
      emit('update:currentTabStopId', value);
    },
    onEntryFocus: (event: Event) => {
      emit('entryFocus', event);
    }
  });

const [_, setContainerElement] = useForwardElement(onContainerElementChange);

defineExpose({
  getItems: getOrderedItems
});
</script>

<template>
  <Primitive
    v-bind="{ ...props, ...rovingFocusGroupProps }"
    :ref="setContainerElement"
    v-on="rovingFocusGroupListeners"
  >
    <slot />
  </Primitive>
</template>
