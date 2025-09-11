<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import { Primitive } from '../primitive';
import { provideMenuCheckboxGroupContext, useMenuThemeContext } from './context';
import type { MenuCheckboxGroupEmits, MenuCheckboxGroupProps } from './types';

defineOptions({
  name: 'MenuCheckboxGroup'
});

const props = defineProps<MenuCheckboxGroupProps<T>>();

const emit = defineEmits<MenuCheckboxGroupEmits<T>>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'disabled']);

const themeContext = useMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.checkboxGroup);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value || []);
  },
  props.defaultValue
);

provideMenuCheckboxGroupContext({
  modelValue,
  disabled: computed(() => props.disabled)
});
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cls" role="menu-checkbox-group">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
