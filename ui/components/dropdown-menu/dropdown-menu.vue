<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuOptionData<T> = MenuOptionData<T>"
>
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
import type { DefinedValue } from '@headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { menuVariants } from '@variants/menu';
import SMenuOptions from '../menu/menu-options.vue';
import type { MenuOptionData } from '../menu/types';
import type { DropdownMenuEmits, DropdownMenuProps } from './types';

defineOptions({
  name: 'SDropdownMenu'
});

const props = withDefaults(defineProps<DropdownMenuProps<T, S>>(), {
  open: undefined,
  modal: true
});

const emit = defineEmits<DropdownMenuEmits<S>>();

type Slots = {
  trigger: () => any;
  item: (props: MenuOptionData<T>) => any;
  'item-leading': (props: MenuOptionData<T>) => any;
  'item-trailing': (props: MenuOptionData<T>) => any;
  'item-trigger': (props: MenuOptionData<T>) => any;
  'item-trigger-icon': (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();

const forwardedRootProps = usePickProps(props, [
  'defaultOpen',
  'open',
  'dir',
  'modal',
  'trigger',
  'delayDuration',
  'skipDelayDuration'
]);

const forwardedOptionsProps = useOmitProps(props, [
  'defaultOpen',
  'open',
  'dir',
  'modal',
  'trigger',
  'delayDuration',
  'skipDelayDuration'
]);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots).filter(key => key !== 'trigger') as (keyof Slots)[]);

const ui = computed(() => {
  const variants = menuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideMenuThemeContext({
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
      <DropdownMenuContent v-bind="contentProps" :class="ui?.content" v-on="forwardedListeners">
        <SMenuOptions v-bind="forwardedOptionsProps" :ui="ui" v-on="forwardedListeners">
          <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
            <slot :name="slotKey" v-bind="slotProps" />
          </template>
        </SMenuOptions>
        <DropdownMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
