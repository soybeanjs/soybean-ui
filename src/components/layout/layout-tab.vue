<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutTabProps } from './types';

defineOptions({
  name: 'LayoutTab'
});

defineProps<LayoutTabProps>();

const theme = useLayoutThemeContext();

const cls = computed(() => theme?.ui?.value?.tab);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
