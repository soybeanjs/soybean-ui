<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, Card } from '@ui';
import type { AccordionItemData } from '@ui';

defineOptions({
  name: 'DemoAccordionSingle'
});

const single = ref('');
const single2 = ref('');

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
  <div class="flex-c gap-4">
    <Card title="Single Collapse" split>
      <Accordion v-model="single" type="single" collapsible :items="items" />
    </Card>
    <Card title="Single Collapse (always open one)" split>
      <Accordion v-model="single2" type="single" :items="items" />
    </Card>
  </div>
</template>
