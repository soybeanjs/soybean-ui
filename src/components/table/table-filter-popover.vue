<script setup lang="ts" generic="T extends TableBaseData = TableBaseData">
import { computed } from 'vue';
import { miniSizeMap } from '@/theme';
import SButton from '../button/button.vue';
import SButtonIcon from '../button/button-icon.vue';
import SCheckbox from '../checkbox/checkbox.vue';
import SInput from '../input/input.vue';
import SPopover from '../popover/popover.vue';
import type { TableBaseData, TableFilterPopoverProps } from './types';

defineOptions({
  name: 'STableFilterPopover'
});

const props = defineProps<TableFilterPopoverProps<T>>();

const columnLabel = computed(() => props.column.title ?? props.column.key ?? props.column.dataIndex ?? 'column');

const filteredOptions = computed(() => {
  const keyword = props.filterValue.trim().toLowerCase();

  if (!keyword) {
    return props.filterOptions;
  }

  return props.filterOptions.filter(option => {
    return option.label.toLowerCase().includes(keyword) || option.value.toLowerCase().includes(keyword);
  });
});

const hasVisibleOptions = computed(() => filteredOptions.value.length > 0);

const filterSummary = computed(() => {
  if (props.filterValues.length > 0) {
    return `${props.filterValues.length} selected`;
  }

  if (props.filterValue.trim().length > 0) {
    return 'Keyword active';
  }

  return props.filterOptions.length > 0 ? `${props.filterOptions.length} options` : 'No filter options';
});

const triggerLabel = computed(() => {
  return props.filtered ? `Edit filter for ${columnLabel.value}` : `Filter ${columnLabel.value}`;
});

const searchAriaLabel = computed(() => `Search filter options for ${columnLabel.value}`);

const miniSize = computed(() => miniSizeMap[props.size ?? 'md']);

function updateKeyword(value: string | number | undefined) {
  props.setFilterValue(String(value ?? ''));
}
</script>

<template>
  <SPopover :class="ui.filterPopup" :size="size" placement="bottom-end" :show-arrow="false">
    <template #trigger>
      <SButtonIcon
        icon="lucide:funnel"
        :data-filtered="props.filtered ? '' : undefined"
        :class="ui.filterTrigger"
        :size="miniSize"
        :aria-label="triggerLabel"
        :aria-pressed="filtered || undefined"
      />
    </template>

    <SInput
      :class="ui.filterSearch"
      :size="miniSize"
      :model-value="filterValue"
      :control-props="{ 'aria-label': searchAriaLabel, placeholder: `Search ${columnLabel}` }"
      @update:model-value="updateKeyword"
    />

    <div v-if="filterOptions.length > 0" :class="ui.filterOptions">
      <SCheckbox
        v-for="option in filteredOptions"
        :key="option.value"
        :class="ui.filterOption"
        :size="size"
        :disabled="option.disabled"
        :model-value="isFilterOptionSelected(option.value)"
        :label="option.label"
        :ui="{ label: ui.filterOptionLabel }"
        :control-props="{ 'aria-label': `Select ${option.label}` }"
        @update:model-value="toggleFilterOption(option.value)"
      />

      <div v-if="!hasVisibleOptions" :class="ui.filterEmpty">No matching options</div>
    </div>

    <div :class="ui.filterFooter">
      <span :class="ui.filterCount">{{ filterSummary }}</span>
      <SButton
        v-if="filtered"
        variant="ghost"
        color="accent"
        fit-content
        :size="miniSize"
        :class="ui.filterAction"
        @click="clearFilter"
      >
        Clear
      </SButton>
    </div>
  </SPopover>
</template>
