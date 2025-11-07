<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { getCheckedState } from '../../shared';
import { Primitive } from '../primitive';
import { useRadioGroupItemContext, useRadioGroupThemeContext } from './context';
import type { RadioGroupIndicatorProps } from './types';

defineOptions({
  name: 'RadioGroupIndicator'
});

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span'
});

const themeContext = useRadioGroupThemeContext();

const cls = computed(() => themeContext?.ui?.value?.indicator);

const [indicatorElement, setIndicatorElement] = useForwardElement();
const { checked, disabled } = useRadioGroupItemContext('RadioGroupIndicator');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(indicatorElement, () => checked.value === true);

const dataState = computed(() => getCheckedState(checked.value));
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="setIndicatorElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
