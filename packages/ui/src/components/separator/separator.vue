<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import { computedOmit } from '../../shared';
import SSeparatorRoot from './separator-root.vue';
import SSeparatorLabel from './separator-label.vue';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'SSeparator'
});

const props = defineProps<SeparatorProps>();

const delegatedRootProps = computedOmit(props, ['align', 'label', 'labelClass']);

const forwardedRootProps = useForwardProps(delegatedRootProps);
</script>

<template>
  <SSeparatorRoot v-bind="forwardedRootProps">
    <slot name="leading" />
    <SSeparatorLabel v-if="label || $slots.default" :class="labelClass" :orientation="orientation" :align="align">
      <slot>{{ label }}</slot>
    </SSeparatorLabel>
    <slot name="trailing" />
  </SSeparatorRoot>
</template>
