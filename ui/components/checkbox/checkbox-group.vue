<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends CheckboxGroupOptionData<T> = CheckboxGroupOptionData<T>"
>
import { computed } from 'vue';
import { CheckboxGroupRoot } from '@headless';
import type { DefinedValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { checkboxVariants } from '@variants/checkbox';
import Checkbox from './checkbox.vue';
import type { CheckboxGroupEmits, CheckboxGroupOptionData, CheckboxGroupProps } from './types';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = defineProps<CheckboxGroupProps<T, S>>();

const emit = defineEmits<CheckboxGroupEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'ui',
  'color',
  'size',
  'shape',
  'items',
  'rootProps',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const ui = computed(() => {
  const variants = checkboxVariants();

  return mergeSlotVariants(variants, props.ui);
});
</script>

<template>
  <CheckboxGroupRoot
    v-bind="forwardedProps"
    :class="ui.groupRoot"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <Checkbox
      v-for="(item, index) in items"
      :key="index"
      v-bind="rootProps"
      :color="color"
      :size="size"
      :shape="shape"
      :label="item.label"
      :value="item.value"
      :disabled="disabled || item.disabled"
      :control-props="controlProps"
      :indicator-props="indicatorProps"
      :label-props="labelProps"
    />
  </CheckboxGroupRoot>
</template>
