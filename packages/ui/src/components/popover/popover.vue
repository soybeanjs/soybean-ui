<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { PopoverClose, PopoverPortal, PopoverRoot, PopoverTrigger, useForwardPropsEmits } from 'radix-vue';
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

const delegatedProps = reactiveOmit(props, [
  'portalProps',
  'triggerProps',
  'contentProps',
  'showArrow',
  'arrowProps',
  'closeProps'
]);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <PopoverTrigger as-child v-bind="triggerProps">
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <SPopoverContent v-bind="contentProps">
        <slot />
        <SPopoverArrow v-if="showArrow" v-bind="arrowProps" />
        <PopoverClose v-if="slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
      </SPopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped></style>
