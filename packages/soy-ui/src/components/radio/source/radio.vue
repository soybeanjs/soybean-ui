<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardProps } from '@soybean-ui/primitives';
import SRadioLabel from '../../label/source/label.vue';
import type { RadioProps } from '../types';
import SRadioRoot from './radio-root.vue';
import SRadioControl from './radio-control.vue';
import SRadioIndicator from './radio-indicator.vue';

defineOptions({
  name: 'SRadio'
});

const { class: cls, id, size, ui, forceMountIndicator, label, ...delegatedProps } = defineProps<RadioProps>();

const forwardedProps = useForwardProps(delegatedProps);

const defaultId = useId();

const radioId = computed(() => id || `radio-${defaultId}`);
</script>

<template>
  <SRadioRoot :class="cls || ui?.root" :size="size">
    <SRadioControl v-bind="forwardedProps" :id="radioId" :class="ui?.control" :size="size">
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <SRadioIndicator :class="ui?.indicator" :color="color" :force-mount="forceMountIndicator" />
      </Transition>
    </SRadioControl>
    <SRadioLabel :class="ui?.label" :for="radioId" :size="size">
      <slot :id="radioId">{{ label }}</slot>
    </SRadioLabel>
  </SRadioRoot>
</template>
