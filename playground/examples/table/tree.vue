<script setup lang="ts">
import { ref } from 'vue';
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface DepartmentRow {
  id: number;
  name: string;
  age: number;
  role: string;
  children?: DepartmentRow[];
}

const columns: TableColumn<DepartmentRow>[] = [
  { title: 'Name', dataIndex: 'name', width: '220px' },
  { title: 'Age', dataIndex: 'age', align: 'center', width: '100px' },
  { title: 'Role', dataIndex: 'role', width: '180px' }
];

const expanded = ref<number[]>([1]);

const data: DepartmentRow[] = [
  {
    id: 1,
    name: 'Engineering',
    age: 12,
    role: 'Department',
    children: [
      {
        id: 11,
        name: 'Platform Team',
        age: 6,
        role: 'Team',
        children: [
          { id: 111, name: 'Ada', age: 32, role: 'Engineer' },
          { id: 112, name: 'Linus', age: 28, role: 'Engineer' }
        ]
      },
      { id: 12, name: 'Design Team', age: 4, role: 'Team' }
    ]
  },
  { id: 2, name: 'Operations', age: 8, role: 'Department' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Tree</h3>
    <STable v-model:expanded="expanded" bordered :columns="columns" :data="data" :row-key="row => row.id" />
  </div>
</template>
