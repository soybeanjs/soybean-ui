<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useControllableState, usePickProps } from '@soybeanjs/headless/composables';
import { areColorsEqual, formatColor, toColorObject } from '@soybeanjs/headless/shared';
import type { ColorFormat, ColorSpace, ColorValue } from '@soybeanjs/headless/shared';
import { mergeSlotVariants } from '@/theme';
import SButton from '../button/button.vue';
import SColorArea from '../color-area/color-area.vue';
import SColorField from '../color-field/color-field.vue';
import SColorSlider from '../color-slider/color-slider.vue';
import SColorSwatchPicker from '../color-swatch-picker/color-swatch-picker.vue';
import SColorSwatch from '../color-swatch/color-swatch.vue';
import SPopover from '../popover/popover.vue';
import SSegment from '../segment/segment.vue';
import { COLOR_PICKER_FORMATS, DEFAULT_COLOR_PICKER_SWATCHES, resolveColorPickerFormat } from './shared';
import { colorPickerVariants } from './variants';
import type { ColorPickerEmits, ColorPickerProps } from './types';

defineOptions({
  name: 'SColorPicker'
});

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: undefined,
  defaultValue: '#7f007f',
  format: undefined,
  defaultFormat: undefined,
  open: undefined,
  defaultOpen: false,
  modal: false,
  placement: 'bottom',
  showArrow: true,
  disabled: false,
  showAlpha: true,
  showFields: true,
  showSwatches: true,
  colorSpace: 'hsl',
  swatches: () => DEFAULT_COLOR_PICKER_SWATCHES
});

const emit = defineEmits<ColorPickerEmits>();

const formatValue = useControllableState<ColorFormat | undefined>(
  () => props.format,
  value => {
    emit('update:format', value as ColorFormat);
  },
  resolveColorPickerFormat(props.defaultFormat, props.modelValue ?? props.defaultValue)
);

const currentColor = shallowRef<ColorValue>(props.modelValue ?? props.defaultValue);
const lastEmittedFormattedValue = shallowRef<string>();

const ui = computed(() => {
  const variants = colorPickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

const hexValue = computed(() => formatColor(currentColor.value, 'hex'));
const displayFormat = computed(() => resolveColorPickerFormat(formatValue.value, currentColor.value));
const displayValue = computed(() => formatColor(currentColor.value, displayFormat.value));
const displayFormatLabel = computed(() => displayFormat.value.toUpperCase());
const formattedFieldProps = computed(() => (displayFormat.value === 'hex' ? props.hexFieldProps : props.fieldProps));
const alphaFieldProps = computed(() => props.alphaFieldProps ?? props.fieldProps);
const formatItems = computed(() => COLOR_PICKER_FORMATS.map(item => ({ value: item, label: item.toUpperCase() })));
const areaXChannel = computed(() => (props.colorSpace === 'oklch' ? 'chroma' : 'saturation'));
const areaYChannel = computed(() => (props.colorSpace === 'hsv' ? 'brightness' : 'lightness'));

const popoverProps = usePickProps(props, [
  'open',
  'defaultOpen',
  'modal',
  'placement',
  'showArrow',
  'positionerProps',
  'popupProps',
  'triggerProps',
  'closeProps',
  'portalProps',
  'arrowProps'
]);

watch(
  () => props.modelValue,
  value => {
    if (value == null) {
      return;
    }

    if (typeof value === 'string' && value === lastEmittedFormattedValue.value) {
      return;
    }

    if (areColorsEqual(value, currentColor.value)) {
      return;
    }

    currentColor.value = value;
  },
  { immediate: true }
);

function getNormalizedColor(nextColor: ColorValue) {
  const colorSpace: ColorSpace = props.colorSpace;

  return toColorObject(nextColor, colorSpace);
}

function syncColor(nextColor: ColorValue) {
  const formatted = formatColor(nextColor, displayFormat.value);

  currentColor.value = nextColor;
  lastEmittedFormattedValue.value = formatted;
  emit('update:modelValue', formatted);
  emit('update:color', getNormalizedColor(nextColor));
  emit('change', formatted);
}

function handleFormatChange(nextFormat: ColorFormat) {
  if (displayFormat.value === nextFormat) {
    return;
  }

  formatValue.value = nextFormat;
}

function handleDisplayValueChange(value: string) {
  syncColor(value);
}

function handleSwatchValueChange(value: string | string[]) {
  if (typeof value === 'string') {
    syncColor(value);
  }
}
</script>

<template>
  <SPopover v-bind="popoverProps" :class="ui.popup" :size="size" @update:open="emit('update:open', $event)">
    <template #trigger>
      <slot name="trigger" :color="currentColor" :hex="hexValue" :value="displayValue" :format="displayFormat">
        <SButton v-bind="triggerButtonProps" :size="size" :disabled="disabled" color="accent" variant="pure">
          <SColorSwatch v-bind="swatchProps" :class="ui.triggerSwatch" :color="hexValue" :size="size" shape="circle" />
          <span :class="ui.triggerValue">{{ displayValue }}</span>
        </SButton>
      </slot>
    </template>

    <div :class="ui.content">
      <SSegment
        :class="ui.segment"
        :model-value="displayFormat"
        :items="formatItems"
        :size="size"
        fill="full"
        :disabled="disabled"
        @update:model-value="handleFormatChange"
      />
      <SColorArea
        v-bind="areaProps"
        :class="ui.area"
        :model-value="currentColor"
        :color-space="colorSpace"
        :x-channel="areaXChannel"
        :y-channel="areaYChannel"
        :disabled="disabled"
        @update:color="syncColor"
      />
      <div :class="ui.sliderSwatch">
        <div :class="ui.sliderRoot">
          <SColorSlider
            v-bind="hueSliderProps"
            :size="size"
            :model-value="currentColor"
            channel="hue"
            :color-space="colorSpace"
            :disabled="disabled"
            @update:color="syncColor"
          />
          <SColorSlider
            v-if="showAlpha"
            v-bind="alphaSliderProps"
            :size="size"
            :model-value="currentColor"
            channel="alpha"
            :color-space="colorSpace"
            :disabled="disabled"
            @update:color="syncColor"
          />
        </div>
        <SColorSwatch v-bind="swatchProps" :size="size" :color="hexValue" :class="ui.swatch" />
      </div>
      <div v-if="showFields" :class="ui.fields">
        <SColorField
          v-bind="formattedFieldProps"
          :size="size"
          :class="ui.field"
          :model-value="hexValue"
          :format="displayFormat"
          :placeholder="displayFormatLabel"
          :disabled="disabled"
          @update:model-value="handleDisplayValueChange"
        />
        <SColorField
          v-if="showAlpha"
          v-bind="alphaFieldProps"
          :size="size"
          :class="ui.alphaField"
          :model-value="currentColor"
          channel="alpha"
          :color-space="colorSpace"
          :disabled="disabled"
          @update:color="syncColor"
        />
      </div>

      <SColorSwatchPicker
        v-if="showSwatches && swatches.length"
        v-bind="swatchPickerProps"
        :size="size"
        :class="ui.swatches"
        :colors="swatches"
        :model-value="hexValue"
        :disabled="disabled"
        @update:model-value="handleSwatchValueChange"
      />
    </div>
  </SPopover>
</template>
