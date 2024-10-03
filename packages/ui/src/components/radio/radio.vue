<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardProps } from 'radix-vue';
import SRadioLabel from '../label/label.vue';
import SRadioRoot from './radio-root.vue';
import SRadioControl from './radio-control.vue';
import SRadioIndicator from './radio-indicator.vue';
import type { RadioProps } from './types';

defineOptions({
  name: 'SRadio'
});

const {
  class: rootCls,
  id,
  controlClass,
  indicatorClass,
  forceMountIndicator,
  label,
  labelClass,
  ...delegatedProps
} = defineProps<RadioProps>();

const forwardedProps = useForwardProps(delegatedProps);

const defaultId = useId();

const radioId = computed(() => id || `radio-${defaultId}`);
</script>

<template>
  <SRadioRoot :class="rootCls">
    <SRadioControl v-bind="forwardedProps" :id="radioId" :class="controlClass">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SRadioIndicator :class="indicatorClass" :color :force-mount="forceMountIndicator" />
      </Transition>
    </SRadioControl>
    <SRadioLabel :class="labelClass" :for="radioId" :size>
      <slot :id="radioId">{{ label }}</slot>
    </SRadioLabel>
  </SRadioRoot>
</template>

<style scoped></style>
