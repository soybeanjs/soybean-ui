<script setup lang="ts">
import { computed } from 'vue';
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  provideMenuUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { provideMenuExtraUi } from '../menu/context';
import { menuVariants } from '../menu/variants';
import type { DropdownMenuWrapperEmits, DropdownMenuWrapperProps } from './types';

defineOptions({
  name: 'SDropdownMenuWrapper'
});

const props = withDefaults(defineProps<DropdownMenuWrapperProps>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<DropdownMenuWrapperEmits>();

const forwardedRootProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'disabled',
  'placement',
  'indicatorPosition',
  'showArrow',
  'triggerProps',
  'portalProps',
  'contentProps',
  'popupProps',
  'arrowProps'
]);

const forwardedListeners = useForwardListeners(emit);

const contentProps = computed(() => {
  return {
    ...props.contentProps,
    popupProps: props.popupProps ?? props.contentProps?.popupProps,
    placement: props.placement ?? props.contentProps?.placement,
    sideOffset: props.contentProps?.sideOffset ?? (props.showArrow ? 0 : 8)
  };
});

const ui = computed(() => {
  const variants = menuVariants({
    size: props.size,
    indicatorPosition: props.indicatorPosition
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

provideMenuUi(ui);
provideMenuExtraUi(ui);
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DropdownMenuTrigger v-bind="triggerProps" as-child :disabled="disabled">
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal v-bind="portalProps">
      <DropdownMenuContent v-bind="contentProps" :popup-props="popupProps" v-on="forwardedListeners">
        <slot />
        <DropdownMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
