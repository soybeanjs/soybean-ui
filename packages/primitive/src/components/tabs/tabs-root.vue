<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { ref, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useDirection, useForwardExpose, useId } from '../../composables';
import type { StringOrNumber } from '../../types';
import { provideTabsRootContext } from './context';
import type { TabsRootEmits, TabsRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsRoot'
});

const props = withDefaults(defineProps<TabsRootPropsWithPrimitive<T>>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true
});

const emit = defineEmits<TabsRootEmits>();

const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
useForwardExpose();

const modelValue = useVModel<TabsRootPropsWithPrimitive<T>, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emit,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false
  }
);

const tabsList = ref<HTMLElement>();

provideTabsRootContext({
  modelValue,
  changeModelValue: (value: StringOrNumber) => {
    modelValue.value = value as T;
  },
  orientation,
  dir,
  unmountOnHide,
  activationMode: props.activationMode,
  baseId: useId(undefined, 'soybean-tabs'),
  tabsList
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" :dir="dir" :data-orientation="orientation">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
