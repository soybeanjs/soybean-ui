<script setup lang="ts">
import {
  SelectGroup,
  SelectPortal,
  SelectRoot,
  SelectValue,
  useForwardPropsEmits,
  usePickForwardProps
} from '@soybean-ui/primitives';
import SSelectContent from './select-content.vue';
import SSelectTrigger from './select-trigger.vue';
import SSelectViewport from './select-viewport.vue';
import SSelectIcon from './select-icon.vue';
import SSelectSeparator from './select-separator.vue';
import SSelectLabel from './select-label.vue';
import SSelectScrollUpButton from './select-scroll-up-button.vue';
import SSelectScrollDownButton from './select-scroll-down-button.vue';
import SSelectItemOption from './select-item-option.vue';
import type { SelectEmits, SelectGroupOption, SelectOption, SelectProps } from './types';

defineOptions({
  name: 'SSelect'
});

const { avoidCollisions = true, prioritizePosition = true, ...delegatedProps } = defineProps<SelectProps>();

const emit = defineEmits<SelectEmits>();

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

const forwarded = useForwardPropsEmits(forwardedRootProps, emit);

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

function isGroup(opt: SelectOption | SelectGroupOption): opt is SelectGroupOption {
  return (opt as SelectGroupOption).items !== undefined;
}
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <SSelectTrigger :class="triggerClass" :size>
      <SelectValue :placeholder />
      <SSelectIcon :class="triggerIconClass" :size>
        <slot name="triggerIcon" />
      </SSelectIcon>
    </SSelectTrigger>
    <SelectPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SSelectContent
        :class="contentClass"
        v-bind="forwardedContentProps"
        :force-mount="forceMountContent"
        :avoid-collisions
        :prioritize-position
        @close-auto-focus="emit('closeAutoFocus', $event)"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
      >
        <SSelectScrollUpButton :size :class="scrollUpButtonClass">
          <slot name="scrollUpIcon" />
        </SSelectScrollUpButton>
        <SSelectViewport :nonce :position>
          <template v-for="(opt, index) in items">
            <template v-if="isGroup(opt)">
              <SSelectLabel :key="`groupLabel_${opt.label}`" :size :class="groupLabelClass">
                {{ opt.label }}
              </SSelectLabel>
              <SSelectSeparator
                v-if="separator || opt.separator"
                :key="`separator_${opt.label}`"
                :class="separatorClass"
              />
              <SelectGroup :key="`group_${opt.label}`" :class="groupClass">
                <template v-for="(item, itemIndex) in opt.items" :key="itemIndex">
                  <SSelectItemOption
                    :option="item"
                    :size
                    :item-class
                    :item-text-class
                    :item-indicator-class
                    :separator="itemIndex !== opt.items.length - 1 && (separator || item.separator)"
                    :separator-class
                  >
                    <slot name="itemIndicatorIcon" />
                  </SSelectItemOption>
                </template>
              </SelectGroup>
            </template>
            <template v-else>
              <SSelectItemOption
                :key="index"
                :option="opt"
                :size
                :item-class
                :item-text-class
                :item-indicator-class
                :separator="index !== items.length - 1 && (separator || opt.separator)"
                :separator-class
              >
                <slot name="itemIndicatorIcon" />
              </SSelectItemOption>
            </template>
          </template>
        </SSelectViewport>
        <SSelectScrollDownButton :size>
          <slot name="scrollDownIcon" />
        </SSelectScrollDownButton>
      </SSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
