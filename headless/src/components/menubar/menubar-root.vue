<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { useControllableState, useForwardElement, useOmitProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideCollectionContext, provideMenubarRootContext } from './context';
import type { MenubarRootEmits, MenubarRootProps } from './types';

defineOptions({
  name: 'MenubarRoot'
});

const props = withDefaults(defineProps<MenubarRootProps>(), {
  loop: false,
  modelValue: undefined
});

const emit = defineEmits<MenubarRootEmits>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'dir', 'loop']);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
);

const currentTabStopId = shallowRef<string | null>(props.defaultValue ?? props.modelValue ?? null);

watch(modelValue, value => {
  if (!value) return;

  currentTabStopId.value = value;
});

const { onContainerElementChange } = provideCollectionContext();
const [_, setRootElement] = useForwardElement(onContainerElementChange);

const { dir, loop } = provideMenubarRootContext({
  ...transformPropsToContext(props, ['dir', 'loop']),
  currentTabStopId,
  modelValue
});
</script>

<template>
  <RovingFocusGroup
    v-model:current-tab-stop-id="currentTabStopId"
    as-child
    orientation="horizontal"
    :dir="dir"
    :loop="loop"
  >
    <Primitive
      v-bind="forwardedProps"
      :ref="setRootElement"
      :as="as"
      :as-child="asChild"
      role="menubar"
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </RovingFocusGroup>
</template>
