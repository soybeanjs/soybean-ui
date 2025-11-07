<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { getCheckedState, isIndeterminate, isNullish, isValueEqualOrExist } from '../../shared';
import type { CheckedState } from '../../types';
import { provideMenuItemIndicatorContext, useMenuCheckboxGroupContext, useMenuThemeContext } from './context';
import MenuItem from './menu-item.vue';
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from './types';

defineOptions({
  name: 'MenuCheckboxItem'
});

const props = defineProps<MenuCheckboxItemProps>();

const emit = defineEmits<MenuCheckboxItemEmits>();

const forwardedProps = useOmitProps(props, ['modelValue', 'value', 'disabled']);

const themeContext = useMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.checkboxItem);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? false);
  },
  false
);

const groupContext = useMenuCheckboxGroupContext();

const disabled = computed(() => groupContext?.disabled.value || props.disabled);

const state = computed<CheckedState>(() => {
  if (!isNullish(groupContext?.modelValue?.value)) {
    return isValueEqualOrExist(groupContext?.modelValue.value, props.value);
  }

  if (isNullish(modelValue.value)) {
    return false;
  }

  return modelValue.value === 'indeterminate' ? 'indeterminate' : modelValue.value;
});

const dataState = computed(() => getCheckedState(state.value));

const ariaChecked = computed(() => (isIndeterminate(state.value) ? 'mixed' : state.value));

const onSelect = (event: Event) => {
  emit('select', event);

  if (isIndeterminate(modelValue.value)) {
    modelValue.value = true;
    return;
  }

  modelValue.value = !modelValue.value;

  if (props.value) {
    groupContext?.onModelValueChange(props.value);
  }
};

provideMenuItemIndicatorContext({
  modelValue: state
});
</script>

<template>
  <MenuItem
    v-bind="forwardedProps"
    :class="cls"
    role="menu-checkbox-item"
    :disabled="disabled"
    :data-state="dataState"
    :aria-checked="ariaChecked"
    @select="onSelect"
  >
    <slot :model-value="state" />
  </MenuItem>
</template>
