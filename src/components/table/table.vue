<script
  setup
  lang="ts"
  generic="
    T extends BaseTableData = BaseTableData,
    R extends string | number = string | number,
    M extends boolean = boolean
  "
>
import { computed } from 'vue';
import {
  TableRoot,
  TableContent,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  provideTableUi
} from '@soybeanjs/headless';
import type { CheckedState } from '@soybeanjs/headless';
import { useControllableState, useSelection } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import SCheckbox from '../checkbox/checkbox.vue';
import SButtonIcon from '../button/button-icon.vue';
import TableRadio from './table-radio.vue';
import { tableVariants } from './variants';
import { getTableRowValueByDataIndex } from './shared';
import type { TableProps, TableEmits, TableSlots, BaseTableData } from './types';

defineOptions({
  name: 'STable'
});

const props = defineProps<TableProps<T, R, M>>();

const emit = defineEmits<TableEmits<R, M>>();

const slots = defineSlots<TableSlots<T>>();

const ui = computed(() => {
  const variants = tableVariants({
    size: props.size,
    bordered: props.bordered,
    striped: props.striped
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const expanded = useControllableState(
  () => props.expanded as R[],
  value => {
    emit('update:expanded', value ?? []);
  },
  getDefaultExpanded()
);

function getDefaultExpanded() {
  if (props.defaultExpandAll) {
    return props.data.map(item => props.rowKey(item));
  }
  return props.defaultExpanded ?? [];
}

const toggleExpand = (key: R) => {
  const index = expanded.value.indexOf(key);
  if (index >= 0) {
    expanded.value = expanded.value.filter(k => k !== key);
  } else {
    expanded.value = [...expanded.value, key];
  }
};

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

const headerSelection = computed<CheckedState>(() => {
  if (!Array.isArray(selected.value)) {
    return false;
  }

  if (selected.value.length === 0) {
    return false;
  }
  if (selected.value.length === props.data.length) {
    return true;
  }

  return 'indeterminate';
});

const updateHeaderChecked = (state: CheckedState | null) => {
  if (!Array.isArray(selected.value)) {
    return;
  }

  if (state === true) {
    const updated = props.data.map(item => props.rowKey(item));

    setSelected(updated);
  } else {
    resetSelected();
  }
};

const filteredColumns = computed(() => {
  return props.columns.filter(column => !column.hidden);
});

const hasExpandColumn = computed(() => {
  return props.columns.some(column => column.type === 'expand');
});

provideTableUi(ui);
</script>

<template>
  <TableRoot>
    <TableContent v-bind="contentProps">
      <TableHeader v-bind="headerProps">
        <TableRow v-bind="rowProps">
          <template v-for="column in filteredColumns">
            <TableHead
              v-if="column.dataIndex"
              v-bind="headProps"
              :key="column.dataIndex"
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
              :key="`__${column.type}`"
              :align="column.align ?? 'center'"
              :style="{ width: column.width }"
            >
              <slot :name="`header-${column.type}`" :column="column" :multiple="isMultiple">
                <template v-if="column.type === 'index'">
                  {{ column.title ?? '#' }}
                </template>
                <template v-if="column.type === 'selection'">
                  <SCheckbox
                    v-if="isMultiple"
                    :model-value="headerSelection"
                    :class="ui.selection"
                    @update:model-value="updateHeaderChecked"
                  />
                </template>
                <template v-if="column.type === 'expand'">
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
            <template v-for="column in filteredColumns">
              <TableCell
                v-if="column.dataIndex"
                v-bind="cellProps"
                :key="column.dataIndex"
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
                :key="`__${column.type}`"
                :align="column.align ?? 'center'"
                :style="{ width: column.width }"
              >
                <slot v-if="column.type === 'index'" name="index" :index="index" :column="column" :row="item">
                  {{ index + 1 }}
                </slot>
                <slot
                  v-if="column.type === 'selection'"
                  name="selection"
                  :index="index"
                  :column="column"
                  :row="item"
                  :multiple="isMultiple"
                >
                  <SCheckbox
                    v-if="isMultiple"
                    :class="ui.selection"
                    :model-value="isValueSelected(rowKey(item))"
                    @update:model-value="onSelectedChange(rowKey(item))"
                  />
                  <TableRadio
                    v-else
                    :size="size"
                    :checked="isValueSelected(rowKey(item))"
                    @click="onSelectedChange(rowKey(item))"
                  />
                </slot>
                <slot
                  v-if="column.type === 'expand'"
                  name="expand"
                  :index="index"
                  :column="column"
                  :row="item"
                  :expanded="expanded.includes(rowKey(item))"
                  :toggle-expand="() => toggleExpand(rowKey(item))"
                >
                  <SButtonIcon
                    v-if="expanded.includes(rowKey(item))"
                    icon="lucide:chevron-down"
                    @click="toggleExpand(rowKey(item))"
                  />
                  <SButtonIcon v-else icon="lucide:chevron-right" @click="toggleExpand(rowKey(item))" />
                </slot>
              </TableCell>
            </template>
          </TableRow>
          <TableRow v-if="hasExpandColumn && expanded.includes(rowKey(item))" v-bind="rowProps" data-expanded-row>
            <TableCell v-bind="cellProps" :colspan="filteredColumns.length">
              <slot name="expanded-row" :index="index" :row="item" />
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
      <TableFooter v-if="slots.footer" v-bind="footerProps">
        <slot name="footer" :column-size="filteredColumns.length" />
      </TableFooter>
    </TableContent>
  </TableRoot>
</template>
