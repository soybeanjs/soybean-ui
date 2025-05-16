<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import type { SeparatorProps } from '../types';
import SSeparatorRoot from './separator-root.vue';
import SSeparatorLabel from './separator-label.vue';

defineOptions({
  name: 'SSeparator'
});

const { class: cls, size, ui, align, label, ...delegatedProps } = defineProps<SeparatorProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SSeparatorRoot v-bind="forwardedProps" :class="cls || ui?.root">
    <slot name="leading" />
    <SSeparatorLabel
      v-if="label || $slots.default"
      :class="ui?.label"
      :size="size"
      :align="align"
      :orientation="orientation"
    >
      <slot>{{ label }}</slot>
    </SSeparatorLabel>
    <slot name="trailing" />
  </SSeparatorRoot>
</template>
