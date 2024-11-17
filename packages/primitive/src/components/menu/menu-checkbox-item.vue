<script lang="ts">
import { useVModel } from '@vueuse/core';
import type { CheckedState } from './utils';
import type { MenuItemEmits, MenuItemProps } from './MenuItem.vue';
</script>

<script setup lang="ts">
import { getCheckedState, isIndeterminate } from './utils';
import MenuItem from './menu-item.vue';
import { provideMenuItemIndicatorContext } from './menu-item-indicator.vue';

export type MenuCheckboxItemEmits = MenuItemEmits & {
  /** Event handler called when the checked state changes. */
  'update:modelValue': [payload: boolean];
};

export interface MenuCheckboxItemProps extends MenuItemProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
}

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
  modelValue: false
});
const emits = defineEmits<MenuCheckboxItemEmits>();

defineSlots<{
  default: (props: {
    /** Current modelValue state */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(props, 'modelValue', emits);

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <MenuItem
    role="menuitemcheckbox"
    v-bind="props"
    :aria-checked="isIndeterminate(modelValue) ? 'mixed' : modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="
      async event => {
        emits('select', event);
        if (isIndeterminate(modelValue)) {
          modelValue = true;
        } else {
          modelValue = !modelValue;
        }
      }
    "
  >
    <slot :model-value="modelValue" />
  </MenuItem>
</template>
