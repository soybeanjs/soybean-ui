<script setup lang="ts">
import { computed } from 'vue';
import { useSelectThemeContext } from './context';
import type { SelectTriggerIconProps } from './types';

defineOptions({
  name: 'SelectTriggerIcon'
});

const props = defineProps<SelectTriggerIconProps>();

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.triggerIcon);
</script>

<template>
  <span v-bind="props" :class="cls" aria-hidden="true">
    <slot />
  </span>
</template>
