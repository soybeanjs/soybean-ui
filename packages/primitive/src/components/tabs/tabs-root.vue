<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { ref, toRefs } from 'vue';
import { Primitive } from '../primitive';
import { useDirection, useForwardExpose, useId } from '../../composables';
import type { StringOrNumber } from '../../types';
import { provideTabsRootContext } from './context';
import type { TabsRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'SoybeanTabsRoot'
});

const props = withDefaults(defineProps<TabsRootPropsWithPrimitive<T>>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true
});

const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
useForwardExpose();

const modelValue = defineModel<T>({ default: () => props.defaultValue });

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
  <Primitive :dir="dir" :data-orientation="orientation" :as :as-child>
    <slot :model-value="modelValue" />
  </Primitive>
</template>
