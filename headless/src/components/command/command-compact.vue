<script setup lang="ts" generic="T extends CommandSingleOptionData = CommandSingleOptionData">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import { defu } from 'defu';
import { useControllableState, useOmitProps } from '../../composables';
import IconRender from '../icon/icon-render.vue';
import Kbd from '../kbd/kbd.vue';
import {
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxRoot
} from '../listbox';
import SeparatorRoot from '../separator/separator-root.vue';
import { useCommandUi } from './context';
import { getCommandItemOptions, getCommandSearchOptions, isGroupOption } from './shared';
import type { CommandCompactEmits, CommandCompactProps, CommandCompactSlots, CommandOptionData, CommandSingleOptionData } from './types';

defineOptions({
  name: 'CommandCompact'
});

const props = withDefaults(defineProps<CommandCompactProps<T>>(), {
  emptyLabel: 'No results found.'
});

const emit = defineEmits<CommandCompactEmits>();

defineSlots<CommandCompactSlots<T>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'placeholder',
  'searchTerm',
  'fuseOptions',
  'emptyLabel',
  'listProps',
  'itemProps',
  'itemLabelProps',
  'groupProps',
  'groupLabelProps',
  'shortcutProps',
  'separatorProps',
  'inputProps',
  'emptyProps'
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

const searchItems = computed(() => getCommandSearchOptions(props.items));

const { results } = useFuse(searchTerm, searchItems, fuseOptions);

const filteredItems = computed<CommandOptionData<T>[]>(() => getCommandItemOptions(results.value.map(result => result.item)));

const inputProps = computed(() => ({
  ...props.inputProps,
  placeholder: props.placeholder ?? props.inputProps?.placeholder
}));

const listProps = computed(() => ({
  ...props.listProps,
  'aria-label': props.listProps?.['aria-label'] ?? props.placeholder ?? 'Commands'
}));

const ui = useCommandUi();

const getItemKey = (item: CommandOptionData<T>) => {
  if (isGroupOption(item)) {
    return `group-${item.value}`;
  }

  return `item-${item.value}`;
};
</script>

<template>
  <ListboxRoot
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
    @highlight="emit('highlight', $event)"
    @entry-focus="emit('entryFocus', $event)"
    @leave="emit('leave', $event)"
  >
    <ListboxFilter v-bind="inputProps" v-model="searchTerm" autofocus>
      <template #leading="{ clear }">
        <slot name="input-leading" :clear="clear">
          <IconRender icon="lucide:search" />
        </slot>
      </template>
      <template #trailing="{ clear }">
        <IconRender v-if="clearable" icon="lucide:x" :class="ui.inputClearable" @click="clear" />
        <slot name="input-trailing" :clear="clear" />
      </template>
    </ListboxFilter>
    <ListboxContent v-bind="listProps">
      <div v-if="!filteredItems.length" v-bind="emptyProps" :class="ui.empty">
        <slot name="empty">{{ emptyLabel }}</slot>
      </div>
      <template v-for="item in filteredItems" :key="getItemKey(item)">
        <template v-if="isGroupOption(item)">
          <ListboxGroup v-bind="groupProps">
            <ListboxGroupLabel v-bind="groupLabelProps">{{ item.label }}</ListboxGroupLabel>
            <ListboxItem
              v-for="child in item.items"
              :key="String(child.value)"
              v-bind="itemProps"
              :value="child.value"
              :disabled="child.disabled"
              @select="emit('select', $event)"
            >
              <slot name="item-leading" :item="child">
                <IconRender v-if="child.icon" :icon="child.icon" />
              </slot>
              <span :class="ui.itemLabel" v-bind="itemLabelProps">
                <slot name="item-label" :item="child">
                  {{ child.label }}
                </slot>
              </span>
              <slot name="item-trailing" :item="child" />
              <Kbd v-if="child.shortcut" v-bind="shortcutProps" :value="child.shortcut" :class="ui.shortcut" />
            </ListboxItem>
          </ListboxGroup>
          <SeparatorRoot v-if="item.separator" v-bind="separatorProps" decorative :class="ui.separator" />
        </template>
        <template v-else>
          <ListboxItem v-bind="itemProps" :value="item.value" :disabled="item.disabled" @select="emit('select', $event)">
            <slot name="item-leading" :item="item">
              <IconRender v-if="item.icon" :icon="item.icon" />
            </slot>
            <span :class="ui.itemLabel" v-bind="itemLabelProps">
              <slot name="item-label" :item="item">
                {{ item.label }}
              </slot>
            </span>
            <slot name="item-trailing" :item="item" />
            <Kbd v-if="item.shortcut" v-bind="shortcutProps" :value="item.shortcut" :class="ui.shortcut" />
          </ListboxItem>
          <SeparatorRoot v-if="item.separator" v-bind="separatorProps" decorative :class="ui.separator" />
        </template>
      </template>
    </ListboxContent>
    <slot name="bottom" />
  </ListboxRoot>
</template>
