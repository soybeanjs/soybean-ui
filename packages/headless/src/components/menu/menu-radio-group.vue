<script setup lang="ts" generic="T extends AcceptableBooleanValue">
import { computed } from 'vue';
import { useControllableState } from '../../composables';
import type { AcceptableBooleanValue } from '../../types';
import { Primitive } from '../primitive';
import { provideMenuRadioGroupContext, useMenuUi } from './context';
import type { MenuRadioGroupProps, MenuRadioGroupEmits } from './types';

defineOptions({
  name: 'MenuRadioGroup'
});

const props = defineProps<MenuRadioGroupProps<T>>();

const emit = defineEmits<MenuRadioGroupEmits<T>>();

const cls = useMenuUi('radioGroup');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  // @ts-expect-error - The default value can be null
  props.defaultValue ?? null
);

provideMenuRadioGroupContext({
  modelValue,
  disabled: computed(() => props.disabled)
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-soybean-menu-radio-group :class="cls" role="menu-radio-group">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
