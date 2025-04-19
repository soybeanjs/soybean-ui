<script setup lang="ts">
import { SAccordion, SCard } from 'soy-ui';
import type { AccordionItemData, ThemeSize } from 'soy-ui';
import { Earth, Info, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordionSize'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items: AccordionItemData[] = [
  {
    value: '1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    icon: Info
  },
  {
    value: '2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    icon: Rocket
  },
  {
    value: '3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
    icon: Earth
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
