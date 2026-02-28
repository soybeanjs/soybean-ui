<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  age: number;
  address: string;
  details?: {
    description: string;
    appearance?: string;
  };
}

const columns: TableColumn<TableData>[] = [
  { type: 'index', width: '50px' },
  { type: 'selection', width: '50px' },
  { type: 'expand', width: '50px' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' },
  { title: 'Address', dataIndex: 'address' },
  { title: 'Details', dataIndex: 'details.description' }
];

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' },
  { id: 4, name: 'Alice Brown', age: 35, address: '321 Pine St' },
  { id: 5, name: 'Charlie Davis', age: 28, address: '654 Maple', details: { description: 'Detail for Charlie Davis' } },
  { id: 6, name: 'Eve White', age: 32, address: '987 Cedar St' },
  { id: 7, name: 'Frank Green', age: 45, address: '246 Birch St' },
  { id: 8, name: 'Grace Lee', age: 27, address: '135 Spruce St' },
  { id: 9, name: 'Hank Miller', age: 38, address: '864 Willow St' },
  { id: 10, name: 'Ivy Wilson', age: 29, address: '753 Aspen St' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <STable caption="Table Caption" :columns="columns" :data="data" :rowKey="row => row.id" multiple class="h-60">
      <template #header-address>Header Address</template>
      <template #address="{ value }">
        <span class="text-red">{{ value }}</span>
      </template>
      <template #expanded-row="{ row }">
        <div class="p-4">Expanded content for {{ row.name }}</div>
      </template>
      <template #details.description="{ value }">
        <span class="text-blue">{{ value }}</span>
      </template>
    </STable>
  </div>
</template>
