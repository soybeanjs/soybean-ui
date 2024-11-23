<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { getCheckedState, isIndeterminate } from '../checkbox/shared';
import MenuItem from './menu-item.vue';
import { provideMenuItemIndicatorContext } from './context';
import type { MenuCheckboxItemEmits, MenuCheckboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuCheckboxItem'
});

const props = withDefaults(defineProps<MenuCheckboxItemPropsWithPrimitive>(), {
  modelValue: false
});

const emit = defineEmits<MenuCheckboxItemEmits>();

const modelValue = useVModel(props, 'modelValue', emit);

function onSelect(event: Event) {
  emit('select', event);

  if (isIndeterminate(modelValue.value)) {
    modelValue.value = true;
  } else {
    modelValue.value = !modelValue.value;
  }
}

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <MenuItem
    v-bind="props"
    role="menuitemcheckbox"
    :aria-checked="isIndeterminate(modelValue) ? 'mixed' : modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="onSelect"
  >
    <slot :model-value="modelValue" />
  </MenuItem>
</template>
