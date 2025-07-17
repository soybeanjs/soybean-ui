<script setup lang="ts">
import { computed } from 'vue';
import type { SelectSeparatorProps } from './types';
import { useSelectThemeContext } from './context';

defineOptions({
  name: 'SelectSeparator'
});

const props = defineProps<SelectSeparatorProps>();

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.separator, props.class]);
</script>

<template>
  <div v-bind="props" :class="cls" role="separator" aria-orientation="horizontal">
    <slot />
  </div>
</template>
