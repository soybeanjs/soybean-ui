<script
  setup
  lang="ts"
  generic="
    T extends AcceptableValue = AcceptableValue,
    S extends MenuRadioOptionData<NonNullable<T>> = MenuRadioOptionData<NonNullable<T>>
  "
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
import type { AcceptableValue } from '@headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { menuVariants } from '@variants/menu';
import SMenuRadioOptions from '../menu/menu-radio-options.vue';
import type { MenuRadioOptionData } from '../menu/types';
import type { DropdownMenuRadioEmits, DropdownMenuRadioProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadio'
});

const props = withDefaults(defineProps<DropdownMenuRadioProps<T, S>>(), {
  open: undefined,
  modal: true,
  modelValue: undefined
});

const emit = defineEmits<DropdownMenuRadioEmits<NonNullable<T>, S>>();

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
        <!-- @vue-expect-error ignore items type error -->
        <SMenuRadioOptions v-bind="forwardedOptionsProps" :ui="ui" v-on="forwardedListeners">
          <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
            <slot :name="slotKey" v-bind="slotProps" />
          </template>
        </SMenuRadioOptions>
        <DropdownMenuArrow v-if="showArrow" v-bind="arrowProps" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
