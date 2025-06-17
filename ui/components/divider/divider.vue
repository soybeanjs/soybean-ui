<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { DividerLabel, DividerRoot, provideDividerThemeContext } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { dividerVariants } from '@variants/divider';
import type { DividerProps } from './types';

defineOptions({
  name: 'SDivider'
});

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal'
});

const slots = useSlots();

const forwardedProps = useOmitProps(props, ['size', 'ui', 'align', 'border', 'label', 'labelProps']);

const showLabel = computed(() => props.orientation === 'horizontal' && (slots.default || props.label));

const ui = computed(() => {
  const variants = dividerVariants({
    size: props.size,
    orientation: props.orientation,
    align: props.align,
    border: props.border
  });

  return mergeSlotVariants(variants, props.ui);
});

provideDividerThemeContext({
  ui
});
</script>

<template>
  <DividerRoot v-bind="forwardedProps">
    <DividerLabel v-if="showLabel" v-bind="labelProps">
      {{ label }}
    </DividerLabel>
  </DividerRoot>
</template>
