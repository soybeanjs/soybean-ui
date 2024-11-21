<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import MenuGroup from './menu-group.vue';
import { provideMenuRadioGroupContext } from './context';
import type { MenuRadioGroupEmits, MenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = withDefaults(defineProps<MenuRadioGroupPropsWithPrimitive>(), {
  modelValue: ''
});

const emit = defineEmits<MenuRadioGroupEmits>();

const modelValue = useVModel(props, 'modelValue', emit);

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
