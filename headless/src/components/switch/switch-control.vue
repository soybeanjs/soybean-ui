<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useForwardElement } from '../../composables';
import { getAriaLabel } from '../../shared';
import { useSwitchRootContext, useSwitchUi } from './context';
import type { SwitchControlProps } from './types';

defineOptions({
  name: 'SwitchControl'
});

const props = defineProps<SwitchControlProps>();

const attrs = useAttrs();

const { modelValue, dataDisabled, dataState, toggleCheck, required } = useSwitchRootContext('SwitchControl');

const [controlElement, setControlElement] = useForwardElement();

const cls = useSwitchUi('control');

const ariaLabel = computed(() => getAriaLabel(controlElement.value, props.id, attrs['aria-label'] as string));
</script>

<template>
  <button
    :id="id"
    :ref="setControlElement"
    :class="cls"
    :aria-checked="dataState === 'checked'"
    :aria-label="ariaLabel"
    :aria-required="required"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    role="switch"
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
    <slot :model-value="modelValue" />
  </button>
</template>
