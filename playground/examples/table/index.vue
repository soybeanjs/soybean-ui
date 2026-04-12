<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTableBase from './base.vue';
import DemoTableExpandable from './expandable.vue';
import DemoTableBordered from './bordered.vue';
import DemoTableFixedResizable from './fixed-resizable.vue';
import DemoTableStriped from './striped.vue';
import DemoTableFooter from './footer.vue';
import DemoTableGroupedSortFilter from './grouped-sort-filter.vue';
import DemoTableMultipleSelection from './multiple-selection.vue';
import DemoTableSingleSelection from './single-selection.vue';
import DemoTableSizes from './sizes.vue';
</script>

<template>
  <SCard title="Table" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTableBase />
    <DemoTableGroupedSortFilter />
    <DemoTableFixedResizable />
    <DemoTableExpandable />
    <DemoTableBordered />
    <DemoTableStriped />
    <DemoTableFooter />
    <DemoTableMultipleSelection />
    <DemoTableSingleSelection />
    <DemoTableSizes />
  </SCard>
</template>
