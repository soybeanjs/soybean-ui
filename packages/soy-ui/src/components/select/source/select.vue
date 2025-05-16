<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import {
  SelectPortal,
  SelectRoot,
  SelectValue,
  useForwardPropsEmits,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { SelectEmits, SelectOptionData, SelectProps } from '../types';
import SSelectContent from './select-content.vue';
import SSelectTrigger from './select-trigger.vue';
import SSelectViewport from './select-viewport.vue';
import SSelectIcon from './select-icon.vue';
import SSelectScrollUpButton from './select-scroll-up-button.vue';
import SSelectScrollDownButton from './select-scroll-down-button.vue';
import SSelectOption from './select-option.vue';

defineOptions({
  name: 'SSelect'
});

const {
  class: cls,
  size,
  avoidCollisions = true,
  prioritizePosition = true,
  ...delegatedProps
} = defineProps<SelectProps<T>>();

const emit = defineEmits<SelectEmits<T>>();

type Slots = {
  default?: () => any;
  leading?: () => any;
  trailing?: () => any;
  trigger?: (props: { modelValue?: T | T[]; selectedLabel: string[]; slotText: string }) => any;
  'item-leading'?: (props: { item: SelectOptionData<T> }) => any;
  'item-trailing'?: (props: { item: SelectOptionData<T> }) => any;
  'item-indicator-icon'?: (props: { item: SelectOptionData<T> }) => any;
  'trigger-icon'?: () => any;
  'scroll-up-icon'?: () => any;
  'scroll-down-icon'?: () => any;
};

defineSlots<Slots>();

const forwardedRootProps = usePickForwardProps(delegatedProps, [
  'defaultOpen',
  'open',
  'defaultValue',
  'modelValue',
  'dir',
  'name',
  'autocomplete',
  'disabled',
  'required'
]);

const forwardedRoot = useForwardPropsEmits(forwardedRootProps, emit);

const forwardedContentProps = usePickForwardProps(delegatedProps, [
  'position',
  'bodyLock',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy'
]);

function getModelValue(modelValue: AcceptableValue | AcceptableValue[] | undefined) {
  return modelValue as T | T[];
}
</script>

<template>
  <SelectRoot v-bind="forwardedRoot">
    <SSelectTrigger :class="cls || ui?.trigger" :size="size">
      <slot name="leading" />
      <SelectValue v-slot="{ modelValue, selectedLabel, slotText }" :placeholder="placeholder">
        <slot
          name="trigger"
          :model-value="getModelValue(modelValue)"
          :selected-label="selectedLabel"
          :slot-text="slotText"
        />
      </SelectValue>
      <slot name="trailing">
        <SSelectIcon :class="ui?.triggerIcon">
          <slot name="trigger-icon" />
        </SSelectIcon>
      </slot>
    </SSelectTrigger>
    <SelectPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SSelectContent
        v-bind="forwardedContentProps"
        :class="ui?.content"
        :size="size"
        :force-mount="forceMountContent"
        :avoid-collisions="avoidCollisions"
        :prioritize-position="prioritizePosition"
        @close-auto-focus="emit('closeAutoFocus', $event)"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
      >
        <SSelectScrollUpButton :class="ui?.scrollUpButton" :size="size">
          <slot name="scroll-up-icon" />
        </SSelectScrollUpButton>
        <SSelectViewport :class="ui?.viewport" :size="size" :nonce="nonce" :position="position">
          <slot>
            <SSelectOption
              v-for="(item, index) in items"
              :key="index"
              :size="size"
              :item="item"
              :ui="ui"
              :separator="separator"
            >
              <template #leading="slotProps">
                <slot name="item-leading" :item="slotProps.item" />
              </template>
              <template #trailing="slotProps">
                <slot name="item-trailing" :item="slotProps.item" />
              </template>
              <template #indicator-icon="slotProps">
                <slot name="item-indicator-icon" :item="slotProps.item" />
              </template>
            </SSelectOption>
          </slot>
        </SSelectViewport>
        <SSelectScrollDownButton :class="ui?.scrollDownButton" :size="size">
          <slot name="scroll-down-icon" />
        </SSelectScrollDownButton>
      </SSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
