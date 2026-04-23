<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxCardCompact, provideCheckboxCardUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxCardVariants } from './variants';
import type { CheckboxCardProps, CheckboxEmits } from './types';

defineOptions({
  name: 'SCheckboxCard'
});

const props = withDefaults(defineProps<CheckboxCardProps>(), {
  modelValue: undefined
});

const emit = defineEmits<CheckboxEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const ui = computed(() => {
  const variants = checkboxCardVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCheckboxCardUi(ui);
</script>

<template>
  <CheckboxCardCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template #description>
      <slot name="description" />
    </template>
    <slot />
  </CheckboxCardCompact>
</template>
