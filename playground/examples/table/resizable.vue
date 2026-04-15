<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import { employeeTableData, resizableColumns } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Resizable Columns</h3>
    <p class="mb-3 text-sm text-muted-foreground">Drag any header handle to adjust the column width.</p>
    <STable :columns="resizableColumns" :data="employeeTableData" :row-key="row => row.id" />
  </div>
</template>
