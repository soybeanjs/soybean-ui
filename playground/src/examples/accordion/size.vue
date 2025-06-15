<script setup lang="ts">
import { SAccordion, SCard } from '@ui';
import type { AccordionItemData } from '@ui';
import type { ThemeSize } from '@theme';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items: AccordionItemData[] = [
  {
    value: '1',
    title: 'Is it accessible?',
    description: 'Yes. It adheres to the WAI-ARIA design pattern.',
    icon: 'lucide:info'
  },
  {
    value: '2',
    title: 'Is it unstyled?',
    description: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    icon: 'lucide:rocket'
  },
  {
    value: '3',
    title: 'Can it be animated?',
    description: 'Yes! You can use the transition prop to configure the animation.',
    icon: 'lucide:earth'
  }
];
</script>

<template>
  <SCard title="Size" split>
    <div class="flex flex-wrap justify-between gap-4">
      <SCard v-for="size in sizes" :key="size" :title="size" split class="basis-48% lt-sm:basis-100%">
        <SAccordion :size="size" :items="items" collapsible />
      </SCard>
    </div>
  </SCard>
</template>
