<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { SeparatorLabel, SeparatorRoot, provideSeparatorUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { separatorVariants } from './variants';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'SSeparator'
});

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
});

const slots = useSlots();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'align', 'border', 'label', 'labelProps']);

const showLabel = computed(() => props.orientation === 'horizontal' && (slots.default || props.label));

const ui = computed(() => {
  const variants = separatorVariants({
    size: props.size,
    orientation: props.orientation,
    align: props.align,
    border: props.border
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideSeparatorUi(ui);
</script>

<template>
  <SeparatorRoot v-bind="forwardedProps">
    <SeparatorLabel v-if="showLabel" v-bind="labelProps">
      {{ label }}
    </SeparatorLabel>
  </SeparatorRoot>
</template>
