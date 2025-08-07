<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>"
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
import SMenuCheckboxOptions from '../menu/menu-checkbox-options.vue';
import type { MenuCheckboxOptionData } from '../menu/types';
import type { DropdownMenuCheckboxEmits, DropdownMenuCheckboxProps } from './types';

defineOptions({
  name: 'SDropdownMenuCheckbox'
});

const props = withDefaults(defineProps<DropdownMenuCheckboxProps<T, S>>(), {
  open: undefined,
  modal: true,
  modelValue: undefined,
  defaultValue: () => []
});

const emit = defineEmits<DropdownMenuCheckboxEmits<T, S>>();

type Slots = {
  trigger: () => any;
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
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
        <SMenuCheckboxOptions v-bind="forwardedOptionsProps" :ui="ui" v-on="forwardedListeners">
          <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
            <slot :name="slotKey" v-bind="slotProps" />
          </template>
        </SMenuCheckboxOptions>
        <DropdownMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
