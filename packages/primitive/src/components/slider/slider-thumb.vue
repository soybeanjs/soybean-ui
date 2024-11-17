<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { useCollection } from '../../composables';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import SliderThumbImpl from './slider-thumb-impl.vue';

export interface SliderThumbProps extends PrimitiveProps {}

const props = defineProps<SliderThumbProps>();
const { getItems } = useCollection();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const index = computed(() => (thumbElement.value ? getItems().findIndex(i => i.ref === thumbElement.value) : -1));
</script>

<template>
  <SliderThumbImpl :ref="forwardRef" v-bind="props" :index="index">
    <slot />
  </SliderThumbImpl>
</template>
