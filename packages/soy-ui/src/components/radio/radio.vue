<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardProps } from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
import SRadioLabel from '../label/label.vue';
import SRadioRoot from './radio-root.vue';
import SRadioControl from './radio-control.vue';
import SRadioIndicator from './radio-indicator.vue';
import type { RadioProps } from './types';

defineOptions({
  name: 'SRadio'
});

const { class: cls, id, size: _size, ui, forceMountIndicator, label, ...delegatedProps } = defineProps<RadioProps>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const forwardedProps = useForwardProps(delegatedProps);

const defaultId = useId();

const radioId = computed(() => id || `radio-${defaultId}`);
</script>

<template>
  <SRadioRoot :class="cls || ui?.root">
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
