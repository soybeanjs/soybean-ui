<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion } from '@soybeanjs/ui';
import type { AccordionOptionData } from '@soybeanjs/ui';

const multi = ref<string[]>([]);

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
  <div>
    <h3 class="playground-title">Multi Collapse</h3>
    <SAccordion v-model="multi" multiple :items="items" />
  </div>
</template>
