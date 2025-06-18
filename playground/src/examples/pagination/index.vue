<script setup lang="ts">
import { SCard } from '@ui';
import DemoPaginationVariant from './variant.vue';
import DemoPaginationSize from './size.vue';
import DemoPaginationShape from './shape.vue';
import DemoPaginationSlot from './slot.vue';
import DemoPaginationAction from './action.vue';
import DemoPaginationShow from './show.vue';
</script>

<template>
  <SCard title="Pagination" :ui="{ content: 'flex-c gap-3' }">
    <DemoPaginationVariant />
    <DemoPaginationSize />
    <DemoPaginationShape />
    <DemoPaginationSlot />
    <DemoPaginationAction />
    <DemoPaginationShow />
  </SCard>
</template>
