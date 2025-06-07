<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, Card } from '@ui';
import type { AccordionItemData } from '@ui';
import { Earth, Info, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordionMultiple'
});

const multi = ref<string[]>([]);

const items: AccordionItemData[] = [
  {
    value: '1',
    title: 'Is it accessible?',
    description: 'Yes. It adheres to the WAI-ARIA design pattern.',
    icon: Info
  },
  {
    value: '2',
    title: 'Is it unstyled?',
    description: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    icon: Rocket
  },
  {
    value: '3',
    title: 'Can it be animated?',
    description: 'Yes! You can use the transition prop to configure the animation.',
    icon: Earth
  }
];
</script>

<template>
  <Card title="Multi Collapse" split>
    <Accordion v-model="multi" type="multiple" :items="items" />
  </Card>
</template>
