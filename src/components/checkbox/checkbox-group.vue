<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends CheckboxGroupOptionData<T> = CheckboxGroupOptionData<T>"
>
import { computed } from 'vue';
import { CheckboxGroupCompact, provideCheckboxUi } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxVariants } from './variants';
import type { CheckboxGroupEmits, CheckboxGroupOptionData, CheckboxGroupProps } from './types';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = defineProps<CheckboxGroupProps<T, S>>();

const emit = defineEmits<CheckboxGroupEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'ui',
  'color',
  'size',
  'shape'
]);

const ui = computed(() => {
  const variants = checkboxVariants({
    color: props.color,
    size: props.size,
    shape: props.shape,
    orientation: props.orientation
  });

  return mergeSlotVariants(variants, props.ui, { groupRoot: props.class });
});

const compactItems = computed(() => props.items as CheckboxGroupOptionData<T>[]);

const handleModelValueChange = (value: DefinedValue[]) => {
  emit('update:modelValue', value as T[]);
};

provideCheckboxUi(ui);
</script>

<template>
  <!-- @vue-ignore generic props are validated by CheckboxGroupProps/CheckboxGroupCompactProps -->
  <CheckboxGroupCompact
    v-bind="forwardedProps"
    :items="compactItems"
    @update:model-value="handleModelValueChange"
  />
</template>
