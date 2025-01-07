<script setup lang="ts">
import { computed } from 'vue';
import { getCheckedState } from '../checkbox/shared';
import { injectMenuRadioGroupContext, provideMenuItemIndicatorContext } from './context';
import MenuItem from './menu-item.vue';
import type { MenuRadioItemEmits, MenuRadioItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRadioItem'
});

const props = defineProps<MenuRadioItemPropsWithPrimitive>();
const emit = defineEmits<MenuRadioItemEmits>();

const { onValueChange, modelValue: groupModelValue } = injectMenuRadioGroupContext();

const modelValue = computed(() => groupModelValue.value === props.value);

function onSelect(event: Event) {
  emit('select', event);
  onValueChange(props.value);
}

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <MenuItem
    v-bind="props"
    role="menuitemradio"
    :aria-checked="modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="onSelect"
  >
    <slot />
  </MenuItem>
</template>
