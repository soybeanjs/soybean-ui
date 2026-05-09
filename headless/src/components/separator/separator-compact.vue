<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import SeparatorLabel from './separator-label.vue';
import SeparatorRoot from './separator-root.vue';
import type { SeparatorCompactProps, SeparatorCompactSlots } from './types';

defineOptions({
  name: 'SeparatorCompact'
});

const props = defineProps<SeparatorCompactProps>();

const slots = defineSlots<SeparatorCompactSlots>();

const forwardedProps = useOmitProps(props, ['label', 'labelProps']);

const showLabel = computed(
  () => (props.orientation === undefined || props.orientation === 'horizontal') && (slots.default || props.label)
);
</script>

<template>
  <SeparatorRoot v-bind="forwardedProps">
    <SeparatorLabel v-if="showLabel" v-bind="labelProps">
      <slot>{{ label }}</slot>
    </SeparatorLabel>
  </SeparatorRoot>
</template>
