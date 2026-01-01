<script setup lang="ts">
import { computed } from 'vue';
import { useTreeMenuThemeContext } from './context';
import type { TreeMenuGroupLabelProps } from './types';

defineOptions({
  name: 'TreeMenuGroupLabel'
});

defineProps<TreeMenuGroupLabelProps>();

const ui = useTreeMenuThemeContext();

const cls = computed(() => ui?.value?.groupLabel);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
