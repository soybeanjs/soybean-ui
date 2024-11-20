<script setup lang="ts" generic="T extends DropdownMenuItemOption = DropdownMenuItemOption">
import { computed } from 'vue';
import { useEmitAsProps, useForwardProps } from '@soybean-ui/primitive';
import { computedOmit, computedOmitEmits, computedPick, computedPickEmits } from '../../shared';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
import SDropdownMenuOption from './dropdown-menu-option.vue';
import { createOptionKey } from './shared';
import type { DropdownMenuEmits, DropdownMenuItemOption, DropdownMenuProps } from './types';

defineOptions({
  name: 'SDropdownMenu'
});

const props = defineProps<DropdownMenuProps<T>>();

type Emits = DropdownMenuEmits<T>;

const emit = defineEmits<Emits>();

const forwardedEmits = useEmitAsProps(emit) as Record<keyof Emits, any>;

const delegatedWrapperProps = computedOmit(props, [
  'separator',
  'groupLabelClass',
  'itemClass',
  'itemIconClass',
  'separatorClass',
  'shortcutClass',
  'items',
  'groupClass',
  'subTriggerClass',
  'subTriggerIconClass',
  'subContentClass',
  'subContentProps'
]);

const forwardedWrapperProps = useForwardProps(delegatedWrapperProps);

const optionEmitKeys: (keyof Emits)[] = [
  'select',
  'update:subOpen',
  'closeAutoFocusSub',
  'entryFocusSub',
  'escapeKeyDownSub',
  'focusOutsideSub',
  'interactOutsideSub',
  'openAutoFocusSub',
  'pointerDownOutsideSub'
];

const forwardedWrapperEmits = computedOmitEmits(forwardedEmits, optionEmitKeys);

const forwardedWrapper = computed(() => ({
  ...forwardedWrapperProps.value,
  ...forwardedWrapperEmits.value
}));

const delegatedSubContentProps = computedPick(props, [
  'loop',
  'sideOffset',
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

const combinedSubContentProps = computed(() => ({
  ...delegatedSubContentProps.value,
  ...props.subContentProps
}));

const forwardedSubContentProps = useForwardProps(combinedSubContentProps);

const forwardedOptionEmits = computedPickEmits(forwardedEmits, optionEmitKeys);
</script>

<template>
  <SDropdownMenuWrapper v-bind="forwardedWrapper">
    <template #trigger>
      <slot name="trigger" :size="size" />
    </template>
    <SDropdownMenuOption
      v-for="item in items"
      :key="createOptionKey(item)"
      :option="item"
      :to="to"
      :size="size"
      :separator="separator"
      :disabled-portal="disabledPortal"
      :force-mount-portal="forceMountPortal"
      :group-class="groupClass"
      :group-label-class="groupLabelClass"
      :sub-trigger-class="subTriggerClass"
      :sub-content-class="subContentClass"
      :sub-content-props="forwardedSubContentProps"
      :item-class="itemClass"
      :separator-class="separatorClass"
      :shortcut-class="shortcutClass"
      v-bind="forwardedOptionEmits"
    >
      <template #item>
        <slot name="item" v-bind="item" />
      </template>
      <template #subTrigger>
        <slot name="subTrigger" v-bind="item" />
      </template>
      <template #subTriggerIcon>
        <slot name="subTriggerIcon" v-bind="item" />
      </template>
    </SDropdownMenuOption>
  </SDropdownMenuWrapper>
</template>

<style scoped></style>
