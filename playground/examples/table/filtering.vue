<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import { filterableColumns, groupedTableData } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Filtering</h3>
    <STable :columns="filterableColumns" :data="groupedTableData" :row-key="row => row.id" />
  </div>
</template>
