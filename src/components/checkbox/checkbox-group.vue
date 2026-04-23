<script setup lang="ts" generic="T extends CheckboxGroupOptionData = CheckboxGroupOptionData">
import { computed } from 'vue';
import { CheckboxGroupCompact, provideCheckboxUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxVariants } from './variants';
import type { CheckboxGroupEmits, CheckboxGroupOptionData, CheckboxGroupProps } from './types';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = defineProps<CheckboxGroupProps<T>>();

const emit = defineEmits<CheckboxGroupEmits<T['value']>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const ui = computed(() => {
  const variants = checkboxVariants({
    color: props.color,
    size: props.size,
    shape: props.shape,
    orientation: props.orientation
  });

  return mergeSlotVariants(variants, props.ui, { groupRoot: props.class });
});

provideCheckboxUi(ui);
</script>

<template>
  <CheckboxGroupCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)" />
</template>
