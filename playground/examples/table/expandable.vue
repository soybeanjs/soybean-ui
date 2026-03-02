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
  { type: 'expand', width: '50px' },
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
    <h3 class="playground-title">Expandable</h3>
    <STable :columns="columns" :data="data" :row-key="row => row.id">
      <template #expanded-row="{ row }">
        <div class="p-4 bg-accent">
          <p>
            <strong>Name:</strong>
            {{ row.name }}
          </p>
          <p>
            <strong>Age:</strong>
            {{ row.age }}
          </p>
          <p>
            <strong>Address:</strong>
            {{ row.address }}
          </p>
        </div>
      </template>
    </STable>
  </div>
</template>
