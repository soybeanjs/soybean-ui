<script
  setup
  lang="ts"
  generic="
    T extends DefinedValue = DefinedValue,
    S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { CheckboxGroupRoot } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxCardVariants } from './variants';
import CheckboxCard from './checkbox-card.vue';
import type { CheckboxCardGroupEmits, CheckboxCardGroupOptionData, CheckboxCardGroupProps } from './types';

defineOptions({
  name: 'SCheckboxCardGroup'
});

const props = defineProps<CheckboxCardGroupProps<T, S>>();

const emit = defineEmits<CheckboxCardGroupEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'class',
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
  const variants = checkboxCardVariants();

  return mergeSlotVariants(variants, props.ui, { groupRoot: props.class });
});
</script>

<template>
  <CheckboxGroupRoot
    v-bind="forwardedProps"
    :class="ui.groupRoot"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <CheckboxCard
      v-for="(item, index) in items"
      :key="index"
      v-bind="rootProps"
      :color="color"
      :size="size"
      :shape="shape"
      :label="item.label"
      :value="item.value"
      :icon="item.icon"
      :description="item.description"
      :disabled="disabled || item.disabled"
      :control-props="controlProps"
      :indicator-props="indicatorProps"
      :label-props="labelProps"
    />
  </CheckboxGroupRoot>
</template>
