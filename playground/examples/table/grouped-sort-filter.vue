<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  age: number;
  city: string;
  score: number;
}

const columns: TableColumn<TableData>[] = [
  {
    title: 'Profile',
    key: 'profile',
    children: [
      { title: 'Name', dataIndex: 'name', filter: { placeholder: 'Filter by name' } },
      { title: 'City', dataIndex: 'city', filter: true }
    ]
  },
  {
    title: 'Metrics',
    key: 'metrics',
    children: [
      { title: 'Age', dataIndex: 'age', align: 'center', sorter: true },
      { title: 'Score', dataIndex: 'score', align: 'center', sorter: (prev, next) => prev.score - next.score }
    ]
  }
];

const data: TableData[] = [
  { id: 1, name: 'Ada Lovelace', age: 36, city: 'London', score: 96 },
  { id: 2, name: 'Linus Torvalds', age: 28, city: 'Helsinki', score: 88 },
  { id: 3, name: 'Grace Hopper', age: 41, city: 'New York', score: 92 }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Grouped Headers, Sorting and Filtering</h3>
    <STable :columns="columns" :data="data" :row-key="row => row.id" bordered />
  </div>
</template>
