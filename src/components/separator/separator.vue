<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { SeparatorCompact, provideSeparatorUi } from '@soybeanjs/headless/separator';
import { mergeVariants } from '@/theme';
import { separatorVariants } from './variants';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'SSeparator'
});

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
});

const slots = useSlots();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'align', 'border']);

const ui = computed(() => {
  const variants = separatorVariants({
    size: props.size,
    orientation: props.orientation,
    align: props.align,
    border: props.border
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideSeparatorUi(ui);
</script>

<template>
  <SeparatorCompact v-bind="forwardedProps">
    <template v-if="slots.default" #label>
      <slot />
    </template>
  </SeparatorCompact>
</template>
