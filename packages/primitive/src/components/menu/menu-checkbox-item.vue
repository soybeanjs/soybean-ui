<script setup lang="ts">
import { getCheckedState, isIndeterminate } from '../checkbox/shared';
import MenuItem from './menu-item.vue';
import { provideMenuItemIndicatorContext } from './context';
import type { MenuCheckboxItemEmits, MenuCheckboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuCheckboxItem'
});

const props = defineProps<MenuCheckboxItemPropsWithPrimitive>();

const emit = defineEmits<MenuCheckboxItemEmits>();

const modelValue = defineModel<boolean>({ default: false });

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
    role="menuitemcheckbox"
    v-bind="props"
    :aria-checked="isIndeterminate(modelValue) ? 'mixed' : modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="onSelect"
  >
    <slot :model-value="modelValue" />
  </MenuItem>
</template>
