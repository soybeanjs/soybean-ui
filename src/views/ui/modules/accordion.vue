<script setup lang="ts">
import { ref } from 'vue';
import {
  SAccordion,
  SAccordionContent,
  SAccordionContentBody,
  SAccordionHeader,
  SAccordionItem,
  SAccordionRoot,
  SAccordionTrigger
} from 'soybean-ui';
import { Minus, Plus } from 'lucide-vue-next';

defineOptions({
  name: 'UiAccordion'
});

const single = ref('');
const single2 = ref('');
const single3 = ref('');
const multi = ref<string[]>([]);
const multi2 = ref<string[]>([]);

type AccordionItems = {
  value: string;
  title: string;
  content: string;
};

const items: AccordionItems[] = [
  {
    value: '1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
    value: '2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel."
  },
  {
    value: '3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.'
  }
];
</script>

<template>
  <div class="py-12px text-18px">Single Collapse</div>
  <SAccordion v-model="single" type="single" collapsible :items="items" />
  <div class="pb-12px pt-32px text-18px">Multi Collapse</div>
  <SAccordion v-model="multi" type="multiple" :items="items" />
  <div class="py-12px pt-32px text-18px">Single Collapse: always open one</div>
  <SAccordion v-model="single2" type="single" :items="items" />
  <div class="pb-12px pt-32px text-18px">Custom styling</div>
  <SAccordionRoot v-model="single3" type="single" collapsible>
    <template v-for="item in items" :key="item.value">
      <SAccordionItem v-slot="{ open }" :value="item.value" class="border-b-0">
        <SAccordionHeader>
          <SAccordionTrigger
            class="mb-2 rounded-md px-3 text-left text-sm underline-offset-2 hover:bg-muted hover:no-underline"
            :class="[
              open
                ? 'bg-secondary-foreground/20 hover:bg-secondary-foreground/20 underline hover:underline!'
                : 'bg-muted/50 no-underline'
            ]"
          >
            {{ item.title }}
          </SAccordionTrigger>
        </SAccordionHeader>
        <SAccordionContent>
          <SAccordionContentBody class="px-3 leading-8">
            {{ item.content }}
          </SAccordionContentBody>
        </SAccordionContent>
      </SAccordionItem>
    </template>
  </SAccordionRoot>
  <div class="py-12px pt-32px text-18px">Custom Icon</div>
  <SAccordion v-model="multi2" type="multiple" :items="items">
    <template #triggerIcon="{ open }">
      <Minus v-if="open" />
      <Plus v-else />
    </template>
  </SAccordion>
</template>

<style scoped></style>
