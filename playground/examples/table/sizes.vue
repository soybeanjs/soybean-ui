<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
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

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Sizes</h3>
    <div class="space-y-4">
      <STable size="xs" :columns="columns" :data="data" :row-key="row => row.id" bordered="all" />
      <STable size="sm" :columns="columns" :data="data" :row-key="row => row.id" bordered="all" />
      <STable size="md" :columns="columns" :data="data" :row-key="row => row.id" bordered="all" />
      <STable size="lg" :columns="columns" :data="data" :row-key="row => row.id" bordered="all" />
    </div>
  </div>
</template>
