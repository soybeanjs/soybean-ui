<script setup lang="ts">
import { reactiveOmit, reactivePick } from '@vueuse/core';
import {
  PopoverClose,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import type { PopoverRootEmits } from 'radix-vue';
import SPopoverContent from './popover-content.vue';
import SPopoverArrow from './popover-arrow.vue';
import type { PopoverProps } from './types';

defineOptions({
  name: 'SPopover'
});

const props = defineProps<PopoverProps>();

const emit = defineEmits<PopoverRootEmits>();

type Slots = {
  default: () => any;
  trigger?: () => any;
  close?: () => any;
};

const slots = defineSlots<Slots>();

const delegatedRootProps = reactivePick(props, ['defaultOpen', 'open', 'modal']);

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const delegatedContentProps = reactiveOmit(props, [
  'defaultOpen',
  'open',
  'modal',
  'to',
  'disabledPortal',
  'forceMountPortal',
  'contentClass',
  'forceMountContent',
  'showArrow',
  'arrowClass',
  'arrowWidth',
  'arrowHeight'
]);

const contentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SPopoverContent v-bind="contentProps">
        <slot />
        <SPopoverArrow v-if="showArrow" :class="arrowClass" :width="arrowWidth" :height="arrowHeight" />
        <PopoverClose v-if="slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
      </SPopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped></style>
