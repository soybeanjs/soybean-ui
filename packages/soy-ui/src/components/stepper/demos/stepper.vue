<script setup lang="ts">
import type { Component } from 'vue';
import { SCard, SStepper } from 'soy-ui';
import type { StepperOptionData, StepperState, ThemeSize } from 'soy-ui';
import { Check, Pen } from 'lucide-vue-next';

defineOptions({
  name: 'DemoStepper'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const items: StepperOptionData[] = [
  {
    step: 1,
    title: 'Your details',
    description: 'Provide your name and email'
  },
  {
    step: 2,
    title: 'Company details',
    description: 'A few details about your company'
  },
  {
    step: 3,
    title: 'Invite your team',
    description: 'Start collaborating with your team'
  }
];

const stateIcon: Record<Exclude<StepperState, 'inactive'>, Component> = {
  completed: Check,
  active: Pen
};
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <div class="flex-c gap-4">
        <SStepper v-for="size in sizes" :key="size" :items="items" :size="size" />
      </div>
    </SCard>
    <SCard title="Vertical" split>
      <div class="flex flex-wrap gap-4">
        <SStepper v-for="size in sizes" :key="size" :items="items" orientation="vertical" :size="size" />
      </div>
    </SCard>
    <SCard title="Custom Indicator" split>
      <SStepper :items="items">
        <template #indicator="{ state, index }">
          <component :is="stateIcon[state]" v-if="state !== 'inactive'" />
          <span v-else>{{ index + 1 }}</span>
        </template>
      </SStepper>
    </SCard>
  </div>
</template>
