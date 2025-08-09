<script setup lang="ts">
import { computed } from 'vue';
import {
  ContextMenuArrow,
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
  Slot,
  provideMenuThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { menuVariants } from '@variants/menu';
import { provideMenuExtraThemeContext } from '../menu/context';
import type { ContextMenuWrapperEmits, ContextMenuWrapperProps } from './types';

defineOptions({
  name: 'SContextMenuWrapper'
});

const props = withDefaults(defineProps<ContextMenuWrapperProps>(), {
  modal: true
});

const emit = defineEmits<ContextMenuWrapperEmits>();

const forwardedRootProps = useOmitProps(props, [
  'size',
  'ui',
  'disabled',
  'showArrow',
  'triggerProps',
  'portalProps',
  'contentProps',
  'arrowProps'
]);

const forwardedListeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = menuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideMenuThemeContext({
  ui
});
provideMenuExtraThemeContext({
  ui
});
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
