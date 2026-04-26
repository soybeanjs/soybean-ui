<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';
import { toTypeAnchorId, typeToVNode } from './type-anchor';

export type TypeFieldDef = {
  name: string;
  required?: boolean;
  type: string;
  description?: string;
};

interface Props {
  name: string;
  description?: string;
  fields: TypeFieldDef[];
}

const props = defineProps<Props>();

const anchorId = computed(() => toTypeAnchorId(props.name));

type TableRow = TypeFieldDef & {
  __rowKey: string;
};

const columns = computed<TableColumn<TableRow>[]>(() => [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Field',
    minWidth: '180px'
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: 'Type',
    minWidth: '200px'
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Description',
    minWidth: '320px'
  }
]);

const tableData = computed<TableRow[]>(() => {
  return props.fields.map((field, index) => ({
    ...field,
    __rowKey: `${field.name}-${index}`
  }));
});
</script>

<template>
  <div>
    <h4 :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
      {{ name }}
    </h4>
    <p v-if="description" class="text-sm text-muted-foreground">
      {{ description }}
    </p>

    <STable :columns="columns" :data="tableData" :row-key="row => row.__rowKey" size="sm" bordered>
      <template #name="{ row }">
        <div class="code-btn">
          <span>{{ row.name }}</span>
          <span v-if="row.required" class="ml-1 text-destructive/80">*</span>
        </div>
      </template>

      <template #type="{ row }">
        <div class="code-btn-outline">
          <component :is="typeToVNode(row.type)" />
        </div>
      </template>

      <template #description="{ row }">
        {{ row.description || '—' }}
      </template>
    </STable>
  </div>
</template>
