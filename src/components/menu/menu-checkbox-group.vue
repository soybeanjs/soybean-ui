<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import { provideMenuCheckboxGroupContext } from './context';
import MenuGroup from './menu-group.vue';
import type { MenuCheckboxGroupEmits, MenuCheckboxGroupProps } from './types';

defineOptions({
  name: 'MenuCheckboxGroup'
});

const props = defineProps<MenuCheckboxGroupProps<T>>();

const emit = defineEmits<MenuCheckboxGroupEmits<T>>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'disabled']);

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
  <MenuGroup v-bind="forwardedProps" role="menu-checkbox-group">
    <slot :model-value="modelValue" />
  </MenuGroup>
</template>
