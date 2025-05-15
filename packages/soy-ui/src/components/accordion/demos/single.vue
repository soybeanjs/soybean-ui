<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion, SCard } from 'soy-ui';
import type { AccordionItemData } from 'soy-ui';
import { Earth, Info, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordionSingle'
});

const single = ref('');
const single2 = ref('');

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
  <div class="flex-c gap-4">
    <SCard title="Single Collapse" split>
      <SAccordion v-model="single" type="single" collapsible :items="items" />
    </SCard>
    <SCard title="Single Collapse (always open one)" split>
      <SAccordion v-model="single2" type="single" :items="items" />
    </SCard>
  </div>
</template>
