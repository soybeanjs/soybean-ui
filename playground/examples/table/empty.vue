<script setup lang="ts">
import { SEmpty, STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumn<TableData>[] = [
  { type: 'index', width: '50px' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' },
  { title: 'Address', dataIndex: 'address' }
];

const data: TableData[] = [];
</script>

<template>
  <div>
    <h3 class="playground-title">Empty State</h3>
    <div class="space-y-4">
      <STable :columns="columns" :data="data" :row-key="row => row.id" />
      <STable :columns="columns" :data="data" :row-key="row => row.id">
        <template #empty>
          <SEmpty
            title="No matching records"
            description="Try adjusting filters or create the first record from here."
            icon="lucide:file-search"
            media-variant="icon"
          />
        </template>
      </STable>
    </div>
  </div>
</template>
