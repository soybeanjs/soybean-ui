<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import SSeparatorRoot from './separator-root.vue';
import SSeparatorLabel from './separator-label.vue';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'SSeparator'
});

const { align, label, labelClass, ...delegatedProps } = defineProps<SeparatorProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SSeparatorRoot v-bind="forwardedProps">
    <slot name="leading" />
    <SSeparatorLabel v-if="label || $slots.default" :class="labelClass" :align :orientation>
      <slot>{{ label }}</slot>
    </SSeparatorLabel>
    <slot name="trailing" />
  </SSeparatorRoot>
</template>
