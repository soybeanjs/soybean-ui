<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { MenuItemEmits, MenuItemProps } from './MenuItem.vue';

import { getCheckedState } from './utils';
import MenuItem from './menu-item.vue';
import { injectMenuRadioGroupContext } from './menu-radio-group.vue';
import { provideMenuItemIndicatorContext } from './menu-item-indicator.vue';

export type MenuRadioItemEmits = MenuItemEmits;

export interface MenuRadioItemProps extends MenuItemProps {
  /** The unique value of the item. */
  value: string;
}

const props = defineProps<MenuRadioItemProps>();
const emits = defineEmits<MenuRadioItemEmits>();

const { value } = toRefs(props);
const radioGroupContext = injectMenuRadioGroupContext();
const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <MenuItem
    role="menuitemradio"
    v-bind="props"
    :aria-checked="modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="
      async event => {
        emits('select', event);
        radioGroupContext.onValueChange(value);
      }
    "
  >
    <slot />
  </MenuItem>
</template>
