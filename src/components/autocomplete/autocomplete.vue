<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import {
  AutocompleteAnchor,
  AutocompleteContent,
  AutocompleteInput,
  AutocompletePortal,
  AutocompleteRoot,
  AutocompleteTrigger,
  AutocompleteViewport,
  provideAutocompleteUi
} from '@soybeanjs/headless';
import { useControllableState, useOmitProps } from '@soybeanjs/headless/composables';
import { defu } from 'defu';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { provideAutocompleteExtraUi } from './context';
import SAutocompleteOption from './autocomplete-option.vue';
import { getAutocompleteItemOptions, getAutocompleteSearchOptions } from './shared';
import { autocompleteVariants } from './variants';
import type {
  AutocompleteEmits,
  AutocompleteOptionData,
  AutocompleteProps,
  AutocompleteSearchOptionData,
  AutocompleteSingleOptionData
} from './types';

defineOptions({
  name: 'SAutocomplete'
});

const props = withDefaults(defineProps<AutocompleteProps<T>>(), {
  modelValue: undefined,
  open: undefined,
  clearable: false,
  clearLabel: 'Clear input',
  emptyLabel: 'No results found.'
});

const emit = defineEmits<AutocompleteEmits<T>>();

type Slots = {
  'input-leading'?: () => any;
  'input-trailing'?: () => any;
  'trigger-icon'?: () => any;
  empty?: () => any;
  'group-label'?: (props: { item: Extract<AutocompleteOptionData<T>, { items: T[] }> }) => any;
  'item-leading'?: (props: { item: T }) => any;
  'item-label'?: (props: { item: T }) => any;
  'item-trailing'?: (props: { item: T }) => any;
  'item-indicator'?: (props: { item: T }) => any;
};

const slots = defineSlots<Slots>();

const optionSlotKeys = computed(
  () => Object.keys(slots).filter(key => key === 'group-label' || key.startsWith('item-')) as (keyof Slots)[]
);

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
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

const { results } = useFuse(computed(() => modelValue.value), searchItems, fuseOptions);

const filteredItems = computed(() => getAutocompleteItemOptions(results.value.map(result => result.item as AutocompleteSearchOptionData)));

const ui = computed(() => {
  const variants = autocompleteVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const headlessUi = computed(() => ({
  root: ui.value.root,
  anchor: ui.value.anchor,
  inputRoot: ui.value.inputRoot,
  inputControl: ui.value.inputControl,
  trigger: ui.value.trigger,
  content: ui.value.content,
  viewport: ui.value.viewport,
  group: ui.value.group,
  groupLabel: ui.value.groupLabel,
  item: ui.value.item,
  itemIndicator: ui.value.itemIndicator,
  separator: ui.value.separator
}));

const extraUi = computed(() => ({
  inputIcon: ui.value.inputIcon,
  inputClearable: ui.value.inputClearable,
  triggerIcon: ui.value.triggerIcon,
  itemText: ui.value.itemText,
  itemIcon: ui.value.itemIcon,
  empty: ui.value.empty
}));

const inputProps = computed(() => ({
  ...props.inputProps,
  id: props.inputProps?.id ?? props.id,
  placeholder: props.placeholder ?? props.inputProps?.placeholder
}));

provideAutocompleteUi(headlessUi);
provideAutocompleteExtraUi(extraUi);

const onSelect = (item: AutocompleteSingleOptionData) => {
  emit('select', item as T);
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
            <Icon icon="lucide:x" class="size-1em" aria-hidden="true" />
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
    <AutocompletePortal v-bind="portalProps">
      <AutocompleteContent v-bind="contentProps">
        <AutocompleteViewport v-bind="viewportProps">
          <div v-if="!filteredItems.length" :class="ui.empty">
            <slot name="empty">{{ emptyLabel }}</slot>
          </div>
          <SAutocompleteOption
            v-for="(item, index) in filteredItems"
            :key="'items' in item ? `group-${item.label}-${index}` : item.value"
            :item="item"
            :group-props="groupProps"
            :group-label-props="groupLabelProps"
            :item-props="itemProps"
            :item-indicator-props="itemIndicatorProps"
            :separator-props="separatorProps"
            @select="onSelect($event)"
          >
            <template v-for="slotKey in optionSlotKeys" :key="slotKey" #[slotKey]="slotProps">
              <slot :name="slotKey" v-bind="slotProps" />
            </template>
          </SAutocompleteOption>
        </AutocompleteViewport>
      </AutocompleteContent>
    </AutocompletePortal>
  </AutocompleteRoot>
</template>
