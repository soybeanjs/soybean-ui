<script setup lang="ts" generic="T extends DropdownMenuItemOption = DropdownMenuItemOption">
import { computed } from 'vue';
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import { createOptionKey } from './shared';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
import SDropdownMenuOption from './dropdown-menu-option.vue';
import type { DropdownMenuEmits, DropdownMenuItemOption, DropdownMenuProps } from './types';

defineOptions({
  name: 'SDropdownMenu'
});

const props = defineProps<DropdownMenuProps<T>>();

type Emits = DropdownMenuEmits<T>;

const emit = defineEmits<Emits>();

const forwardedWrapperProps = useOmitForwardProps(props, [
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

const forwardedWrapperEmits = useOmitEmitAsProps(emit, optionEmitKeys);

const forwardedWrapper = useCombinedPropsEmits(forwardedWrapperProps, forwardedWrapperEmits);

const forwardedSubContentProps = usePickForwardProps(props, [
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
  ...forwardedSubContentProps.value,
  ...props.subContentProps
}));

const forwardedOptionEmits = usePickEmitAsProps(emit, optionEmitKeys);
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
      :sub-content-props="combinedSubContentProps"
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
