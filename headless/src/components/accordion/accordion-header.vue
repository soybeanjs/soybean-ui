<script setup lang="ts">
import { computed } from 'vue';
import { useAccordionItemContext, useAccordionRootContext, useAccordionThemeContext } from './context';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'AccordionHeader'
});

defineProps<AccordionHeaderProps>();

const themeContext = useAccordionThemeContext();

const cls = computed(() => themeContext?.ui?.value?.header);

const { orientation } = useAccordionRootContext('AccordionHeader');
const { dataDisabled, dataState } = useAccordionItemContext('AccordionHeader');
</script>

<template>
  <div :class="cls" :data-disabled="dataDisabled" :data-orientation="orientation" :data-state="dataState">
    <slot />
  </div>
</template>
