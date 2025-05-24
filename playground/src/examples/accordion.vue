<script setup lang="ts">
import { ref } from 'vue';
import { accordionVariants } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '../../../src';
import SectionWrapper from '../components/section-wrapper.vue';

const { root, item, header, trigger, triggerIcon, content } = accordionVariants();
const value = ref('item-1');

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel."
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.'
  }
];
</script>

<template>
  <SectionWrapper title="Accordion">
    <AccordionRoot
      v-model="value"
      :class="root()"
      class="w-100 rd-lg shadow-sm border px-4 py-2"
      default-value="item-1"
      type="single"
      :collapsible="true"
    >
      <template v-for="aItem in accordionItems" :key="aItem.value">
        <AccordionItem :class="item()" :value="aItem.value">
          <AccordionHeader :class="header()">
            <AccordionTrigger :class="trigger()">
              <span>{{ aItem.title }}</span>
              <ChevronDown :class="triggerIcon()" aria-label="Expand/Collapse" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent :class="content()">
            <div class="px-5 py-4">
              {{ aItem.content }}
            </div>
          </AccordionContent>
        </AccordionItem>
      </template>
    </AccordionRoot>
  </SectionWrapper>
</template>
