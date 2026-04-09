<script setup lang="ts" generic="M extends boolean = false">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  provideComboboxUi
} from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import SComboboxOption from './combobox-option.vue';
import { getSelectedLabels } from './shared';
import { comboboxVariants } from './variants';
import type { ComboboxEmits, ComboboxProps } from './types';

defineOptions({
  name: 'SCombobox'
});

const props = withDefaults(defineProps<ComboboxProps<M>>(), {
  open: undefined,
  defaultOpen: false,
  emptyLabel: 'No results found.'
});

const emit = defineEmits<ComboboxEmits<M>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'placeholder',
  'searchPlaceholder',
  'emptyLabel',
  'triggerProps',
  'portalProps',
  'contentProps',
  'viewportProps',
  'inputProps',
  'emptyProps',
  'groupProps',
  'groupLabelProps',
  'itemProps',
  'itemIndicatorProps',
  'separatorProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = comboboxVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { trigger: props.class });
});

const selectedLabels = computed(() => getSelectedLabels(props.modelValue as string | string[] | undefined, props.items));
const triggerText = computed(() => {
  if (!selectedLabels.value.length) {
    return props.placeholder;
  }

  return selectedLabels.value.join(', ');
});

const inputProps = computed(() => ({
  ...props.inputProps,
  placeholder: props.searchPlaceholder ?? props.inputProps?.placeholder,
  autofocus: props.inputProps?.autofocus ?? true
}));

provideComboboxUi(ui);
</script>

<template>
  <ComboboxRoot v-bind="forwardedProps" v-on="listeners">
    <ComboboxTrigger v-bind="triggerProps">
      <slot name="trigger-leading" />
      <slot
        name="trigger-value"
        :model-value="modelValue"
        :selected-labels="selectedLabels"
        :slot-text="triggerText"
      >
        <span class="grow truncate text-left" :data-placeholder="!selectedLabels.length ? '' : undefined">
          {{ triggerText }}
        </span>
      </slot>
      <slot name="trigger-trailing" />
      <slot name="trigger-icon">
        <Icon icon="lucide:chevrons-up-down" :class="ui.triggerIcon" aria-hidden="true" />
      </slot>
    </ComboboxTrigger>
    <ComboboxPortal v-bind="portalProps">
      <ComboboxContent v-bind="contentProps" @close-auto-focus="emit('closeAutoFocus', $event)" @escape-key-down="emit('escapeKeyDown', $event)" @pointer-down-outside="emit('pointerDownOutside', $event)" @focus-outside="emit('focusOutside', $event)" @interact-outside="emit('interactOutside', $event)">
        <ComboboxInput v-bind="inputProps">
          <template #leading="slotProps">
            <slot name="input-leading" v-bind="slotProps">
              <Icon icon="lucide:search" class="mr-2 shrink-0 opacity-50" aria-hidden="true" />
            </slot>
          </template>
          <template #trailing="slotProps">
            <slot name="input-trailing" v-bind="slotProps" />
          </template>
        </ComboboxInput>
        <ComboboxEmpty v-bind="emptyProps">
          <slot name="empty">{{ emptyLabel }}</slot>
        </ComboboxEmpty>
        <ComboboxViewport v-bind="viewportProps">
          <SComboboxOption
            v-for="item in items"
            :key="'items' in item ? `group-${item.label}` : item.value"
            :item="item"
            :group-props="groupProps"
            :group-label-props="groupLabelProps"
            :item-props="itemProps"
            :item-indicator-props="itemIndicatorProps"
            :separator-props="separatorProps"
            @item-select="emit('select', $event)"
          >
            <template #group-label="slotProps">
              <slot name="group-label" v-bind="slotProps" />
            </template>
            <template #item-leading="slotProps">
              <slot name="item-leading" v-bind="slotProps" />
            </template>
            <template #item-text="slotProps">
              <slot name="item-text" v-bind="slotProps" />
            </template>
            <template #item-trailing="slotProps">
              <slot name="item-trailing" v-bind="slotProps" />
            </template>
            <template #item-indicator="slotProps">
              <slot name="item-indicator" v-bind="slotProps" />
            </template>
          </SComboboxOption>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
