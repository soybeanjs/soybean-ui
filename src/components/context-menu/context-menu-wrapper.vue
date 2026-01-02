<script setup lang="ts">
import { computed } from 'vue';
import {
  ContextMenuArrow,
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
  Slot,
  provideMenuUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { menuVariants } from '@/variants/menu';
import { provideMenuExtraUi } from '../menu/context';
import type { ContextMenuWrapperEmits, ContextMenuWrapperProps } from './types';

defineOptions({
  name: 'SContextMenuWrapper'
});

const props = withDefaults(defineProps<ContextMenuWrapperProps>(), {
  modal: true
});

const emit = defineEmits<ContextMenuWrapperEmits>();

const forwardedRootProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'disabled',
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
    popupProps: props.popupProps ?? props.contentProps?.popupProps
  };
});

const ui = computed(() => {
  const variants = menuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

provideMenuUi(ui);
provideMenuExtraUi(ui);
</script>

<template>
  <ContextMenuRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <ContextMenuTrigger v-bind="triggerProps" as-child :disabled="disabled">
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </ContextMenuTrigger>
    <ContextMenuPortal v-bind="portalProps">
      <ContextMenuContent v-bind="contentProps" v-on="forwardedListeners">
        <slot />
        <ContextMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
