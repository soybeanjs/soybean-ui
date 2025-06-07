<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isNullish } from '../../shared';
import { provideMenuRadioGroupContext } from './context';
import MenuGroup from './menu-group.vue';
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = defineProps<MenuRadioGroupProps>();

const emit = defineEmits<MenuRadioGroupEmits>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'disabled']);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;
    emit('update:modelValue', value);
  },
  props.defaultValue
);

provideMenuRadioGroupContext({
  modelValue,
  disabled: computed(() => props.disabled)
});
</script>

<template>
  <MenuGroup v-bind="forwardedProps" role="menu-radio-group">
    <slot :model-value="modelValue" />
  </MenuGroup>
</template>
