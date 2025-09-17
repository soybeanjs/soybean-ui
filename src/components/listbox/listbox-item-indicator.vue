<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useListboxItemContext, useListboxThemeContext } from './context';
import type { ListboxItemIndicatorProps } from './types';

defineOptions({
  name: 'ListboxItemIndicator'
});

const props = withDefaults(defineProps<ListboxItemIndicatorProps>(), {
  as: 'span'
});

const { isSelected } = useListboxItemContext('ListboxItemIndicator');

const themeContext = useListboxThemeContext();
const cls = computed(() => themeContext?.ui?.value?.itemIndicator);
</script>

<template>
  <Primitive v-if="isSelected" v-bind="props" :class="cls" aria-hidden="true">
    <slot />
  </Primitive>
</template>
