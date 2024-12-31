<script setup lang="ts">
import { computed } from 'vue';
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

const ariaChecked = computed(() => (isIndeterminate(modelValue.value) ? 'mixed' : modelValue.value));

const dataState = computed(() => getCheckedState(modelValue.value));

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
    role="menu-item-checkbox"
    :aria-checked="ariaChecked"
    :data-state="dataState"
    @select="onSelect"
  >
    <slot :model-value="modelValue" />
  </MenuItem>
</template>
