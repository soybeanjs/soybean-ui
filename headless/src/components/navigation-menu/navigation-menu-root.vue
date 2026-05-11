<script setup lang="ts">
import { watchEffect } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideCollectionContext, provideNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuRootProps, NavigationMenuRootEmits } from './types';

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
  props.defaultValue ?? ''
);

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
  <nav :ref="setRootElement" data-soybean-navigation-menu :class="cls" :data-orientation="orientation" :dir="dir">
    <slot :model-value="modelValue" />
  </nav>
</template>
