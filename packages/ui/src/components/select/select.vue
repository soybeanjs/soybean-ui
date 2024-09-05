<script setup lang="ts">
import { SelectGroup, SelectPortal, SelectRoot, SelectValue, useForwardPropsEmits } from 'radix-vue';
import type { SelectRootEmits } from 'radix-vue';
import { computedPick } from '../../shared';
import SSelectContent from './select-content.vue';
import SSelectTrigger from './select-trigger.vue';
import SSelectViewport from './select-viewport.vue';
import SSelectIcon from './select-icon.vue';
import SSelectSeparator from './select-separator.vue';
import SSelectLabel from './select-label.vue';
import SSelectScrollUpButton from './select-scroll-up-button.vue';
import SSelectScrollDownButton from './select-scroll-down-button.vue';
import SSelectItemOption from './select-item-option.vue';
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
    <SSelectTrigger :class="triggerClass" :size="size">
      <SelectValue :placeholder="placeholder" />
      <SSelectIcon :class="triggerIconClass" :size="size">
        <slot name="triggerIcon" />
      </SSelectIcon>
    </SSelectTrigger>
    <SelectPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SSelectContent :class="contentClass" v-bind="delegatedContentProps">
        <SSelectScrollUpButton :size="size" :class="scrollUpButtonClass">
          <slot name="scrollUpIcon" />
        </SSelectScrollUpButton>
        <SSelectViewport :nonce="nonce" :position="position">
          <template v-for="(opt, index) in options">
            <template v-if="isGroup(opt)">
              <SSelectLabel :key="`groupLabel_${opt.label}`" :size="size" :class="groupLabelClass">
                {{ opt.label }}
              </SSelectLabel>
              <SSelectSeparator
                v-if="separator || opt.separator"
                :key="`separator_${opt.label}`"
                :class="separatorClass"
              />
              <SelectGroup :key="`group_${opt.label}`" :class="groupClass">
                <template v-for="(item, itemIndex) in opt.options" :key="itemIndex">
                  <SSelectItemOption
                    :option="item"
                    :size="size"
                    :item-class="itemClass"
                    :item-text-class="itemTextClass"
                    :item-indicator-class="itemIndicatorClass"
                    :separator="itemIndex !== opt.options.length - 1 && (separator || item.separator)"
                    :separator-class="separatorClass"
                  >
                    <slot name="itemIndicatorIcon" />
                  </SSelectItemOption>
                </template>
              </SelectGroup>
            </template>
            <template v-else>
              <SSelectItemOption
                :key="opt.value"
                :option="opt"
                :size="size"
                :item-class="itemClass"
                :item-text-class="itemTextClass"
                :item-indicator-class="itemIndicatorClass"
                :separator="index !== options.length - 1 && (separator || opt.separator)"
                :separator-class="separatorClass"
              >
                <slot name="itemIndicatorIcon" />
              </SSelectItemOption>
            </template>
          </template>
        </SSelectViewport>
        <SSelectScrollDownButton :size="size">
          <slot name="scrollDownIcon" />
        </SSelectScrollDownButton>
      </SSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped></style>
