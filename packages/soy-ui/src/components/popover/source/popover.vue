<script setup lang="ts">
import {
  PopoverClose,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  useCombinedPropsEmits,
  useForwardProps,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { PopoverEmits, PopoverProps } from '../types';
import SPopoverContent from './popover-content.vue';
import SPopoverArrow from './popover-arrow.vue';

defineOptions({
  name: 'SPopover'
});

const props = defineProps<PopoverProps>();

const emit = defineEmits<PopoverEmits>();

const delegatedRootProps = usePickForwardProps(props, ['defaultOpen', 'open', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = usePickForwardProps(props, [
  'trapFocus',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy',
  'disableOutsidePointerEvents'
]);

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);
</script>

<template>
  <PopoverRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SPopoverContent
        v-bind="forwardedContent"
        :class="props.class || ui?.content"
        :size="size"
        :force-mount="forceMountContent"
      >
        <slot />
        <PopoverClose v-if="$slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
        <SPopoverArrow
          v-if="showArrow"
          :class="ui?.arrow"
          :size="size"
          :width="arrowWidth"
          :height="arrowHeight"
          :rounded="arrowRounded"
        />
      </SPopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
