<script setup lang="ts" generic="T extends AcceptableValue, S extends CommandItemOption<T>">
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFuse } from '@vueuse/integrations/useFuse';
import { defu } from 'defu';
import { useCombinedPropsEmits, useOmitEmitAsProps, useOmitForwardProps } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import SCommandRoot from './command-root.vue';
import SCommandInputWrapper from './command-input-wrapper.vue';
import SCommandInput from './command-input.vue';
import SCommandInputIcon from './command-input-icon.vue';
import SCommandList from './command-list.vue';
import SCommandEmpty from './command-empty.vue';
import SCommandGroup from './command-group.vue';
import SCommandGroupHeading from './command-group-heading.vue';
import SCommandItem from './command-item.vue';
import SCommandSeparator from './command-separator.vue';
import SCommandShortcut from './command-shortcut.vue';
import { getHighlightSearchOption, getItemOptions, getSearchOptions, isCommandGroupOption } from './shared';
import type { CommandEmits, CommandItemOption, CommandProps } from './types';

defineOptions({
  name: 'SCommand'
});

const props = defineProps<CommandProps<T, S>>();

const emit = defineEmits<CommandEmits<T>>();

const forwardedRootProps = useOmitForwardProps(props, [
  'items',
  'fuseOptions',
  'inputWrapperClass',
  'inputClass',
  'inputProps',
  'inputIconClass',
  'emptyClass',
  'listClass',
  'groupClass',
  'groupHeadingClass',
  'itemClass',
  'itemIconClass',
  'separatorClass',
  'shortcutClass'
]);

const forwardedRootEmits = useOmitEmitAsProps<CommandEmits<T>>(emit, ['select', 'update:searchTerm']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const searchTerm = useVModel<CommandProps<T, S>, 'searchTerm', 'update:searchTerm'>(props, 'searchTerm', emit, {
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

const searchItems = computed(() => getSearchOptions<T, S>(props.items));

const { results } = useFuse(searchTerm, searchItems, computedFuseOptions);

const filteredItems = computed(() => {
  const highlightOptions = results.value.map(result => getHighlightSearchOption(result.item, searchTerm.value));

  return getItemOptions(highlightOptions) as S[];
});
</script>

<template>
  <SCommandRoot v-bind="forwardedRoot">
    <SCommandInputWrapper :class="inputWrapperClass">
      <SCommandInputIcon :class="inputIconClass" />
      <SCommandInput
        v-bind="inputProps"
        v-model="searchTerm"
        :class="inputClass"
        @update:model-value="emit('update:searchTerm', $event)"
      />
    </SCommandInputWrapper>
    <SCommandList :class="listClass">
      <SCommandEmpty v-if="!filteredItems.length && searchTerm" :class="emptyClass">
        <slot name="empty" :search-term="searchTerm">
          {{ emptyLabel || `No result for "${searchTerm}"` }}
        </slot>
      </SCommandEmpty>

      <template v-for="(itemOrGroup, itemOrGroupIndex) in filteredItems" :key="itemOrGroupIndex">
        <template v-if="isCommandGroupOption(itemOrGroup)">
          <SCommandGroup :class="groupClass">
            <SCommandGroupHeading :class="groupHeadingClass">{{ itemOrGroup.label }}</SCommandGroupHeading>
            <template v-for="(item, index) in itemOrGroup.items" :key="index">
              <SCommandItem
                :class="itemClass"
                :value="item.value"
                :disabled="item.disabled"
                @select="emit('select', item, $event)"
              >
                <slot name="item" :item="item">
                  <component :is="item.icon" v-if="item.icon" :class="itemIconClass" />
                  {{ item.label }}
                  <SCommandShortcut v-if="item.shortcut" :class="shortcutClass">{{ item.shortcut }}</SCommandShortcut>
                </slot>
              </SCommandItem>
              <SCommandSeparator v-if="item.separator" :class="separatorClass" />
            </template>
          </SCommandGroup>
          <SCommandSeparator v-if="itemOrGroup.separator" :class="separatorClass" />
        </template>
        <template v-else>
          <SCommandGroup :class="groupClass">
            <SCommandItem
              :class="itemClass"
              :value="itemOrGroup.value"
              :disabled="itemOrGroup.disabled"
              @select="emit('select', itemOrGroup, $event)"
            >
              <slot name="item" :item="itemOrGroup">
                <component :is="itemOrGroup.icon" v-if="itemOrGroup.icon" :class="itemIconClass" />
                {{ itemOrGroup.label }}
                <SCommandShortcut v-if="itemOrGroup.shortcut" :class="shortcutClass">
                  {{ itemOrGroup.shortcut }}
                </SCommandShortcut>
              </slot>
            </SCommandItem>
          </SCommandGroup>
          <SCommandSeparator v-if="itemOrGroup.separator" :class="separatorClass" />
        </template>
      </template>
    </SCommandList>
  </SCommandRoot>
</template>
