<script setup lang="ts">
import { ref } from 'vue';
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumn<TableData>[] = [
  { type: 'selection', width: '50px' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' },
  { title: 'Address', dataIndex: 'address' }
];

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' }
];

const selected = ref<number | undefined>(1);
</script>

<template>
  <div>
    <h3 class="playground-title">Single Selection</h3>
    <STable v-model:selected="selected" :columns="columns" :data="data" :row-key="row => row.id" :multiple="false" />
    <div class="mt-4">Selected: {{ selected }}</div>
  </div>
</template>
