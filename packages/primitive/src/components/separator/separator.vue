<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import type { DataOrientation } from '../../types';
import type { SeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'Separator'
});

const { class: className, orientation = 'horizontal', decorative = false } = defineProps<SeparatorPropsWithPrimitive>();

const ORIENTATIONS: DataOrientation[] = ['horizontal', 'vertical'];

const computedOrientation = computed(() => (isValidOrientation(orientation) ? orientation : 'horizontal'));

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() => (computedOrientation.value === 'vertical' ? orientation : undefined));

const semanticProps = computed(() =>
  decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation.value, role: 'separator' }
);

function isValidOrientation(_orientation: any): _orientation is DataOrientation {
  return ORIENTATIONS.includes(_orientation);
}
</script>

<template>
  <Primitive :class="className" :as :as-child :data-orientation="computedOrientation" v-bind="semanticProps">
    <slot />
  </Primitive>
</template>

<style scoped></style>
