<script setup lang="ts">
import { computed } from 'vue';
import type { DataOrientation } from '../../types';
import { Primitive } from '../primitive';
import type { SeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'Separator'
});

const props = withDefaults(defineProps<SeparatorPropsWithPrimitive>(), {
  orientation: 'horizontal',
  decorative: false
});

const ORIENTATIONS: DataOrientation[] = ['horizontal', 'vertical'];

const computedOrientation = computed(() => (isValidOrientation(props.orientation) ? props.orientation : 'horizontal'));

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() => (computedOrientation.value === 'vertical' ? props.orientation : undefined));

const semanticProps = computed(() =>
  props.decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation.value, role: 'separator' }
);

function isValidOrientation(_orientation: any): _orientation is DataOrientation {
  return ORIENTATIONS.includes(_orientation);
}
</script>

<template>
  <Primitive
    v-bind="semanticProps"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-orientation="computedOrientation"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>
