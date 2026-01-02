<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>"
>
import { computed } from 'vue';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import SMenuCheckboxOptions from '../menu/menu-checkbox-options.vue';
import type { MenuCheckboxOptionData } from '../menu/types';
import SDropdownMenuWrapper from './dropdown-menu-wrapper.vue';
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
    <SMenuCheckboxOptions v-bind="forwardedOptionsProps" :portal-props="portalProps" v-on="forwardedListeners">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuCheckboxOptions>
  </SDropdownMenuWrapper>
</template>
