<script setup lang="ts">
import MenuGroup from './menu-group.vue';
import { provideMenuRadioGroupContext } from './context';
import type { MenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = defineProps<MenuRadioGroupPropsWithPrimitive>();

const modelValue = defineModel<string>('modelValue', { default: '' });

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
