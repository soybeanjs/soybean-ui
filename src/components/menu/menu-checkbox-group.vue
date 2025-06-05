<script setup lang="ts" generic="T extends StringOrNumber">
import { computed } from 'vue';
import { useControllableState } from '../../composables';
import type { StringOrNumber } from '../../types';
import { provideMenuCheckboxGroupContext } from './context';
import MenuGroup from './menu-group.vue';
import type { MenuCheckboxGroupEmits, MenuCheckboxGroupProps } from './types';

defineOptions({
  name: 'MenuCheckboxGroup'
});

const props = defineProps<MenuCheckboxGroupProps<T>>();

const emit = defineEmits<MenuCheckboxGroupEmits<T>>();

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
  <MenuGroup v-bind="props" role="menu-checkbox-group">
    <slot :model-value="modelValue" />
  </MenuGroup>
</template>
