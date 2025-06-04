<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { omitProps } from '../../shared';
import type { DataOrientation } from '../../types';
import { Primitive } from '../primitive';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'Separator'
});

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: false
});

const slots = useSlots();

const rootProps = omitProps(props, ['orientation', 'decorative', 'label', 'labelProps']);

const ORIENTATIONS: DataOrientation[] = ['horizontal', 'vertical'];

const computedOrientation = computed(() =>
  ORIENTATIONS.includes(props.orientation) ? props.orientation : 'horizontal'
);

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() => (computedOrientation.value === 'vertical' ? props.orientation : undefined));

const showLabel = computed(() => props.orientation === 'horizontal' && (slots.default || props.label));
</script>

<template>
  <Primitive
    v-bind="rootProps"
    :data-orientation="computedOrientation"
    :aria-orientation="ariaOrientation"
    :role="decorative ? 'none' : 'separator'"
  >
    <span v-if="showLabel" v-bind="labelProps">
      <slot>{{ label }}</slot>
    </span>
  </Primitive>
</template>
