<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTableBase from './base.vue';
import DemoTableExpandable from './expandable.vue';
import DemoTableBordered from './bordered.vue';
import DemoTableStriped from './striped.vue';
import DemoTableFooter from './footer.vue';
import DemoTableMultipleSelection from './multiple-selection.vue';
import DemoTableSingleSelection from './single-selection.vue';
import DemoTableSizes from './sizes.vue';
</script>

<template>
  <SCard title="Table" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTableBase />
    <DemoTableExpandable />
    <DemoTableBordered />
    <DemoTableStriped />
    <DemoTableFooter />
    <DemoTableMultipleSelection />
    <DemoTableSingleSelection />
    <DemoTableSizes />
  </SCard>
</template>
