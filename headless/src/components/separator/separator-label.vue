<script setup lang="ts">
import { useSeparatorUi } from './context';
import type { SeparatorLabelProps } from './types';

defineOptions({
  name: 'SeparatorLabel'
});

defineProps<SeparatorLabelProps>();

const cls = useSeparatorUi('label');
</script>

<template>
  <span :class="cls">
    <slot />
  </span>
</template>
