<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import { defu } from 'defu';
import { useControllableState, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import AutocompleteAnchor from './autocomplete-anchor.vue';
import AutocompleteContent from './autocomplete-content.vue';
import AutocompleteGroup from './autocomplete-group.vue';
import AutocompleteGroupLabel from './autocomplete-group-label.vue';
import AutocompleteInput from './autocomplete-input.vue';
import AutocompleteItem from './autocomplete-item.vue';
import AutocompleteItemIndicator from './autocomplete-item-indicator.vue';
import { Portal } from '../portal';
import AutocompleteRoot from './autocomplete-root.vue';
import AutocompleteSeparator from './autocomplete-separator.vue';
import AutocompleteTrigger from './autocomplete-trigger.vue';
import AutocompleteViewport from './autocomplete-viewport.vue';
import { useAutocompleteUi } from './context';
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

const ui = useAutocompleteUi();

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
            <Icon icon="lucide:search" :class="ui.inputIcon" />
          </slot>
        </template>
        <template #trailing="{ clear }">
          <button
            v-if="clearable && modelValue"
            type="button"
            :class="ui.inputClearable"
            :aria-label="clearLabel"
            @click="clear"
          >
            <Icon icon="lucide:x" />
          </button>
          <slot name="input-trailing" />
        </template>
      </AutocompleteInput>
      <AutocompleteTrigger v-bind="triggerProps" aria-label="Toggle suggestions">
        <slot name="trigger-icon">
          <Icon icon="lucide:chevrons-up-down" :class="ui.triggerIcon" />
        </slot>
      </AutocompleteTrigger>
    </AutocompleteAnchor>
    <Portal v-bind="portalProps">
      <AutocompleteContent v-bind="contentProps">
        <AutocompleteViewport v-bind="viewportProps">
          <div v-if="!filteredItems.length" :class="ui.empty">
            <slot name="empty">{{ emptyLabel }}</slot>
          </div>
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
                      <Icon v-if="child.icon" :icon="child.icon" :class="ui.itemIcon" />
                    </slot>
                    <span :class="ui.itemText">
                      <slot name="item-label" :item="child">{{ child.label ?? child.value }}</slot>
                    </span>
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
                  <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
                </slot>
                <span :class="ui.itemText">
                  <slot name="item-label" :item="item">{{ item.label ?? item.value }}</slot>
                </span>
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
