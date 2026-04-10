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
import { DataTableRoot, provideTableUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import SButtonIcon from '../button/button-icon.vue';
import SCheckbox from '../checkbox/checkbox.vue';
import TableRadio from './table-radio.vue';
import type { BaseTableData, TableEmits, TableProps, TableSlots } from './types';
import { tableVariants } from './variants';

defineOptions({
  name: 'STable'
});

const props = defineProps<TableProps<T, R, M>>();

const emit = defineEmits<TableEmits<R, M>>();

defineSlots<TableSlots<T> & Record<string, ((props: any) => any) | undefined>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size', 'bordered', 'striped']);
const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tableVariants({
    size: props.size,
    bordered: props.bordered,
    striped: props.striped
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTableUi(ui);
</script>

<template>
  <DataTableRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>

    <template v-if="!$slots['header-selection']" #header-selection="{ checked, multiple, updateChecked }">
      <SCheckbox
        v-if="multiple"
        :model-value="checked"
        :class="ui.selection"
        :control-props="{ 'aria-label': 'Select all rows' }"
        @update:model-value="updateChecked"
      />
    </template>

    <template v-if="!$slots.selection" #selection="{ checked, multiple, row, toggleSelect }">
      <SCheckbox
        v-if="multiple"
        :class="ui.selection"
        :model-value="checked"
        :control-props="{ 'aria-label': `Select row ${rowKey(row)}` }"
        @update:model-value="toggleSelect()"
      />
      <TableRadio
        v-else
        :size="size"
        :checked="checked"
        :aria-label="`Select row ${rowKey(row)}`"
        @click="toggleSelect()"
      />
    </template>

    <template v-if="!$slots.expand" #expand="{ expanded, toggleExpand }">
      <SButtonIcon
        v-if="expanded"
        icon="lucide:chevron-down"
        aria-label="Collapse row"
        @click="toggleExpand()"
      />
      <SButtonIcon
        v-else
        icon="lucide:chevron-right"
        aria-label="Expand row"
        @click="toggleExpand()"
      />
    </template>
  </DataTableRoot>
</template>
