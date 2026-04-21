<script setup lang="ts" generic="T extends DefinedValue = DefinedValue, M extends boolean = false">
import { computed } from 'vue';
import type { MaybeArray } from '../../types';
import type { DefinedValue } from '../../types';
import IconRender from '../icon/icon-render.vue';
import SelectArrow from './select-arrow.vue';
import SelectContent from './select-content.vue';
import SelectGroup from './select-group.vue';
import SelectGroupLabel from './select-group-label.vue';
import SelectItem from './select-item.vue';
import SelectItemIndicator from './select-item-indicator.vue';
import SelectItemText from './select-item-text.vue';
import { Portal as SelectPortal } from '../portal';
import SelectRoot from './select-root.vue';
import SelectScrollDownButton from './select-scroll-down-button.vue';
import SelectScrollUpButton from './select-scroll-up-button.vue';
import SelectSeparator from './select-separator.vue';
import SelectTrigger from './select-trigger.vue';
import SelectTriggerIcon from './select-trigger-icon.vue';
import SelectValue from './select-value.vue';
import SelectViewport from './select-viewport.vue';
import { useOmitProps } from '../../composables';
import { isGroupOption } from './shared';
import type {
  SelectCompactEmits,
  SelectCompactProps,
  SelectCompactSlots,
  SelectCompactTriggerValueSlotProps,
  SelectItemEvent,
  SelectOptionData
} from './types';

defineOptions({
  name: 'SelectCompact'
});

const props = withDefaults(defineProps<SelectCompactProps<T, M>>(), {
  open: undefined,
  clearable: true
});

const emit = defineEmits<SelectCompactEmits<T, M>>();

defineSlots<SelectCompactSlots<T, M>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'showArrow',
  'triggerProps',
  'triggerIconProps',
  'placeholder',
  'valueProps',
  'portalProps',
  'contentProps',
  'placement',
  'popupProps',
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

const valueProps = computed(() => ({
  ...props.valueProps,
  placeholder: props.placeholder ?? props.valueProps?.placeholder
}));

const contentProps = computed(() => ({
  ...props.contentProps,
  placement: props.placement ?? props.contentProps?.placement,
  popupProps: props.popupProps ?? props.contentProps?.popupProps
}));

const getItemKey = (item: SelectOptionData<T>, index: number) => {
  if (isGroupOption(item)) {
    return `group-${item.label}-${index}`;
  }

  return item.value;
};

const getTriggerValueSlotProps = (slotProps: {
  modelValue: MaybeArray<DefinedValue> | undefined;
  selectedLabel: string[];
  slotText: string;
}) => {
  return slotProps as SelectCompactTriggerValueSlotProps<T, M>;
};

const handleModelValueChange = (value: MaybeArray<DefinedValue> | undefined) => {
  emit('update:modelValue', value as NonNullable<SelectCompactProps<T, M>['modelValue']>);
};

const handleSelect = (event: SelectItemEvent<DefinedValue>) => {
  emit('select', event as SelectItemEvent<T>);
};
</script>

<template>
  <SelectRoot v-bind="forwardedProps" @update:model-value="handleModelValueChange" @update:open="emit('update:open', $event)">
    <SelectTrigger v-bind="triggerProps">
      <slot name="trigger-leading" />
      <SelectValue v-slot="slotProps" v-bind="valueProps">
        <slot name="trigger-value" v-bind="getTriggerValueSlotProps(slotProps)" />
      </SelectValue>
      <slot name="trigger-trailing" />
      <SelectTriggerIcon v-bind="triggerIconProps">
        <slot name="trigger-icon">
          <IconRender icon="lucide:chevrons-up-down" />
        </slot>
      </SelectTriggerIcon>
    </SelectTrigger>
    <SelectPortal v-bind="portalProps">
      <SelectContent
        v-bind="contentProps"
        @close-auto-focus="emit('closeAutoFocus', $event)"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
      >
        <SelectScrollUpButton v-bind="scrollUpButtonProps">
          <slot name="scroll-up-button">
            <IconRender icon="lucide:chevron-up" />
          </slot>
        </SelectScrollUpButton>
        <SelectViewport v-bind="viewportProps">
          <template v-for="(item, index) in items" :key="getItemKey(item, index)">
            <template v-if="isGroupOption(item)">
              <SelectGroup v-bind="groupProps">
                <SelectGroupLabel v-bind="groupLabelProps">
                  <slot name="group-label" :item="item">{{ item.label }}</slot>
                </SelectGroupLabel>
                <SelectSeparator v-if="item.separator" v-bind="separatorProps" />
                <template v-for="child in item.items" :key="String(child.value)">
                  <SelectItem
                    v-bind="itemProps"
                    :value="child.value"
                    :text-value="child.textValue"
                    :disabled="child.disabled"
                    @select="handleSelect($event)"
                  >
                    <slot name="item-leading" :item="child">
                      <IconRender v-if="child.icon" :icon="child.icon" />
                    </slot>
                    <SelectItemText v-bind="itemTextProps">
                      <slot name="item-text" :item="child">{{ child.label }}</slot>
                    </SelectItemText>
                    <slot name="item-trailing" :item="child" />
                    <SelectItemIndicator v-bind="itemIndicatorProps">
                      <slot name="item-indicator" :item="child">
                        <IconRender icon="lucide:check" />
                      </slot>
                    </SelectItemIndicator>
                  </SelectItem>
                  <SelectSeparator v-if="child.separator" v-bind="separatorProps" />
                </template>
              </SelectGroup>
            </template>
            <template v-else>
              <SelectItem
                v-bind="itemProps"
                :value="item.value"
                :text-value="item.textValue"
                :disabled="item.disabled"
                @select="handleSelect($event)"
              >
                <slot name="item-leading" :item="item">
                  <IconRender v-if="item.icon" :icon="item.icon" />
                </slot>
                <SelectItemText v-bind="itemTextProps">
                  <slot name="item-text" :item="item">{{ item.label }}</slot>
                </SelectItemText>
                <slot name="item-trailing" :item="item" />
                <SelectItemIndicator v-bind="itemIndicatorProps">
                  <slot name="item-indicator" :item="item">
                    <IconRender icon="lucide:check" />
                  </slot>
                </SelectItemIndicator>
              </SelectItem>
              <SelectSeparator v-if="item.separator" v-bind="separatorProps" />
            </template>
          </template>
        </SelectViewport>
        <SelectScrollDownButton v-bind="scrollDownButtonProps">
          <slot name="scroll-down-button">
            <IconRender icon="lucide:chevron-down" />
          </slot>
        </SelectScrollDownButton>
        <SelectArrow v-if="showArrow" v-bind="arrowProps" />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
