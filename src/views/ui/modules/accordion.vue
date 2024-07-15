<script setup lang="ts">
import { SuAccordion } from '@soybean-unify/ui';

defineOptions({
  name: 'UiAccordion'
});

const defaultValue = 'item-1';

type AccordionItems = {
  value: string;
  title: string;
  content: string;
};

const items: AccordionItems[] = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel."
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.'
  }
];
</script>

<template>
  <SuAccordion type="single" class="w-full" collapsible :default-value="defaultValue" :items="items" />
</template>

<style scoped></style>
