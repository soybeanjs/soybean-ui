<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
  "
>
import { computed } from 'vue';
import type { AcceptableBooleanValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import SMenuRadioOptions from '../menu/menu-radio-options.vue';
import type { MenuRadioOptionData } from '../menu/types';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
import type { DropdownMenuRadioEmits, DropdownMenuRadioProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadio'
});

const props = withDefaults(defineProps<DropdownMenuRadioProps<T, S>>(), {
  open: undefined,
  modal: true,
  modelValue: undefined
});

const emit = defineEmits<DropdownMenuRadioEmits<T, S>>();

type Slots = {
  trigger: () => any;
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
};

const slots = defineSlots<Slots>();

const propKeys = [
  'defaultOpen',
  'open',
  'dir',
  'modal',
  'trigger',
  'delayDuration',
  'skipDelayDuration',
  'size',
  'ui',
  'disabled',
  'showArrow',
  'triggerProps',
  'portalProps',
  'contentProps',
  'popupProps',
  'arrowProps'
] as const;

const forwardedWrapperProps = usePickProps(props, [...propKeys]);

const forwardedOptionsProps = useOmitProps(props, [...propKeys]);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots).filter(key => key !== 'trigger') as (keyof Slots)[]);
</script>

<template>
  <SDropdownMenuWrapper v-bind="forwardedWrapperProps" v-on="forwardedListeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <!-- @vue-expect-error ignore items type error -->
    <SMenuRadioOptions v-bind="forwardedOptionsProps" :portal-props="portalProps" v-on="forwardedListeners">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuRadioOptions>
  </SDropdownMenuWrapper>
</template>
