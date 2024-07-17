<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion } from '@soybean-unify/ui';

defineOptions({
  name: 'UiAccordion'
});

const single = ref('');

const multi = ref<string[]>([]);

type AccordionItems = {
  value: string;
  title: string;
  content: string;
};

const items: AccordionItems[] = [
  {
    value: '1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
    value: '2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel."
  },
  {
    value: '3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.'
  }
];
</script>

<template>
  <div class="py-12px text-18px">Single</div>
  <SAccordion v-model="single" type="single" class="w-full" collapsible :items="items" />
  <div class="pb-12px pt-32px text-18px">Multi</div>
  <SAccordion v-model="multi" type="multiple" class="w-full" collapsible :items="items" />
</template>

<style scoped></style>
