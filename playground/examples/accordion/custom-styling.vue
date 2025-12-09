<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion } from '@soybeanjs/ui';
import type { AccordionOptionData } from '@soybeanjs/ui';

const single = ref('');

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
    <h3 class="playground-title">Custom Styling</h3>
    <SAccordion
      v-model="single"
      type="single"
      collapsible
      :items="items"
      :ui="{
        item: 'border-b-0',
        content: 'px-3 leading-8',
        trigger: `mb-2 rounded-md px-3 text-left underline-offset-2 data-[state=closed]:(bg-muted/50 no-underline) data-[state=open]:(bg-secondary-foreground/20 underline hover:bg-secondary-foreground/20 hover:underline) hover:bg-muted`
      }"
    />
  </div>
</template>
