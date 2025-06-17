<script setup lang="ts">
import { SCard } from '@ui';
import DemoRadioGroupColor from './color.vue';
import DemoRadioGroupSize from './size.vue';
import DemoRadioGroupVariant from './variant.vue';
import DemoRadioGroupCard from './card.vue';
</script>

<template>
  <SCard title="RadioGroup" :ui="{ content: 'flex-c gap-3' }">
    <DemoRadioGroupColor />
    <DemoRadioGroupSize />
    <DemoRadioGroupVariant />
    <DemoRadioGroupCard />
  </SCard>
</template>
