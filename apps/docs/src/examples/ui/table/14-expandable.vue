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
  { type: 'expand', size: 50 },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Age', accessorKey: 'age', align: 'center' },
  { header: 'Address', accessorKey: 'address' }
];

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' }
];
</script>

<template>
  <STable :columns="columns" :data="data" :row-key="row => row.id">
    <template #expanded-row="{ row }">
      <!-- 展开详情是静态弱化块：`accent` 是行 hover 面，用在这里会让详情看起来处于 hover 态 -->
      <div class="p-4 bg-muted">
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
</template>
