<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableRowData {
  id: number;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumn<TableRowData>[] = [
  { type: 'index', width: '56px' },
  { title: 'Name', dataIndex: 'name', width: '180px' },
  { title: 'Age', dataIndex: 'age', align: 'center', width: '100px' },
  { title: 'Address', dataIndex: 'address', width: '260px' }
];

const data: TableRowData[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 30),
  address: `Block ${index + 1}, Soybean Street`
}));
</script>

<template>
  <div>
    <h3 class="playground-title">Virtualized</h3>
    <STable
      virtual
      height="280px"
      bordered
      :estimate-size="40"
      :columns="columns"
      :data="data"
      :row-key="row => row.id"
    />
  </div>
</template>
