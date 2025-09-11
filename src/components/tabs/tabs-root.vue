<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isNullish, transformPropsToContext } from '../../shared';
import { provideTabsRootContext, useTabsThemeContext } from './context';
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

const forwardedProps = useOmitProps(props, [
  'modelValue',
  'defaultValue',
  'dir',
  'orientation',
  'activationMode',
  'unmountOnHide'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const themeContext = useTabsThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const { dir } = provideTabsRootContext({
  ...transformPropsToContext(props, ['dir', 'loop', 'orientation', 'unmountOnHide', 'activationMode']),
  modelValue
});
</script>

<template>
  <div v-bind="forwardedProps" :class="cls" :dir="dir" :data-orientation="orientation">
    <slot :model-value="modelValue" />
  </div>
</template>
