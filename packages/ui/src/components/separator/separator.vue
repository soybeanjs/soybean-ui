<script setup lang="ts">
import { computed } from 'vue';
import { Separator } from 'radix-vue';
import { cn, separatorVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SeparatorProps } from './types';
import SeparatorLabel from './separator-label.vue';

defineOptions({
  name: 'SSeparator'
});

const props = defineProps<SeparatorProps>();

const delegatedProps = computedOmit(props, ['class', 'labelClass', 'dashed', 'plain', 'orientation', 'align']);

const cls = computed(() => {
  const { align, orientation, dashed } = props;

  const { separator } = separatorVariants({ align, dashed, orientation });

  return cn(separator(), props.class);
});
</script>

<template>
  <Separator v-bind="delegatedProps" :class="cls">
    <SeparatorLabel
      v-if="label || $slots.label"
      :class="labelClass"
      :orientation="orientation"
      :plain="plain"
      :align="align"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
    </SeparatorLabel>
  </Separator>
</template>
