<script setup lang="ts">
import { SelectGroup, SelectItemText, SelectPortal, SelectRoot, SelectValue, useForwardPropsEmits } from 'radix-vue';
import type { SelectRootEmits } from 'radix-vue';
import { computedPick } from '../../shared';
import SSelectContent from './select-content.vue';
import SSelectTrigger from './select-trigger.vue';
import SSelectViewport from './select-viewport.vue';
import SSelectItem from './select-item.vue';
import SSelectItemIndicator from './select-item-indicator.vue';
import SSelectIcon from './select-icon.vue';
import SSelectSeparator from './select-separator.vue';
import SSelectLabel from './select-label.vue';
import SSelectScrollUpButton from './select-scroll-up-button.vue';
import SSelectScrollDownButton from './select-scroll-down-button.vue';
import type { SelectGroupOption, SelectOption, SelectProps } from './types';

defineOptions({
  name: 'SSelect'
});

const props = defineProps<SelectProps>();

const emit = defineEmits<SelectRootEmits>();

const delegatedRootProps = computedPick(props, [
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

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const delegatedContentProps = computedPick(props, [
  'position',
  'bodyLock',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'avoidCollisions',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy',
  'prioritizePosition'
]);

function isGroup(opt: SelectOption | SelectGroupOption): opt is SelectGroupOption {
  return (opt as SelectGroupOption).options !== undefined;
}
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <SSelectTrigger :class="triggerClass">
      <SelectValue :placeholder="placeholder" />
      <SSelectIcon :class="triggerIconClass">
        <slot name="triggerIcon" />
      </SSelectIcon>
    </SSelectTrigger>
    <SelectPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SSelectContent :class="contentClass" v-bind="delegatedContentProps">
        <SSelectScrollUpButton :class="scrollUpButtonClass">
          <slot name="scrollUpIcon" />
        </SSelectScrollUpButton>
        <SSelectViewport :nonce="nonce" :position="position">
          <template v-for="opt in options">
            <template v-if="isGroup(opt)">
              <SSelectLabel :key="`groupLabel_${opt.label}`" :class="groupLabelClass">{{ opt.label }}</SSelectLabel>
              <SelectGroup :key="`group_${opt.label}`" :class="groupClass">
                <SSelectItem
                  v-for="(option, index) in opt.options"
                  :key="index"
                  :value="option.value"
                  :disabled="option.disabled"
                >
                  <SelectItemText>{{ option.label }}</SelectItemText>
                  <SSelectItemIndicator>
                    <slot name="itemIndicatorIcon" />
                  </SSelectItemIndicator>
                </SSelectItem>
              </SelectGroup>
            </template>
            <template v-else>
              <SSelectItem :key="opt.value" :value="opt.value" :text-value="opt.label" :class="itemClass">
                <SelectItemText :class="itemTextClass">{{ opt.label }}</SelectItemText>
                <SSelectItemIndicator :class="itemIndicatorClass">
                  <slot name="itemIndicatorIcon" />
                </SSelectItemIndicator>
              </SSelectItem>
              <SSelectSeparator v-if="opt.separator" :key="`separator_${opt.value}`" :class="separatorClass" />
            </template>
          </template>
        </SSelectViewport>
        <SSelectScrollDownButton>
          <slot name="scrollDownIcon" />
        </SSelectScrollDownButton>
      </SSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped></style>
