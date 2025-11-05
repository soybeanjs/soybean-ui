<script setup lang="ts">
import { computed } from 'vue';
import { provideListboxGroupContext, useListboxThemeContext } from './context';
import type { ListboxGroupProps } from './types';

defineOptions({
  name: 'ListboxGroup'
});

defineProps<ListboxGroupProps>();

const { id } = provideListboxGroupContext();

const themeContext = useListboxThemeContext();

const cls = computed(() => themeContext?.ui?.value?.group);
</script>

<template>
  <div :aria-labelledby="id" role="group" :class="cls">
    <slot />
  </div>
</template>
