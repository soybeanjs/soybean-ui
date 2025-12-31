<script
  setup
  lang="ts"
  generic="T extends DefinedValue, M extends boolean = false, S extends SelectOptionData<T> = SelectOptionData<T>"
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
} from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { selectVariants } from '@/variants/select';
import Icon from '../icon/icon.vue';
import SSelectOption from './select-option.vue';
import { isGroupOption } from './shared';
import type { SelectEmits, SelectOptionData, SelectProps } from './types';

defineOptions({
  name: 'SSelect',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectProps<T, M, S>>(), {
  open: undefined
});

const emit = defineEmits<SelectEmits<T, M>>();

type Slots = {
  'trigger-leading'?: () => any;
  'trigger-value'?: (props: {
    modelValue: SelectProps<T, M, S>['modelValue'];
    selectedLabel: string[];
    slotText: string;
  }) => any;
  'trigger-trailing'?: () => any;
  'trigger-icon'?: () => any;
  'scroll-up-button'?: () => any;
  'scroll-down-button'?: () => any;
  'group-label'?: (props: { item: S }) => any;
  'item-text'?: (props: { item: S }) => any;
  'item-leading'?: (props: { item: S }) => any;
  'item-trailing'?: (props: { item: S }) => any;
  'item-indicator'?: (props: { item: S }) => any;
};

const slots = defineSlots<Slots>();

const optionSlotKeys = computed(
  () => Object.keys(slots).filter(key => key.startsWith('item-') || key === 'group-label') as (keyof Slots)[]
);

const forwardedProps = useOmitProps(props, [
  'ui',
  'size',
  'items',
  'triggerProps',
  'triggerIconProps',
  'placeholder',
  'valueProps',
  'portalProps',
  'contentProps',
  'popupProps',
  'placement',
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
    return `group-${item.label}`;
  }
  return item.value;
};

const ui = computed(() => {
  const variants = selectVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const valueProps = computed(() => {
  return {
    ...props.valueProps,
    placeholder: props.placeholder ?? props.valueProps?.placeholder
  };
});

const contentProps = computed(() => {
  return {
    ...props.contentProps,
    placement: props.placement ?? props.contentProps?.placement,
    popupProps: props.popupProps ?? props.contentProps?.popupProps
  };
});

provideSelectThemeContext({
  ui
});
</script>

<template>
  <SelectRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <SelectTrigger v-bind="triggerProps">
      <slot name="trigger-leading" />
      <SelectValue v-slot="slotProps" v-bind="valueProps">
        <slot name="trigger-value" v-bind="slotProps as any" />
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
            @select="emit('select', $event as any)"
          >
            <template v-for="slotKey in optionSlotKeys" :key="slotKey" #[slotKey]="slotProps">
              <slot :name="slotKey" v-bind="slotProps" />
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
