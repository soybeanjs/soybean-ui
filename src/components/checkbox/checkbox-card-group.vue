<script
  setup
  lang="ts"
  generic="
    T extends DefinedValue = DefinedValue,
    S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { CheckboxCardGroupCompact, provideCheckboxUi } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxCardVariants } from './variants';
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
  'shape'
]);

const ui = computed(() => {
  const variants = checkboxCardVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { groupRoot: props.class });
});

const compactItems = computed(() => props.items as CheckboxCardGroupOptionData<T>[]);

const handleModelValueChange = (value: DefinedValue[]) => {
  emit('update:modelValue', value as T[]);
};

provideCheckboxUi(ui);
</script>

<template>
  <!-- @vue-ignore generic props are validated by CheckboxCardGroupProps/CheckboxCardGroupCompactProps -->
  <CheckboxCardGroupCompact
    v-bind="forwardedProps"
    :items="compactItems"
    :content-class="ui.content"
    :text-content-class="ui.textContent"
    :icon-class="ui.icon"
    :description-class="ui.description"
    @update:model-value="handleModelValueChange"
  />
</template>
