<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  role: string;
  location: string;
  score: number;
}

const columns: TableColumn<TableData>[] = [
  { title: 'Name', dataIndex: 'name', width: '160px', fixed: 'left', resizable: true },
  { title: 'Role', dataIndex: 'role', width: '180px', resizable: true },
  { title: 'Location', dataIndex: 'location', width: '180px' },
  { title: 'Score', dataIndex: 'score', width: '120px', align: 'center', fixed: 'right' }
];

const data: TableData[] = [
  { id: 1, name: 'Ada Lovelace', role: 'Architect', location: 'London', score: 96 },
  { id: 2, name: 'Linus Torvalds', role: 'Maintainer', location: 'Helsinki', score: 88 },
  { id: 3, name: 'Grace Hopper', role: 'Scientist', location: 'New York', score: 92 }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Fixed Columns and Resizing</h3>
    <STable :columns="columns" :data="data" :row-key="row => row.id" bordered class="max-w-120" />
  </div>
</template>
