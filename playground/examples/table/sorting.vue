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

const sortableColumns: TableColumn<GroupedTableData>[] = [
  { title: 'Name', dataIndex: 'name', sorter: true },
  { title: 'Age', dataIndex: 'age', align: 'center', sorter: true },
  { title: 'Score', dataIndex: 'score', align: 'center', sorter: (prev, next) => prev.score - next.score }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Sorting</h3>
    <STable :columns="sortableColumns" :data="groupedTableData" :row-key="row => row.id" />
  </div>
</template>
