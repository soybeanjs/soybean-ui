<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useSelectItemContext, useSelectThemeContext } from './context';
import type { SelectItemIndicatorProps } from './types';

defineOptions({
  name: 'SelectItemIndicator'
});

withDefaults(defineProps<SelectItemIndicatorProps>(), {
  as: 'span'
});

const { isSelected } = useSelectItemContext('SelectItemIndicator');

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.itemIndicator);
</script>

<template>
  <Primitive v-if="isSelected" :as="as" :as-child="asChild" :class="cls" aria-hidden="true">
    <slot />
  </Primitive>
</template>
