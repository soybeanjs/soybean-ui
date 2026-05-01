<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import { defu } from 'defu';
import { useControllableState, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import {
  ComboboxAnchor as AutocompleteAnchor,
  ComboboxContent as AutocompleteContent,
  ComboboxGroup as AutocompleteGroup,
  ComboboxGroupLabel as AutocompleteGroupLabel,
  ComboboxItem as AutocompleteItem,
  ComboboxItemIndicator as AutocompleteItemIndicator,
  ComboboxSeparator as AutocompleteSeparator,
  ComboboxTrigger as AutocompleteTrigger,
  ComboboxViewport as AutocompleteViewport,
  ComboboxEmpty as AutocompleteEmpty,
  ComboboxCancel as AutocompleteCancel
} from '../combobox';
import { Portal } from '../portal';
import AutocompleteRoot from './autocomplete-root.vue';
import AutocompleteInput from './autocomplete-input.vue';
import { getAutocompleteItemOptions, getAutocompleteSearchOptions, isGroupOption } from './shared';
import type {
  AutocompleteCompactEmits,
  AutocompleteCompactProps,
  AutocompleteCompactSlots,
  AutocompleteSearchOptionData,
  AutocompleteSingleOptionData
} from './types';

defineOptions({
  name: 'AutocompleteCompact'
});

const props = withDefaults(defineProps<AutocompleteCompactProps<T>>(), {
  modelValue: undefined,
  open: undefined,
  clearable: false,
  clearLabel: 'Clear input',
  emptyLabel: 'No results found.'
});

const emit = defineEmits<AutocompleteCompactEmits<T>>();

defineSlots<AutocompleteCompactSlots<T>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'modelValue',
  'defaultValue',
  'placeholder',
  'clearable',
  'clearLabel',
  'emptyLabel',
  'fuseOptions',
  'anchorProps',
  'inputProps',
  'triggerProps',
  'portalProps',
  'contentProps',
  'viewportProps',
  'groupProps',
  'groupLabelProps',
  'itemProps',
  'itemIndicatorProps',
  'separatorProps'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
) as ShallowRef<string>;

const fuseOptions = computed(() =>
  defu(props.fuseOptions, {
    fuseOptions: {
      ignoreLocation: true,
      threshold: 0.3,
      keys: ['label', 'value', 'keywords', 'groupLabel']
    },
    matchAllWhenSearchEmpty: true
  })
);

const searchItems = computed(() => getAutocompleteSearchOptions(props.items));

const { results } = useFuse(
  computed(() => modelValue.value),
  searchItems,
  fuseOptions
);

const filteredItems = computed(() =>
  getAutocompleteItemOptions<T>(results.value.map(result => result.item as AutocompleteSearchOptionData))
);

const inputProps = computed(() => ({
  ...props.inputProps,
  id: props.inputProps?.id ?? props.id,
  placeholder: props.placeholder ?? props.inputProps?.placeholder
}));

const getItemKey = (item: (typeof filteredItems.value)[number]) => {
  if (isGroupOption(item)) {
    return `group-${item.label}`;
  }

  return `item-${item.value}`;
};

const handleSelect = (item: T) => {
  emit('select', item);
};
</script>

<template>
  <AutocompleteRoot
    v-bind="forwardedProps"
    :model-value="modelValue"
    @highlight="emit('highlight', $event)"
    @update:model-value="modelValue = $event"
    @update:open="emit('update:open', $event)"
  >
    <AutocompleteAnchor v-bind="anchorProps">
      <AutocompleteInput v-bind="inputProps">
        <template #leading>
          <slot name="input-leading">
            <Icon icon="lucide:search" />
          </slot>
        </template>
        <template #trailing="{ clear }">
          <AutocompleteCancel v-if="clearable && modelValue" :aria-label="clearLabel" @click="clear">
            <Icon icon="lucide:x" />
          </AutocompleteCancel>
          <slot name="input-trailing" />
        </template>
      </AutocompleteInput>
      <AutocompleteTrigger v-slot="{ triggerIconClass }" v-bind="triggerProps" aria-label="Toggle suggestions">
        <slot name="trigger-icon">
          <Icon icon="lucide:chevrons-up-down" :class="triggerIconClass" />
        </slot>
      </AutocompleteTrigger>
    </AutocompleteAnchor>
    <Portal v-bind="portalProps">
      <AutocompleteContent v-bind="contentProps">
        <AutocompleteViewport v-bind="viewportProps">
          <AutocompleteEmpty v-if="!filteredItems.length">
            <slot name="empty">{{ emptyLabel }}</slot>
          </AutocompleteEmpty>
          <template v-for="item in filteredItems" :key="getItemKey(item)">
            <template v-if="isGroupOption(item)">
              <AutocompleteGroup v-bind="groupProps">
                <AutocompleteGroupLabel v-bind="groupLabelProps">
                  <slot name="group-label" :item="item">{{ item.label }}</slot>
                </AutocompleteGroupLabel>
                <template v-for="child in item.items" :key="child.value">
                  <AutocompleteItem
                    v-bind="itemProps"
                    :value="child.value"
                    :disabled="child.disabled"
                    @select="handleSelect(child)"
                  >
                    <slot name="item-leading" :item="child">
                      <Icon v-if="child.icon" :icon="child.icon" />
                    </slot>
                    <slot name="item-text" :item="child">{{ child.label ?? child.value }}</slot>
                    <slot name="item-trailing" :item="child" />
                    <AutocompleteItemIndicator v-bind="itemIndicatorProps">
                      <slot name="item-indicator" :item="child">
                        <Icon icon="lucide:check" />
                      </slot>
                    </AutocompleteItemIndicator>
                  </AutocompleteItem>
                  <AutocompleteSeparator v-if="child.separator" v-bind="separatorProps" />
                </template>
              </AutocompleteGroup>
              <AutocompleteSeparator v-if="item.separator" v-bind="separatorProps" />
            </template>
            <template v-else>
              <AutocompleteItem
                v-bind="itemProps"
                :value="item.value"
                :disabled="item.disabled"
                @select="handleSelect(item)"
              >
                <slot name="item-leading" :item="item">
                  <Icon v-if="item.icon" :icon="item.icon" />
                </slot>
                <slot name="item-text" :item="item">{{ item.label ?? item.value }}</slot>
                <slot name="item-trailing" :item="item" />
                <AutocompleteItemIndicator v-bind="itemIndicatorProps">
                  <slot name="item-indicator" :item="item">
                    <Icon icon="lucide:check" />
                  </slot>
                </AutocompleteItemIndicator>
              </AutocompleteItem>
              <AutocompleteSeparator v-if="item.separator" v-bind="separatorProps" />
            </template>
          </template>
        </AutocompleteViewport>
      </AutocompleteContent>
    </Portal>
  </AutocompleteRoot>
</template>
