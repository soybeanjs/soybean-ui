<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoCardBasic from './basic.vue';
import DemoCardSplit from './split.vue';
import DemoCardTitleSlot from './title-slot.vue';
import DemoCardOnlyContent from './only-content.vue';
import DemoCardCollapsible from './collapsible.vue';
</script>

<template>
  <SCard title="Card" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCardBasic />
    <DemoCardSplit />
    <DemoCardTitleSlot />
    <DemoCardOnlyContent />
    <DemoCardCollapsible />
  </SCard>
</template>
