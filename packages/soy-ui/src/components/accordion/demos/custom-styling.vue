<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion, SCard } from 'soy-ui';
import type { AccordionItemData } from 'soy-ui';
import { Earth, Info, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordionCustomStyling'
});

const single = ref('');

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
  <SCard title="Custom Styling" split>
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
  </SCard>
</template>
