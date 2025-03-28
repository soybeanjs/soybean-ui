<script setup lang="ts">
import { ref } from 'vue';
import { SAccordion, SCard } from 'soy-ui';
import type { AccordionItemData, ThemeSize } from 'soy-ui';
import { Earth, Info, Minus, Plus, Rocket } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAccordion'
});

const single = ref('');
const single2 = ref('');
const single3 = ref('');
const multi = ref<string[]>([]);
const multi2 = ref<string[]>([]);

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
    <SCard title="Multi Collapse" split>
      <SAccordion v-model="multi" type="multiple" :items="items" />
    </SCard>
    <SCard title="Single Collapse (always open one)" split>
      <SAccordion v-model="single2" type="single" :items="items" />
    </SCard>
    <SCard title="Custom Styling" split>
      <SAccordion
        v-model="single3"
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
    <SCard title="Custom Icon" split>
      <SAccordion v-model="multi2" type="multiple" :items="items">
        <template #trigger-icon="{ open }">
          <Minus v-if="open" />
          <Plus v-else />
        </template>
      </SAccordion>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap justify-between gap-4">
        <SCard v-for="size in sizes" :key="size" :title="size" split class="basis-32% lt-lg:basis-48% lt-sm:basis-100%">
          <SAccordion :size="size" :items="items" collapsible />
        </SCard>
      </div>
    </SCard>
  </div>
</template>
