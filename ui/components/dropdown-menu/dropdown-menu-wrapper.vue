<script setup lang="ts">
import { computed } from 'vue';
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Slot,
  provideMenuThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { menuVariants } from '@variants/menu';
import { provideMenuExtraThemeContext } from '../menu/context';
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
  <DropdownMenuRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DropdownMenuTrigger v-bind="triggerProps" as-child :disabled="disabled">
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DropdownMenuTrigger>
    <DropdownMenuPortal v-bind="portalProps">
      <DropdownMenuContent v-bind="contentProps" v-on="forwardedListeners">
        <slot />
        <DropdownMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
