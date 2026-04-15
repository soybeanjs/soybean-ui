<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import { groupedColumns, groupedTableData } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Grouped Headers</h3>
    <STable :columns="groupedColumns" :data="groupedTableData" :row-key="row => row.id" />
  </div>
</template>
