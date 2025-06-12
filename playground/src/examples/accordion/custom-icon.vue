<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, Card } from '@ui';
import type { AccordionItemData } from '@ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'DemoAccordionCustomIcon'
});

const multi = ref<string[]>([]);

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
  <Card title="Custom Icon" split>
    <Accordion v-model="multi" type="multiple" :items="items">
      <template #trigger-icon="{ open }">
        <Icon v-if="open" icon="lucide:minus" />
        <Icon v-else icon="lucide:plus" />
      </template>
    </Accordion>
  </Card>
</template>
