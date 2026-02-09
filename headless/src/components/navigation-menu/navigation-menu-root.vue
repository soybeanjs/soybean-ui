<script setup lang="ts">
import { watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideCollectionContext, provideNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from './types';

defineOptions({
  name: 'NavigationMenuRoot'
});

const props = withDefaults(defineProps<NavigationMenuRootProps>(), {
  dir: 'ltr',
  orientation: 'horizontal',
  delayDuration: 200,
  skipDelayDuration: 300,
  unmountOnHide: true
});

const emit = defineEmits<NavigationMenuRootEmits>();

const cls = useNavigationMenuUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value!);
  },
  props.defaultValue
) as ShallowRef<string>;

const { onRootElementChange, onActiveTriggerElementChange } = provideNavigationMenuRootContext({
  isRoot: true,
  modelValue,
  ...transformPropsToContext(props, [
    'dir',
    'orientation',
    'unmountOnHide',
    'skipDelayDuration',
    'delayDuration',
    'disableClickTrigger',
    'disableHoverTrigger',
    'disablePointerLeaveClose'
  ])
});

const { onContainerElementChange, getOrderedElements } = provideCollectionContext();

const [_, setRootElement] = useForwardElement(el => {
  onRootElementChange(el);
  onContainerElementChange(el);
});

watchEffect(() => {
  if (!modelValue.value) return;

  const activeEl = getOrderedElements().find(el => el.id.includes(modelValue.value!));

  if (activeEl) {
    onActiveTriggerElementChange(activeEl);
  }
});
</script>

<template>
  <nav :ref="setRootElement" :class="cls" :data-orientation="orientation" data-soybean-navigation-menu :dir="dir">
    <slot :model-value="modelValue" />
  </nav>
</template>
