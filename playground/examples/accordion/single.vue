<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion, SCard } from '@soybeanjs/ui';
import type { AccordionOptionData } from '@soybeanjs/ui';

const single = ref('');
const single2 = ref('');

const items: AccordionOptionData[] = [
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
    <SCard title="Single Collapse" split>
      <SAccordion v-model="single" collapsible :items="items" />
    </SCard>
    <SCard title="Single Collapse (always open one)" split>
      <SAccordion v-model="single2" :items="items" />
    </SCard>
  </div>
</template>
