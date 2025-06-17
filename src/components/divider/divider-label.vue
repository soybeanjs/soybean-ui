<script setup lang="ts">
import { computed } from 'vue';
import { useDividerThemeContext } from './context';
import type { DividerLabelProps } from './types';

defineOptions({
  name: 'DividerLabel'
});

const props = defineProps<DividerLabelProps>();

const themeContext = useDividerThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.label, props.class]);
</script>

<template>
  <span v-bind="props" :class="cls">
    <slot />
  </span>
</template>
