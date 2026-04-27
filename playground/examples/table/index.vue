<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTableBase from './base.vue';
import DemoTableEmpty from './empty.vue';
import DemoTableVariant from './variant.vue';
import DemoTableBordered from './bordered.vue';
import DemoTableRounded from './rounded.vue';
import DemoTableStriped from './striped.vue';
import DemoTableGrouped from './grouped.vue';
import DemoTableSorting from './sorting.vue';
import DemoTableFiltering from './filtering.vue';
import DemoTableFixed from './fixed.vue';
import DemoTableResizable from './resizable.vue';
import DemoTableExpandable from './expandable.vue';
import DemoTableFooter from './footer.vue';
import DemoTableBottom from './bottom.vue';
import DemoTableMultipleSelection from './multiple-selection.vue';
import DemoTableSingleSelection from './single-selection.vue';
import DemoTableSizes from './sizes.vue';
import DemoTableTree from './tree.vue';
import DemoTableVirtualized from './virtualized.vue';
</script>

<template>
  <SCard title="Table" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTableBase />
    <DemoTableVariant />
    <DemoTableBordered />
    <DemoTableRounded />
    <DemoTableStriped />
    <DemoTableEmpty />
    <DemoTableGrouped />
    <DemoTableSorting />
    <DemoTableFiltering />
    <DemoTableFixed />
    <DemoTableResizable />
    <DemoTableTree />
    <DemoTableVirtualized />
    <DemoTableExpandable />
    <DemoTableFooter />
    <DemoTableBottom />
    <DemoTableMultipleSelection />
    <DemoTableSingleSelection />
    <DemoTableSizes />
  </SCard>
</template>
