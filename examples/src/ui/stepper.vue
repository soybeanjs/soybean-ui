<script setup lang="ts">
import { SCard, SStepper } from 'soy-ui';
import type { StepperOptionData } from 'soy-ui';

defineOptions({
  name: 'DemoStepper'
});

const items: StepperOptionData[] = [
  {
    step: 1,
    title: 'Your details',
    description: 'Provide your name and email',
    indicatorLabel: '1'
  },
  {
    step: 2,
    title: 'Company details',
    description: 'A few details about your company',
    indicatorLabel: '2'
  },
  {
    step: 3,
    title: 'Invite your team',
    description: 'Start collaborating with your team',
    indicatorLabel: '3'
  }
];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <SStepper :items="items" />
    </SCard>
    <SCard title="Vertical" split>
      <SStepper :items="items" orientation="vertical" />
    </SCard>
  </div>
</template>
