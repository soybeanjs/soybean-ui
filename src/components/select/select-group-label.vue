<script setup lang="ts">
import { computed } from 'vue';
import { useSelectGroupContext, useSelectThemeContext } from './context';
import type { SelectGroupLabelProps } from './types';

defineOptions({
  name: 'SelectGroupLabel'
});

const props = defineProps<SelectGroupLabelProps>();

const { labelId } = useSelectGroupContext('SelectGroupLabel');

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.groupLabel);
</script>

<template>
  <div v-bind="props" :id="labelId" :class="cls">
    <slot />
  </div>
</template>
