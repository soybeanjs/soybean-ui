<script setup lang="ts">
import { computed } from 'vue';
import type { MenuSeparatorProps } from './types';
import { useMenuThemeContext } from './context';

defineOptions({
  name: 'MenuSeparator'
});

const props = defineProps<MenuSeparatorProps>();

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.separator, props.class]);
</script>

<template>
  <div v-bind="props" :class="cls" role="separator" aria-orientation="horizontal">
    <slot />
  </div>
</template>
