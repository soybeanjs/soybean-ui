<script setup lang="ts" generic="T extends AcceptableBooleanValue">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { Primitive } from '../primitive';
import { provideMenuRadioGroupContext, useMenuThemeContext } from './context';
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = defineProps<MenuRadioGroupProps<T>>();

const emit = defineEmits<MenuRadioGroupEmits<T>>();

const forwardedProps = useOmitProps(props, ['modelValue', 'defaultValue', 'disabled']);

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.radioGroup, props.class]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    if (isNullish(value)) return;
    emit('update:modelValue', value as NonNullable<T>);
  },
  props.defaultValue
);

provideMenuRadioGroupContext({
  modelValue,
  disabled: computed(() => props.disabled)
});
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cls" role="menu-radio-group">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
