<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import { employeeTableData, fixedColumns } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Fixed Columns</h3>
    <p class="mb-3 text-sm text-muted-foreground">
      Two columns stay pinned on the left and the score stays pinned on the right while the table scrolls horizontally.
    </p>
    <STable :columns="fixedColumns" :data="employeeTableData" :row-key="row => row.id" />
  </div>
</template>
