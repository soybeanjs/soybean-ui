<script setup lang="ts">
import { computed } from 'vue';
import { useCollection, useForwardExpose } from '../../composables';
import SliderThumbImpl from './slider-thumb-impl.vue';
import type { SliderThumbPropsWithPrimitive } from './types';

defineOptions({
  name: 'SliderThumb'
});

const props = defineProps<SliderThumbPropsWithPrimitive>();

const { getItems } = useCollection();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const index = computed(() => (thumbElement.value ? getItems(true).findIndex(i => i.ref === thumbElement.value) : -1));
</script>

<template>
  <SliderThumbImpl :ref="forwardRef" v-bind="props" as="span" :index="index">
    <slot />
  </SliderThumbImpl>
</template>
