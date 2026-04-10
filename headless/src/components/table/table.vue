<script
  setup
  lang="ts"
  generic="
    T extends BaseTableData = BaseTableData,
    R extends string | number = string | number,
    M extends boolean = boolean
  "
>
import { computed, useId } from 'vue';
import type { CheckedState } from '../../types';
import { useControllableState, useOmitProps, useSelection } from '../../composables';
import { getTableRowLabel, getTableRowValueByDataIndex } from './shared';
import TableBody from './table-body.vue';
import TableCell from './table-cell.vue';
import TableContent from './table-content.vue';
import TableFooter from './table-footer.vue';
import TableHead from './table-head.vue';
import TableHeader from './table-header.vue';
import TableRoot from './table-root.vue';
import TableRow from './table-row.vue';
import type { BaseTableData, TableEmits, TableProps, TableSlots } from './types';

defineOptions({
  name: 'Table'
});

const props = withDefaults(defineProps<TableProps<T, R, M>>(), {
  multiple: true as any
});

const emit = defineEmits<TableEmits<R, M>>();

defineSlots<TableSlots<T>>();

const forwardedRootProps = useOmitProps(props, [
  'columns',
  'data',
  'rowKey',
  'defaultExpanded',
  'expanded',
  'defaultExpandAll',
  'defaultSelected',
  'selected',
  'multiple',
  'contentProps',
  'headerProps',
  'bodyProps',
  'footerProps',
  'headProps',
  'rowProps',
  'cellProps'
]);

const expanded = useControllableState(
  () => props.expanded as R[],
  value => {
    emit('update:expanded', value ?? []);
  },
  getDefaultExpanded()
);

const {
  modelValue: selected,
  onModelValueChange: onSelectedChange,
  setModelValue: setSelected,
  resetModelValue: resetSelected,
  isMultiple,
  isValueSelected
} = useSelection(
  computed(() => ({
    modelValue: props.selected,
    defaultValue: props.defaultSelected,
    multiple: props.multiple
  })),
  value => {
    emit('update:selected', value);
  }
);

const filteredColumns = computed(() => {
  return props.columns.filter(column => !column.hidden);
});

const hasExpandColumn = computed(() => {
  return filteredColumns.value.some(column => column.type === 'expand');
});

const isHeaderSelectionDisabled = computed(() => props.data.length === 0);

const headerSelection = computed<CheckedState>(() => {
  if (!Array.isArray(selected.value)) {
    return false;
  }

  if (selected.value.length === props.data.length) {
    return true;
  }

  if (selected.value.length > 0) {
    return 'indeterminate';
  }

  return false;
});

const singleSelectionName = `soybean-table-selection-${useId()}`;

function getDefaultExpanded() {
  if (props.defaultExpandAll) {
    return props.data.map(item => props.rowKey(item));
  }

  return props.defaultExpanded ?? [];
}

function toggleExpand(key: R) {
  const index = expanded.value.indexOf(key);

  if (index >= 0) {
    expanded.value = expanded.value.filter(expandedKey => expandedKey !== key);
    return;
  }

  expanded.value = [...expanded.value, key];
}

function updateHeaderChecked(state: CheckedState | null) {
  if (!Array.isArray(selected.value)) {
    return;
  }

  if (state === true) {
    setSelected(props.data.map(item => props.rowKey(item)));
    return;
  }

  resetSelected();
}

function isRowExpanded(key: R) {
  return expanded.value.includes(key);
}

function getRowLabel(row: T) {
  return getTableRowLabel(row, props.rowKey);
}
</script>

<template>
  <TableRoot v-bind="forwardedRootProps">
    <TableContent v-bind="contentProps">
      <TableHeader v-bind="headerProps">
        <TableRow v-bind="rowProps">
          <template v-for="column in filteredColumns" :key="column.dataIndex ?? `__${column.type}`">
            <TableHead
              v-if="column.dataIndex"
              v-bind="headProps"
              :align="column.align ?? 'left'"
              :style="{ width: column.width }"
            >
              <slot :name="`header-${column.dataIndex}`" :column="column">
                {{ column.title }}
              </slot>
            </TableHead>
            <TableHead
              v-else-if="column.type"
              v-bind="headProps"
              :align="column.align ?? 'center'"
              :style="{ width: column.width }"
            >
              <slot
                :name="`header-${column.type}`"
                :column="column"
                :multiple="isMultiple"
                :checked="headerSelection"
                :disabled="isHeaderSelectionDisabled"
                :update-checked="updateHeaderChecked"
              >
                <template v-if="column.type === 'index'">
                  {{ column.title ?? '#' }}
                </template>
                <template v-else-if="column.type === 'selection'">
                  <input
                    v-if="isMultiple"
                    type="checkbox"
                    :checked.prop="headerSelection === true"
                    :indeterminate.prop="headerSelection === 'indeterminate'"
                    :aria-checked="headerSelection === 'indeterminate' ? 'mixed' : `${headerSelection}`"
                    aria-label="Select all rows"
                    :disabled="isHeaderSelectionDisabled"
                    @change="updateHeaderChecked(($event.target as HTMLInputElement).checked)"
                  >
                </template>
                <template v-else-if="column.type === 'expand'">
                  {{ column.title }}
                </template>
              </slot>
            </TableHead>
          </template>
        </TableRow>
      </TableHeader>
      <TableBody v-bind="bodyProps">
        <template v-for="(item, index) in data" :key="rowKey(item)">
          <TableRow v-bind="rowProps" data-row>
            <template v-for="column in filteredColumns" :key="column.dataIndex ?? `__${column.type}`">
              <TableCell
                v-if="column.dataIndex"
                v-bind="cellProps"
                :align="column.align ?? 'left'"
                :style="{ width: column.width }"
              >
                <slot
                  :name="column.dataIndex"
                  :index="index"
                  :column="column"
                  :row="item"
                  :value="getTableRowValueByDataIndex(item, column.dataIndex)"
                >
                  {{ getTableRowValueByDataIndex(item, column.dataIndex) }}
                </slot>
              </TableCell>
              <TableCell
                v-else-if="column.type"
                v-bind="cellProps"
                :align="column.align ?? 'center'"
                :style="{ width: column.width }"
              >
                <slot v-if="column.type === 'index'" name="index" :index="index" :column="column" :row="item">
                  {{ index + 1 }}
                </slot>
                <slot
                  v-else-if="column.type === 'selection'"
                  name="selection"
                  :index="index"
                  :column="column"
                  :row="item"
                  :multiple="isMultiple"
                  :checked="isValueSelected(rowKey(item))"
                  :toggle-select="() => onSelectedChange(rowKey(item))"
                >
                  <input
                    v-if="isMultiple"
                    type="checkbox"
                    :checked="isValueSelected(rowKey(item))"
                    :aria-label="`Select row ${getRowLabel(item)}`"
                    @change="onSelectedChange(rowKey(item))"
                  >
                  <input
                    v-else
                    type="radio"
                    :name="singleSelectionName"
                    :checked="isValueSelected(rowKey(item))"
                    :aria-label="`Select row ${getRowLabel(item)}`"
                    @click="onSelectedChange(rowKey(item))"
                  >
                </slot>
                <slot
                  v-else-if="column.type === 'expand'"
                  name="expand"
                  :index="index"
                  :column="column"
                  :row="item"
                  :expanded="isRowExpanded(rowKey(item))"
                  :toggle-expand="() => toggleExpand(rowKey(item))"
                >
                  <button
                    type="button"
                    :aria-expanded="isRowExpanded(rowKey(item))"
                    :aria-label="isRowExpanded(rowKey(item)) ? 'Collapse row' : 'Expand row'"
                    @click="toggleExpand(rowKey(item))"
                  >
                    {{ isRowExpanded(rowKey(item)) ? '−' : '+' }}
                  </button>
                </slot>
              </TableCell>
            </template>
          </TableRow>
          <TableRow v-if="hasExpandColumn && isRowExpanded(rowKey(item))" v-bind="rowProps" data-expanded-row>
            <TableCell v-bind="cellProps" :colspan="filteredColumns.length">
              <slot name="expanded-row" :index="index" :row="item" />
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
      <TableFooter v-if="$slots.footer" v-bind="footerProps">
        <slot name="footer" :column-size="filteredColumns.length" />
      </TableFooter>
    </TableContent>
  </TableRoot>
</template>
