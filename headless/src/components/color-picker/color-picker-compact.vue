<script setup lang="ts">
import { useForwardListeners, usePickProps } from '../../composables';
import ColorAreaCompact from '../color-area/color-area-compact.vue';
import ColorFieldCompact from '../color-field/color-field-compact.vue';
import ColorPickerRoot from './color-picker-root.vue';
import ColorSliderCompact from '../color-slider/color-slider-compact.vue';
import ColorSwatchCompact from '../color-swatch/color-swatch-compact.vue';
import ColorSwatchPickerCompact from '../color-swatch-picker/color-swatch-picker-compact.vue';
import PopoverCompact from '../popover/popover-compact.vue';
import SegmentCompact from '../segment/segment-compact.vue';
import { useColorPickerUi } from './context';
import { colorFormats } from './shared';
import ColorPickerTrigger from './color-picker-trigger.vue';
import type { ColorPickerCompactEmits, ColorPickerCompactProps } from './types';

defineOptions({
  name: 'ColorPickerCompact'
});

const props = withDefaults(defineProps<ColorPickerCompactProps>(), {
  open: undefined,
  placement: 'bottom',
  showArrow: true,
  showAlpha: true,
  showFields: true,
  showSwatches: true,
  colorSpace: 'hsl',
  swatches: () => []
});

const emit = defineEmits<ColorPickerCompactEmits>();

const ui = useColorPickerUi();

const listeners = useForwardListeners(emit);

const rootProps = usePickProps(props, [
  'name',
  'required',
  'modelValue',
  'defaultValue',
  'format',
  'defaultFormat',
  'disabled',
  'colorSpace'
]);

const popoverProps = usePickProps(props, [
  'open',
  'defaultOpen',
  'modal',
  'disabled',
  'placement',
  'showArrow',
  'triggerProps',
  'positionerProps',
  'popupProps',
  'closeProps',
  'portalProps',
  'arrowProps'
]);
</script>

<template>
  <ColorPickerRoot
    v-slot="{ color, hexValue, displayFormat, displayFormatLabel, areaChannel, setColor, setFormat }"
    v-bind="rootProps"
    v-on="listeners"
  >
    <PopoverCompact v-bind="popoverProps" v-on="listeners">
      <template #trigger>
        <ColorPickerTrigger v-slot="slotProps">
          <slot name="trigger" v-bind="slotProps" />
        </ColorPickerTrigger>
      </template>
      <div :class="ui.content" data-slot="content">
        <SegmentCompact
          v-bind="segmentProps"
          :class="ui.segment"
          :model-value="displayFormat"
          :items="colorFormats"
          :disabled="disabled"
          @update:model-value="setFormat"
        />
        <ColorAreaCompact
          v-bind="areaProps"
          :class="ui.area"
          :model-value="color"
          :color-space="colorSpace"
          :x-channel="areaChannel.x"
          :y-channel="areaChannel.y"
          :disabled="disabled"
          @update:color="setColor"
        />
        <div :class="ui.sliderSwatch" data-slot="slider-swatch">
          <div :class="ui.sliderRoot" data-slot="slider-root">
            <ColorSliderCompact
              v-bind="hueSliderProps"
              :class="ui.slider"
              :model-value="color"
              channel="hue"
              :color-space="colorSpace"
              :disabled="disabled"
              @update:color="setColor"
            />
            <ColorSliderCompact
              v-if="showAlpha"
              v-bind="alphaSliderProps"
              :class="ui.alphaSlider"
              :model-value="color"
              channel="alpha"
              :color-space="colorSpace"
              :disabled="disabled"
              @update:color="setColor"
            />
          </div>
          <ColorSwatchCompact v-bind="swatchProps" :class="ui.swatch" :color="hexValue" />
        </div>
        <div v-if="showFields" :class="ui.fields" data-slot="fields">
          <ColorFieldCompact
            v-bind="fieldProps"
            :class="ui.field"
            :model-value="hexValue"
            :format="displayFormat"
            :placeholder="displayFormatLabel"
            :disabled="disabled"
            @update:model-value="setColor"
          />
          <ColorFieldCompact
            v-if="showAlpha"
            v-bind="alphaFieldProps"
            :class="ui.alphaField"
            :model-value="color"
            channel="alpha"
            :color-space="colorSpace"
            :disabled="disabled"
            @update:color="setColor"
          />
        </div>
        <ColorSwatchPickerCompact
          v-if="showSwatches && swatches.length"
          v-bind="swatchPickerProps"
          :class="ui.swatchPicker"
          :colors="swatches"
          :model-value="hexValue"
          :disabled="disabled"
          :multiple="false"
          @update:model-value="setColor"
        />
      </div>
    </PopoverCompact>
  </ColorPickerRoot>
</template>
