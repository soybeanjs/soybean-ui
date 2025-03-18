<script setup lang="ts">
import { SStepper } from 'soy-ui';
import type { StepperOptionData } from 'soy-ui';

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
</script>

<template>
  <SStepper :items="items" />
  <div class="py-12px text-18px">Vertical</div>
  <SStepper :items="items" orientation="vertical" />
</template>
