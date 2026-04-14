<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { AutocompleteItem, AutocompleteItemIndicator, AutocompleteSeparator } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import { useAutocompleteExtraUi } from './context';
import type {
  AutocompleteSingleOptionData,
  AutocompleteSingleOptionEmits,
  AutocompleteSingleOptionProps
} from './types';

defineOptions({
  name: 'SAutocompleteSingleOption',
  inheritAttrs: false
});

const props = defineProps<AutocompleteSingleOptionProps<T>>();

const emit = defineEmits<AutocompleteSingleOptionEmits<T>>();

const forwardedProps = useOmitProps(props, ['item', 'itemIndicatorProps', 'separatorProps']);

const ui = useAutocompleteExtraUi();
</script>

<template>
  <AutocompleteItem
    v-bind="forwardedProps"
    :value="item.value"
    :disabled="item.disabled"
    @select="emit('select', item)"
  >
    <slot name="item-leading" :item="item">
      <Icon v-if="item.icon" :icon="item.icon" :class="ui?.itemIcon" />
    </slot>
    <span :class="ui?.itemText">
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
