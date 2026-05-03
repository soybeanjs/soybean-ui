<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoPaginationVariant from './variant.vue';
import DemoPaginationSize from './size.vue';
import DemoPaginationShape from './shape.vue';
import DemoPaginationSlot from './slot.vue';
import DemoPaginationAction from './action.vue';
import DemoPaginationShow from './show.vue';
import DemoPaginationBasic from './basic.vue';
</script>

<template>
  <SCard title="Pagination" split :ui="{ content: 'flex-c gap-4' }">
    <DemoPaginationBasic />
    <DemoPaginationVariant />
    <DemoPaginationSize />
    <DemoPaginationShape />
    <DemoPaginationSlot />
    <DemoPaginationAction />
    <DemoPaginationShow />
  </SCard>
</template>
