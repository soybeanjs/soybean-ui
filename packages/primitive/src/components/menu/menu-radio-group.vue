<script setup lang="ts">
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { createContext } from '../../composables';
import type { MenuGroupProps } from './menu-group.vue';

import MenuGroup from './menu-group.vue';

interface MenuRadioGroupContext {
  modelValue: Ref<string>;
  onValueChange: (payload: string) => void;
}

export interface MenuRadioGroupProps extends MenuGroupProps {
  /** The value of the selected item in the group. */
  modelValue?: string;
}

export type MenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: string];
};

export const [injectMenuRadioGroupContext, provideMenuRadioGroupContext] =
  createContext<MenuRadioGroupContext>('MenuRadioGroup');

const props = withDefaults(defineProps<MenuRadioGroupProps>(), {
  modelValue: ''
});
const emits = defineEmits<MenuRadioGroupEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(props, 'modelValue', emits);

provideMenuRadioGroupContext({
  modelValue,
  onValueChange: payload => {
    modelValue.value = payload;
  }
});
</script>

<template>
  <MenuGroup v-bind="props">
    <slot :model-value="modelValue" />
  </MenuGroup>
</template>
