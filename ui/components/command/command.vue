<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import { defu } from 'defu';
import { ListboxContent, ListboxFilter, ListboxRoot, provideListboxThemeContext } from '@headless';
import type { DefinedValue } from '@headless';
import { useControllableState, useOmitProps, usePickProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { commandVariants } from '@variants/command';
import Icon from '../icon/icon.vue';
import { provideCommandExtraThemeContext } from './context';
import SCommandOption from './command-option.vue';
import { getCommandHighlightSearchOption, getCommandItemOptions, getCommandSearchOptions } from './shared';
import type { CommandEmits, CommandProps } from './types';

defineOptions({
  name: 'SCommand'
});

const props = defineProps<CommandProps<T>>();

const emit = defineEmits<CommandEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'items',
  'listProps',
  'itemProps',
  'itemLabelProps',
  'groupProps',
  'groupLabelProps',
  'shortcutProps',
  'separatorProps',
  'inputProps',
  'searchTerm',
  'fuseOptions',
  'emptyProps',
  'emptyLabel'
]);

const forwardedOptionsProps = usePickProps(props, [
  'itemProps',
  'itemLabelProps',
  'groupProps',
  'groupLabelProps',
  'shortcutProps',
  'separatorProps'
]);

const searchTerm = useControllableState(
  () => props.searchTerm,
  value => {
    emit('update:searchTerm', value!);
  },
  props.inputProps?.defaultValue || ''
) as ShallowRef<string>;

const fuseOptions = computed(() =>
  defu(props.fuseOptions, {
    fuseOptions: {
      ignoreLocation: true,
      threshold: 0.1,
      keys: ['label', 'groupLabel']
    },
    resultLimit: 12,
    matchAllWhenSearchEmpty: true
  })
);

const searchItems = computed(() => getCommandSearchOptions<T>(props.items));

const { results } = useFuse(searchTerm, searchItems, fuseOptions);

const filteredItems = computed(() => {
  const highlightOptions = results.value.map(result => getCommandHighlightSearchOption(result.item, searchTerm.value));

  return getCommandItemOptions(highlightOptions);
});

const ui = computed(() => {
  const variants = commandVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const listboxUi = computed(() => ({
  ...ui.value,
  content: ui.value.list,
  filterRoot: ui.value.inputRoot,
  filterControl: ui.value.inputControl
}));

provideListboxThemeContext({
  ui: listboxUi
});

provideCommandExtraThemeContext({
  ui
});
</script>

<template>
  <ListboxRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <ListboxFilter v-bind="inputProps" v-model="searchTerm" autofocus>
      <template #leading>
        <slot name="input-leading">
          <Icon icon="lucide:search" :class="ui.inputIcon" />
        </slot>
      </template>
      <template #trailing="{ clear }">
        <Icon v-if="clearable" icon="lucide:x" :class="ui.inputClearable" @click="clear" />
        <slot name="input-trailing"></slot>
      </template>
    </ListboxFilter>
    <ListboxContent v-bind="listProps">
      <div v-if="!filteredItems.length && searchTerm" :class="ui.empty">
        <slot name="empty">{{ emptyLabel }}</slot>
      </div>
      <SCommandOption
        v-for="(item, index) in filteredItems"
        v-bind="forwardedOptionsProps"
        :key="index"
        :item="item"
        @select="emit('select', $event)"
      >
        <template #item-leading="slotProps">
          <slot name="item-leading" :item="slotProps.item" />
        </template>
        <template #item-trailing="slotProps">
          <slot name="item-trailing" :item="slotProps.item" />
        </template>
        <template #item-label="slotProps">
          <slot name="item-label" :item="slotProps.item" />
        </template>
      </SCommandOption>
    </ListboxContent>
  </ListboxRoot>
</template>
