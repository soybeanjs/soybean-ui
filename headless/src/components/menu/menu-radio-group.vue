<script setup lang="ts" generic="T extends AcceptableBooleanValue">
import { computed } from 'vue';
import { useControllableState } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import { Primitive } from '../primitive';
import { provideMenuRadioGroupContext, useMenuUi } from './context';
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = defineProps<MenuRadioGroupProps<T>>();

const emit = defineEmits<MenuRadioGroupEmits<T>>();

const cls = useMenuUi('radioGroup');

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
  <Primitive :as="as" :as-child="asChild" :class="cls" role="menu-radio-group">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
