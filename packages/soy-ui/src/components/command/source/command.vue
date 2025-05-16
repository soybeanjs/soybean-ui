<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFuse } from '@vueuse/integrations/useFuse';
import { useCombinedPropsEmits, useOmitEmitAsProps, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { defu } from 'defu';
import { getCommandHighlightSearchOption, getCommandItemOptions, getCommandSearchOptions } from '../shared';
import type { CommandEmits, CommandOptionData, CommandProps } from '../types';
import SCommandRoot from './command-root.vue';
import SCommandInput from './command-input.vue';
import SCommandList from './command-list.vue';
import SCommandEmpty from './command-empty.vue';
import SCommandOption from './command-option.vue';

defineOptions({
  name: 'SCommand'
});

const props = defineProps<CommandProps<T>>();

const emit = defineEmits<CommandEmits<T>>();

type Slots = {
  leading: () => any;
  trailing: () => any;
  empty: (props: { searchTerm: string }) => any;
  item: (props: { item: CommandOptionData<T> }) => any;
};

defineSlots<Slots>();

const forwardedRootProps = useOmitForwardProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'fuseOptions',
  'inputProps',
  'emptyLabel'
]);

const forwardedRootEmits = useOmitEmitAsProps<CommandEmits<T>>(emit, ['select', 'update:searchTerm']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const searchTerm = useVModel<CommandProps<T>, 'searchTerm', 'update:searchTerm'>(props, 'searchTerm', emit, {
  passive: true,
  defaultValue: props.inputProps?.defaultValue || ''
}) as Ref<string>;

const computedFuseOptions = computed(() =>
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

const { results } = useFuse(searchTerm, searchItems, computedFuseOptions);

const filteredItems = computed(() => {
  const highlightOptions = results.value.map(result => getCommandHighlightSearchOption(result.item, searchTerm.value));

  return getCommandItemOptions(highlightOptions);
});
</script>

<template>
  <SCommandRoot v-bind="forwardedRoot" :class="props.class || ui?.root" :size="size">
    <SCommandInput
      v-bind="inputProps"
      v-model="searchTerm"
      :class="ui?.input"
      :wrapper-class="ui?.inputWrapper"
      :icon-class="ui?.inputIcon"
      :size="size"
      @update:model-value="emit('update:searchTerm', $event)"
    >
      <template #leading>
        <slot name="leading" />
      </template>
      <template #trailing>
        <slot name="trailing" />
      </template>
    </SCommandInput>
    <SCommandList :class="ui?.list" :size="size">
      <SCommandEmpty v-if="!filteredItems.length && searchTerm" :class="ui?.empty" :size="size">
        <slot name="empty" :search-term="searchTerm">
          {{ emptyLabel || `No result for "${searchTerm}"` }}
        </slot>
      </SCommandEmpty>
      <SCommandOption
        v-for="(item, itemIndex) in filteredItems"
        v-slot="slotProps"
        :key="itemIndex"
        :size="size"
        :item="item"
        :ui="ui"
        @select="(opt, event) => emit('select', opt, event)"
      >
        <slot name="item" v-bind="slotProps" />
      </SCommandOption>
    </SCommandList>
  </SCommandRoot>
</template>
