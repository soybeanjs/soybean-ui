<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoRadioGroupColor from './color.vue';
import DemoRadioGroupSize from './size.vue';
import DemoRadioGroupVariant from './variant.vue';
import DemoRadioGroupCard from './card.vue';
</script>

<template>
  <SCard title="RadioGroup" split :ui="{ content: 'flex-c gap-4' }">
    <DemoRadioGroupColor />
    <DemoRadioGroupSize />
    <DemoRadioGroupVariant />
    <DemoRadioGroupCard />
  </SCard>
</template>
