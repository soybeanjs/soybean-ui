<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';
import { toTypeAnchorId, typeToVNode } from './type-anchor';
import { useApiI18n } from './use-api-i18n';

export type TypeFieldDef = {
  name: string;
  required?: boolean;
  type: string;
  description?: string;
  descriptionKey?: string | null;
};

interface Props {
  name: string;
  displayName?: string;
  description?: string;
  descriptionKey?: string | null;
  fields: TypeFieldDef[];
  hideHeader?: boolean;
}

const props = defineProps<Props>();
const { resolveApiText, t } = useApiI18n();

const anchorId = computed(() => toTypeAnchorId(props.name));

type TableRow = TypeFieldDef & {
  __rowKey: string;
};

const columns = computed<TableColumn<TableRow>[]>(() => [
  {
    key: 'name',
    dataIndex: 'name',
    title: t('api.columns.field_name'),
    minWidth: '144px'
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: t('api.columns.type'),
    minWidth: '176px'
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: t('api.columns.description'),
    minWidth: '240px'
  }
]);

const tableData = computed<TableRow[]>(() => {
  return props.fields.map((field, index) => ({
    ...field,
    __rowKey: `${field.name}-${index}`
  }));
});

const resolvedDescription = computed(() => resolveApiText(props.description, props.descriptionKey));

function getFieldDescription(field: TypeFieldDef) {
  return resolveApiText(field.description, field.descriptionKey) || '—';
}
</script>

<template>
  <div>
    <h4 v-if="!hideHeader" :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
      <component :is="typeToVNode(displayName || name)" />
    </h4>
    <p v-if="resolvedDescription && !hideHeader" class="text-sm text-muted-foreground">
      {{ resolvedDescription }}
    </p>

    <div class="min-w-0 overflow-x-auto">
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
          <div class="max-w-[20rem] whitespace-pre-wrap break-words">
            {{ getFieldDescription(row) }}
          </div>
        </template>
      </STable>
    </div>
  </div>
</template>
