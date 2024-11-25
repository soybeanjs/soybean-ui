<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { getCheckedState } from '../checkbox/shared';
import MenuItem from './menu-item.vue';
import { injectMenuRadioGroupContext, provideMenuItemIndicatorContext } from './context';
import type { MenuRadioItemEmits, MenuRadioItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRadioItem'
});

const props = defineProps<MenuRadioItemPropsWithPrimitive>();
const emit = defineEmits<MenuRadioItemEmits>();

const { value } = toRefs(props);
const radioGroupContext = injectMenuRadioGroupContext();
const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);

function onSelect(event: Event) {
  emit('select', event);
  radioGroupContext.onValueChange(value.value);
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
