<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion, SCard } from 'soy-ui';
import type { AccordionItemData } from 'soy-ui';
import { Earth, Info, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordionMultiple'
});

const multi = ref<string[]>([]);

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
  <SCard title="Multi Collapse" split>
    <SAccordion v-model="multi" type="multiple" :items="items" />
  </SCard>
</template>
