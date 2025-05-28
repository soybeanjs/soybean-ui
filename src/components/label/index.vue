<script setup lang="ts">
import type { LabelProps } from './types';

defineOptions({
  name: 'Label'
});

const props = defineProps<LabelProps>();

const onMouseDown = (event: MouseEvent) => {
  // prevent text selection when double clicking label
  if (!event.defaultPrevented && event.detail > 1) {
    event.preventDefault();
  }
};
</script>

<template>
  <label :for="props.for" :class="props.class" @mousedown="onMouseDown">
    <slot />
  </label>
</template>
