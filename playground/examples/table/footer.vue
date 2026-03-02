<script setup lang="ts">
import { STable, STableRow, STableCell, SButton } from '@soybeanjs/ui';
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
    <h3 class="playground-title">With Footer</h3>
    <STable :columns="columns" :data="data" :row-key="row => row.id" bordered="all">
      <template #footer="{ columnSize }">
        <STableRow>
          <STableCell :colspan="columnSize" align="center">
            <div class="flex justify-between items-center p-4">
              <span>Total: {{ data.length }} items</span>
              <div class="flex gap-2">
                <SButton size="sm" variant="outline">Previous</SButton>
                <SButton size="sm" variant="outline">Next</SButton>
              </div>
            </div>
          </STableCell>
        </STableRow>
      </template>
    </STable>
  </div>
</template>
