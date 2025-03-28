<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { ref, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useForwardExpose, useId } from '../../composables';
import type { StringOrNumber } from '../../types';
import { Primitive } from '../primitive';
import { provideTabsRootContext } from './context';
import type { TabsRootEmits, TabsRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsRoot'
});

const props = withDefaults(defineProps<TabsRootPropsWithPrimitive<T>>(), {
  modelValue: undefined,
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true
});

const emit = defineEmits<TabsRootEmits>();

type Slots = {
  default: (props: { modelValue: T | undefined }) => any;
};

defineSlots<Slots>();

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
  <Primitive :class="props.class" :as="as" :as-child="asChild" :data-orientation="orientation" :dir="dir">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
