<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCardBase from './base.vue';
import DemoCardSplit from './split.vue';
import DemoCardTitleSlot from './title-slot.vue';
import DemoCardOnlyContent from './only-content.vue';
</script>

<template>
  <SCard title="Card" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCardBase />
    <DemoCardSplit />
    <DemoCardTitleSlot />
    <DemoCardOnlyContent />
  </SCard>
</template>
