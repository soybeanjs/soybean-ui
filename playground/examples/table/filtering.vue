<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface GroupedTableData {
  id: number;
  name: string;
  age: number;
  city: string;
  score: number;
}

const groupedTableData: GroupedTableData[] = [
  { id: 1, name: 'Ada Lovelace', age: 36, city: 'London', score: 96 },
  { id: 2, name: 'Linus Torvalds', age: 28, city: 'Helsinki', score: 88 },
  { id: 3, name: 'Grace Hopper', age: 41, city: 'New York', score: 92 }
];

const filterableColumns: TableColumn<GroupedTableData>[] = [
  { title: 'Name', dataIndex: 'name', filter: { placeholder: 'Filter by name' } },
  { title: 'City', dataIndex: 'city', filter: true },
  { title: 'Score', dataIndex: 'score', align: 'center' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Filtering</h3>
    <STable :columns="filterableColumns" :data="groupedTableData" :row-key="row => row.id" />
  </div>
</template>
