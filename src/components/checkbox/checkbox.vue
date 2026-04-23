<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxCompact, provideCheckboxUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxVariants } from './variants';
import type { CheckboxEmits, CheckboxProps } from './types';

defineOptions({
  name: 'SCheckbox'
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined
});

const emit = defineEmits<CheckboxEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const ui = computed(() => {
  const variants = checkboxVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCheckboxUi(ui);
</script>

<template>
  <CheckboxCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot />
  </CheckboxCompact>
</template>
