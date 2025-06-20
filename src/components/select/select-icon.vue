<script setup lang="ts">
import { computed } from 'vue';
import { useSelectThemeContext } from './context';
import type { SelectIconProps } from './types';

defineOptions({
  name: 'SelectIcon'
});

const props = defineProps<SelectIconProps>();

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.icon, props.class]);
</script>

<template>
  <span v-bind="props" :class="cls" aria-hidden="true">
    <slot />
  </span>
</template>
