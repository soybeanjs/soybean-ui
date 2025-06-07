<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, useOmitProps, usePresence } from '../../composables';
import { Primitive } from '../primitive';
import { getCheckedState } from '../checkbox/shared';
import { useRadioGroupItemContext } from './context';
import type { RadioGroupIndicatorProps } from './types';

defineOptions({
  name: 'RadioGroupIndicator'
});

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span'
});

const forwardedProps = useOmitProps(props, ['forceMount']);

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
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
