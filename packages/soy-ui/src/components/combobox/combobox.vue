<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, ref } from 'vue';
import { useCombinedPropsEmits, useOmitEmitAsProps, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue, SelectEvent } from '@soybean-ui/primitives';
import { ChevronsUpDown } from 'lucide-vue-next';
import SButton from '../button/button.vue';
import SComboboxRoot from './combobox-root.vue';
import SComboboxAnchor from './combobox-anchor.vue';
import SComboboxEmpty from './combobox-empty.vue';
import SComboboxInput from './combobox-input.vue';
import SComboboxTrigger from './combobox-trigger.vue';
import SComboboxSearchIcon from './combobox-search-icon.vue';
import SComboboxList from './combobox-list.vue';
import SComboboxOption from './combobox-option.vue';
import { getComboboxOptionByValue } from './shared';
import type { ComboboxEmits, ComboboxOptionData, ComboboxProps } from './types';

defineOptions({
  name: 'SCombobox'
});

const props = withDefaults(defineProps<ComboboxProps<T>>(), {
  mode: 'modern'
});

const emit = defineEmits<ComboboxEmits<T>>();

const forwardedRootProps = useOmitForwardProps(props, [
  'size',
  'mode',
  'ui',
  'items',
  'inputProps',
  'inputModelValue',
  'emptyLabel'
]);

const forwardedRootEmits = useOmitEmitAsProps<ComboboxEmits<T>>(emit, ['select', 'update:inputModelValue']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const selectItem = ref<ComboboxOptionData<T>>();

function handleSelect(item: ComboboxOptionData<T>, event: SelectEvent<T>) {
  selectItem.value = item;
  emit('select', item, event);
}

const defaultTriggerLabel = 'Select an option';
const defaultInputPlaceholder = `${defaultTriggerLabel}...`;
const defaultEmptyLabel = 'Nothing found.';

const selectItemLabel = computed(() => {
  const findItem = selectItem.value || getComboboxOptionByValue(props.items, props.modelValue);

  return findItem?.label || '';
});

const modernTriggerLabel = computed(() => selectItemLabel.value || props.triggerLabel || defaultTriggerLabel);

const computedInputProps = computed(() => ({
  placeholder: props.inputProps?.placeholder || defaultInputPlaceholder,
  displayValue: () => selectItemLabel.value || '',
  ...props.inputProps
}));
</script>

<template>
  <SComboboxRoot v-bind="forwardedRoot">
    <SComboboxAnchor :class="ui?.anchor">
      <SComboboxTrigger v-if="mode === 'modern'" :class="ui?.trigger" :size="size" as-child>
        <SButton :size="size" variant="pure">
          {{ modernTriggerLabel }}
          <template #trailing>
            <ChevronsUpDown />
          </template>
        </SButton>
      </SComboboxTrigger>
      <SComboboxInput
        v-if="mode === 'traditional'"
        v-bind="computedInputProps"
        :model-value="inputModelValue"
        :class="ui?.input"
        :wrapper-class="ui?.inputWrapper"
        :size="size"
        :mode="mode"
        @update:model-value="emit('update:inputModelValue', $event)"
      >
        <template #trailing>
          <SComboboxTrigger :size="size" :mode="mode">
            <ChevronsUpDown />
          </SComboboxTrigger>
        </template>
      </SComboboxInput>
    </SComboboxAnchor>
    <SComboboxList :class="ui?.list" :size="size">
      <SComboboxInput
        v-if="mode === 'modern'"
        v-bind="computedInputProps"
        :model-value="inputModelValue"
        :class="ui?.input"
        :wrapper-class="ui?.inputWrapper"
        :size="size"
        :mode="mode"
        @update:model-value="emit('update:inputModelValue', $event)"
      >
        <template #trailing>
          <SComboboxSearchIcon :class="ui?.searchIcon" :size="size" />
        </template>
      </SComboboxInput>
      <SComboboxEmpty :class="ui?.empty" :size="size">{{ emptyLabel || defaultEmptyLabel }}</SComboboxEmpty>
      <SComboboxOption
        v-for="(item, itemIndex) in items"
        v-slot="slotProps"
        :key="itemIndex"
        :size="size"
        :item="item"
        :ui="ui"
        @select="handleSelect"
      >
        <slot name="item" v-bind="slotProps" />
      </SComboboxOption>
    </SComboboxList>
  </SComboboxRoot>
</template>
