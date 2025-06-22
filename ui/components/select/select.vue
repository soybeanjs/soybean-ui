<script
  setup
  lang="ts"
  generic="T extends SingleOrMultipleValue, S extends SelectOptionData<GetSelectOptionValue<T>>, M extends boolean"
>
import { computed } from 'vue';
import {
  SelectArrow,
  SelectContent,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectTriggerIcon,
  SelectValue,
  SelectViewport,
  provideSelectThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import type { SingleOrMultipleValue } from '@headless';
import { mergeSlotVariants } from '@theme';
import { selectVariants } from '@variants/select';
import Icon from '../icon/icon.vue';
import SSelectOption from './select-option.vue';
import { isGroupOption } from './shared';
import type { GetSelectOptionValue, SelectEmits, SelectOptionData, SelectProps } from './types';

defineOptions({
  name: 'SSelect',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectProps<T, S, M>>(), {
  open: undefined
});

const emit = defineEmits<SelectEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'ui',
  'size',
  'items',
  'triggerProps',
  'triggerIconProps',
  'valueProps',
  'portalProps',
  'contentProps',
  'viewportProps',
  'scrollDownButtonProps',
  'scrollUpButtonProps',
  'groupProps',
  'groupLabelProps',
  'itemProps',
  'itemTextProps',
  'itemIndicatorProps',
  'separatorProps',
  'arrowProps'
]);

const listeners = useForwardListeners(emit);

const getItemKey = (item: S) => {
  if (isGroupOption(item)) {
    return item.label;
  }
  return item.value;
};

const ui = computed(() => {
  const variants = selectVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideSelectThemeContext({
  ui
});
</script>

<template>
  <SelectRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <SelectTrigger v-bind="triggerProps">
      <slot name="trigger-leading" />
      <SelectValue v-bind="valueProps">
        <slot name="trigger-value" />
      </SelectValue>
      <slot name="trigger-trailing" />
      <SelectTriggerIcon v-bind="triggerIconProps">
        <slot name="trigger-icon">
          <Icon icon="lucide:chevrons-up-down" />
        </slot>
      </SelectTriggerIcon>
    </SelectTrigger>
    <SelectPortal v-bind="portalProps">
      <SelectContent v-bind="contentProps" v-on="listeners">
        <SelectScrollUpButton v-bind="scrollUpButtonProps">
          <slot name="scroll-up-button">
            <Icon icon="lucide:chevron-up" />
          </slot>
        </SelectScrollUpButton>
        <SelectViewport v-bind="viewportProps">
          <SSelectOption
            v-for="item in items"
            :key="getItemKey(item)"
            :item="item"
            :group-props="groupProps"
            :group-label-props="groupLabelProps"
            :item-props="itemProps"
            :item-text-props="itemTextProps"
            :item-indicator-props="itemIndicatorProps"
            :separator-props="separatorProps"
            @select="emit('select', $event)"
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
          </SSelectOption>
        </SelectViewport>
        <SelectScrollDownButton v-bind="scrollDownButtonProps">
          <slot name="scroll-down-button">
            <Icon icon="lucide:chevron-down" />
          </slot>
        </SelectScrollDownButton>
        <SelectArrow v-if="showArrow" v-bind="arrowProps" />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
