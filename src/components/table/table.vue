<script
  setup
  lang="ts"
  generic="
    T extends TableBaseData = TableBaseData,
    R extends string | number = string | number,
    M extends boolean = boolean
  "
>
import { computed } from 'vue';
import { provideTableUi, TableCompact } from '@soybeanjs/headless';
import type { TableSortOrder } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, miniSizeMap } from '@/theme';
import SButtonIcon from '../button/button-icon.vue';
import SCheckbox from '../checkbox/checkbox.vue';
import TableFilterPopover from './table-filter-popover.vue';
import TableRadio from './table-radio.vue';
import { tableVariants } from './variants';
import type { TableBaseData, TableEmits, TableProps, TableSlots } from './types';

defineOptions({
  name: 'STable'
});

const props = withDefaults(defineProps<TableProps<T, R, M>>(), {
  multiple: true as any
});

const emit = defineEmits<TableEmits<R, M>>();

const slots = defineSlots<TableSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size', 'bordered', 'striped']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => Object.keys(slots) as Array<keyof TableSlots<T>>);

const ui = computed(() => {
  const variants = tableVariants({
    size: props.size,
    bordered: props.bordered,
    striped: props.striped
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const miniSize = computed(() => miniSizeMap[props.size ?? 'md']);

const getOrderIcon = (sortOrder?: TableSortOrder) => {
  return sortOrder === 'asc' ? 'lucide:arrow-up' : sortOrder === 'desc' ? 'lucide:arrow-down' : 'lucide:arrow-up-down';
};

provideTableUi(ui);
</script>

<template>
  <TableCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>

    <template v-if="!slots['header-selection']" #header-selection="{ checked, disabled, multiple, updateChecked }">
      <SCheckbox
        v-if="multiple"
        :disabled="disabled"
        :model-value="checked"
        :class="ui.selection"
        :control-props="{ 'aria-label': 'Select all rows' }"
        @update:model-value="updateChecked"
      />
    </template>

    <template v-if="!slots.selection" #selection="{ checked, multiple, ariaLabel, toggleSelect }">
      <SCheckbox
        v-if="multiple"
        :class="ui.selection"
        :model-value="checked"
        :control-props="{ 'aria-label': ariaLabel }"
        @update:model-value="toggleSelect()"
      />
      <TableRadio v-else :size="size" :checked="checked" :aria-label="ariaLabel" @click="toggleSelect()" />
    </template>

    <template v-if="!slots['header-sort']" #header-sort="{ sortOrder, ariaLabel, toggleSort }">
      <SButtonIcon
        :icon="getOrderIcon(sortOrder)"
        :class="ui.sortTrigger"
        :size="miniSize"
        :aria-label="ariaLabel"
        :data-sorted="sortOrder ? '' : undefined"
        @click="toggleSort()"
      />
    </template>

    <template v-if="!slots['header-filter']" #header-filter="slotProps">
      <TableFilterPopover v-bind="slotProps" :ui="ui" :size="size" />
    </template>

    <template v-if="!slots['header-resize']" #header-resize="{ resizing, ariaLabel, onPointerdown, onKeydown }">
      <button
        type="button"
        :class="ui.resizeHandle"
        :aria-label="ariaLabel"
        :aria-pressed="resizing"
        :data-resizing="resizing || undefined"
        @pointerdown="onPointerdown"
        @keydown="onKeydown"
      />
    </template>

    <template v-if="!slots['tree-toggle']" #tree-toggle="{ expanded, ariaLabel, toggleExpand }">
      <SButtonIcon
        :class="ui.treeToggle"
        :size="miniSize"
        :aria-expanded="expanded"
        :aria-label="ariaLabel"
        :icon="expanded ? 'lucide:chevron-down' : 'lucide:chevron-right'"
        @click="toggleExpand()"
      />
    </template>

    <template v-if="!slots.expand" #expand="{ expanded, ariaLabel, hasChildren, toggleExpand }">
      <SButtonIcon
        v-if="hasChildren || slots['expanded-row']"
        :icon="expanded ? 'lucide:chevron-down' : 'lucide:chevron-right'"
        :class="ui.treeToggle"
        :size="miniSize"
        :aria-expanded="expanded"
        :aria-label="ariaLabel"
        :data-expanded="expanded ? '' : undefined"
        @click="toggleExpand()"
      />
    </template>
  </TableCompact>
</template>
