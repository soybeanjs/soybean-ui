<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import {
  provideCollectionContext,
  provideNavigationMenuRootContext,
  useNavigationMenuRootContext,
  useNavigationMenuThemeContext
} from './context';
import type { NavigationMenuSubEmits, NavigationMenuSubProps } from './types';

defineOptions({
  name: 'NavigationMenuSub'
});

const props = withDefaults(defineProps<NavigationMenuSubProps>(), {
  defaultValue: '',
  orientation: 'horizontal'
});

const emit = defineEmits<NavigationMenuSubEmits>();

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.sub);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (value) {
      emit('update:modelValue', value);
    }
  },
  props.defaultValue
) as ShallowRef<string>;

const rootContext = useNavigationMenuRootContext('NavigationMenuSub');

const { onRootElementChange, onActiveTriggerElementChange } = provideNavigationMenuRootContext({
  ...rootContext,
  isRoot: false,
  modelValue
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
  <div :ref="setRootElement" :class="cls" :data-orientation="orientation" data-soybean-navigation-menu>
    <slot :model-value="modelValue" />
  </div>
</template>
