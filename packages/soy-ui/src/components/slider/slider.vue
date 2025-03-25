<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
import SSliderRoot from './slider-root.vue';
import SSliderTrack from './slider-track.vue';
import SSliderRange from './slider-range.vue';
import SSliderThumb from './slider-thumb.vue';
import type { SliderEmits, SliderProps } from './types';

defineOptions({
  name: 'SSlider'
});

const { class: cls, color, size: _size, ui, ...delegatedRootProps } = defineProps<SliderProps>();

const emit = defineEmits<SliderEmits>();

type SlotProps = Omit<SliderProps, 'trackClass' | 'thumbClass' | 'rangeClass'>;

type Slots = {
  default: (props: SlotProps) => any;
  track: (props: SlotProps) => any;
  range: (props: SlotProps) => any;
  thumb: (props: SlotProps) => any;
};

defineSlots<Slots>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const forwardedRootProps = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <SSliderRoot v-bind="forwardedRootProps" :class="cls || ui?.root" :size="size">
    <slot v-bind="{ color, ...delegatedRootProps }">
      <slot name="track" v-bind="{ color, ...delegatedRootProps }">
        <SSliderTrack :class="ui?.track" :color="color" :size="size">
          <slot name="range" v-bind="{ color, ...delegatedRootProps }">
            <SSliderRange :class="ui?.range" :color="color" />
          </slot>
        </SSliderTrack>
      </slot>
      <slot name="thumb" v-bind="{ color, ...delegatedRootProps }">
        <SSliderThumb v-for="(_, key) in modelValue" :key="key" :class="ui?.thumb" :color="color" :size="size" />
      </slot>
    </slot>
  </SSliderRoot>
</template>
