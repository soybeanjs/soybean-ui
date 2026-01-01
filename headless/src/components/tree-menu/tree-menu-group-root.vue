<script setup lang="ts">
import { computed } from 'vue';
import { useTreeMenuThemeContext } from './context';
import type { TreeMenuGroupRootProps } from './types';

defineOptions({
  name: 'TreeMenuGroupRoot'
});

defineProps<TreeMenuGroupRootProps>();

const ui = useTreeMenuThemeContext();

const cls = computed(() => ui?.value?.groupRoot);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
