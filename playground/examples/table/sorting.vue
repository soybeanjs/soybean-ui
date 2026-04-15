<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import { groupedTableData, sortableColumns } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Sorting</h3>
    <STable :columns="sortableColumns" :data="groupedTableData" :row-key="row => row.id" />
  </div>
</template>
