<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, useOmitProps, usePresence } from '../../composables';
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

const forwardedProps = useOmitProps(props, ['forceMount']);

const themeContext = useRadioGroupThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.indicator, props.class]);

const [indicatorElement, setIndicatorElement] = useForwardElement();
const { checked, disabled } = useRadioGroupItemContext('RadioGroupIndicator');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(indicatorElement, () => checked.value === true);

const dataState = computed(() => getCheckedState(checked.value));
</script>

<template>
  <Primitive
    v-if="isPresent"
    v-bind="forwardedProps"
    :ref="setIndicatorElement"
    :class="cls"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
