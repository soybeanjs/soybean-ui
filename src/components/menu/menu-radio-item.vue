<script setup lang="ts">
import { computed } from 'vue';
import { getCheckedState, isIndeterminate } from '../checkbox/shared';
import { provideMenuItemIndicatorContext, useMenuRadioGroupContext } from './context';
import MenuItem from './menu-item.vue';
import type { MenuRadioItemEmits, MenuRadioItemProps } from './types';

defineOptions({
  name: 'MenuRadioItem'
});

const props = defineProps<MenuRadioItemProps>();

const emit = defineEmits<MenuRadioItemEmits>();

const {
  modelValue: radioGroupModelValue,
  onModelValueChange,
  disabled: radioGroupDisabled
} = useMenuRadioGroupContext('MenuRadioItem');

const modelValue = computed(() => radioGroupModelValue.value === props.value);

const disabled = computed(() => radioGroupDisabled.value || props.disabled);

const ariaChecked = computed(() => (isIndeterminate(modelValue.value) ? 'mixed' : modelValue.value));

const dataState = computed(() => getCheckedState(modelValue.value));

const onSelect = (event: Event) => {
  emit('select', event);

  onModelValueChange(props.value);
};

provideMenuItemIndicatorContext({
  modelValue
});
</script>

<template>
  <MenuItem
    v-bind="props"
    role="menu-checkbox-item"
    :disabled="disabled"
    :aria-checked="ariaChecked"
    :data-state="dataState"
    @select="onSelect"
  >
    <slot :model-value="modelValue" />
  </MenuItem>
</template>
