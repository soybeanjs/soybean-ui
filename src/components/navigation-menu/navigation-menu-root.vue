<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provideCollectionContext, provideNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from './types';

defineOptions({
  name: 'NavigationMenuRoot'
});

const props = withDefaults(defineProps<NavigationMenuRootProps>(), {
  dir: 'ltr',
  delayDuration: 200,
  skipDelayDuration: 300,
  unmountOnHide: true
});

const emit = defineEmits<NavigationMenuRootEmits>();

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue
) as ShallowRef<string>;

const { onRootElementChange, onActiveTriggerElementChange } = provideNavigationMenuRootContext({
  isRoot: true,
  modelValue,
  ...transformPropsToContext(props, [
    'dir',
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
  <nav :ref="setRootElement" :class="cls" aria-label="Main" data-soybean-navigation-menu :dir="dir">
    <slot :model-value="modelValue" />
  </nav>
</template>
