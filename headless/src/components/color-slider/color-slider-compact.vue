<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import ColorSliderRoot from './color-slider-root.vue';
import ColorSliderThumb from './color-slider-thumb.vue';
import ColorSliderTrack from './color-slider-track.vue';
import type { ColorSliderCompactEmits, ColorSliderCompactProps } from './types';

defineOptions({
  name: 'ColorSliderCompact'
});

const props = defineProps<ColorSliderCompactProps>();

const emit = defineEmits<ColorSliderCompactEmits>();

const forwardedProps = useOmitProps(props, ['trackProps', 'thumbProps', 'onChange']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <ColorSliderRoot v-bind="forwardedProps" v-on="listeners">
    <ColorSliderTrack v-bind="trackProps" />
    <ColorSliderThumb v-bind="thumbProps" />
  </ColorSliderRoot>
</template>
