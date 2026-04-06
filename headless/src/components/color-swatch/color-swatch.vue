<script setup lang="ts">
import { computed } from 'vue';
import { formatColor, getColorContrast, getColorLabel, toColorObject } from '../../shared';
import { Primitive } from '../primitive';
import type { ColorSwatchProps } from './types';

defineOptions({
  name: 'ColorSwatch'
});

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  as: 'div',
  color: ''
});

const colorString = computed(() => (props.color ? formatColor(props.color, 'rgb') : 'transparent'));
const colorValue = computed(() => toColorObject(props.color, 'rgb'));
const alpha = computed(() => colorValue.value.alpha);
const isNoColor = computed(() => !props.color || alpha.value <= 0);
const label = computed(() => getColorLabel(props.color, props.label));
const colorContrast = computed(() => getColorContrast(props.color));
</script>

<template>
  <Primitive
    role="img"
    :aria-label="label"
    aria-roledescription="color swatch"
    :as="as"
    :as-child="asChild"
    :data-color-contrast="colorContrast"
    :data-no-color="isNoColor ? '' : undefined"
    :style="{
      '--soybean-color-swatch-color': colorString,
      '--soybean-color-swatch-alpha': String(alpha)
    }"
  >
    <slot :color="colorString" :alpha="alpha" />
  </Primitive>
</template>
