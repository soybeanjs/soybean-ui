<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoStepperBasic from './basic.vue';
import DemoStepperVertical from './vertical.vue';
import DemoStepperLinear from './linear.vue';
import DemoStepperCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Stepper" split :ui="{ content: 'flex-c gap-4' }">
    <DemoStepperBasic />
    <DemoStepperVertical />
    <DemoStepperLinear />
    <DemoStepperCustomStyling />
  </SCard>
</template>
