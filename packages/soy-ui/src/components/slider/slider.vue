<script setup lang="ts">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import SSliderRoot from './slider-root.vue';
import SSliderTrack from './slider-track.vue';
import SSliderRange from './slider-range.vue';
import SSliderThumb from './slider-thumb.vue';
import type { SliderEmits, SliderProps } from './types';

defineOptions({
  name: 'SSlider'
});

const { color, trackClass, thumbClass, rangeClass, ...delegatedRootProps } = defineProps<SliderProps>();

const emit = defineEmits<SliderEmits>();

type SlotProps = Omit<SliderProps, 'trackClass' | 'thumbClass' | 'rangeClass'>;

type Slots = {
  default: (props: SlotProps) => any;
  track: (props: SlotProps) => any;
  range: (props: SlotProps) => any;
  thumb: (props: SlotProps) => any;
};

defineSlots<Slots>();

const forwardedRootProps = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <SSliderRoot v-bind="forwardedRootProps">
    <slot v-bind="{ color, ...delegatedRootProps }">
      <slot name="track" v-bind="{ color, ...delegatedRootProps }">
        <SSliderTrack :class="trackClass" :color="color">
          <slot name="range" v-bind="{ color, ...delegatedRootProps }">
            <SSliderRange :class="rangeClass" :color="color" />
          </slot>
        </SSliderTrack>
      </slot>
      <slot name="thumb" v-bind="{ color, ...delegatedRootProps }">
        <SSliderThumb v-for="(_, key) in modelValue" :key="key" :class="thumbClass" :color="color" />
      </slot>
    </slot>
  </SSliderRoot>
</template>
