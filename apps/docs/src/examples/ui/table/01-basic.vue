<script setup lang="ts">
import { STable } from '@vean/ui';
import type { TableColumn } from '@vean/ui';

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
  { type: 'index', size: 50 },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Age', accessorKey: 'age', align: 'center' },
  { header: 'Address', accessorKey: 'address' },
  { header: 'Details', accessorKey: 'details.description' }
];

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' },
  { id: 4, name: 'Alice Brown', age: 35, address: '321 Pine St' },
  {
    id: 5,
    name: 'Charlie Davis',
    age: 28,
    address: '654 Maple',
    details: { description: 'Detail for Charlie Davis' }
  },
  { id: 6, name: 'Eve White', age: 32, address: '987 Cedar St' },
  { id: 7, name: 'Frank Green', age: 45, address: '246 Birch St' },
  { id: 8, name: 'Grace Lee', age: 27, address: '135 Spruce St' },
  { id: 9, name: 'Hank Miller', age: 38, address: '864 Willow St' },
  { id: 10, name: 'Ivy Wilson', age: 29, address: '753 Aspen St' }
];
</script>

<template>
  <STable caption="Table Caption" :columns="columns" :data="data" :row-key="row => row.id" class="h-60">
    <template #header-address>Header Address</template>
    <template #address="{ value }">
      <span class="text-red">{{ value }}</span>
    </template>
    <template #details.description="{ value }">
      <span class="text-blue">{{ value }}</span>
    </template>
  </STable>
</template>
