<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxCompact, provideCheckboxUi } from '@soybeanjs/headless/checkbox';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { checkboxVariants } from './variants';
import type { CheckboxProps, CheckboxEmits } from './types';

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

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideCheckboxUi(ui);
</script>

<template>
  <CheckboxCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot />
  </CheckboxCompact>
</template>
