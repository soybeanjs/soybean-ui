<script setup lang="ts">
import { useControllableState } from '../../composables';
import { isNullish, transformPropsToContext } from '../../shared';
import { provideTabsRootContext, useTabsUi } from './context';
import type { TabsRootEmits, TabsRootProps } from './types';

defineOptions({
  name: 'TabsRoot'
});

const props = withDefaults(defineProps<TabsRootProps>(), {
  modelValue: undefined,
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true,
  loop: true
});

const emit = defineEmits<TabsRootEmits>();

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const cls = useTabsUi('root');

const { dir } = provideTabsRootContext({
  ...transformPropsToContext(props, ['dir', 'loop', 'orientation', 'unmountOnHide', 'activationMode']),
  modelValue
});
</script>

<template>
  <div :class="cls" :dir="dir" :data-orientation="props.orientation">
    <slot :model-value="modelValue" />
  </div>
</template>
