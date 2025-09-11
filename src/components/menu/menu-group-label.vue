<script setup lang="ts">
import { computed } from 'vue';
import { useMenuThemeContext } from './context';
import type { MenuGroupLabelProps } from './types';

defineOptions({
  name: 'MenuGroupLabel'
});

const props = defineProps<MenuGroupLabelProps>();

const themeContext = useMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.groupLabel);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
