<script setup lang="ts">
import { computed } from 'vue';
import { useListboxGroupContext, useListboxThemeContext } from './context';
import type { ListboxGroupLabelProps } from './types';

defineOptions({
  name: 'ListboxGroupLabel'
});

defineProps<ListboxGroupLabelProps>();

const { id } = useListboxGroupContext('ListboxGroupLabel');

const themeContext = useListboxThemeContext();

const cls = computed(() => themeContext?.ui?.value?.groupLabel);
</script>

<template>
  <div :id="id" :class="cls">
    <slot />
  </div>
</template>
