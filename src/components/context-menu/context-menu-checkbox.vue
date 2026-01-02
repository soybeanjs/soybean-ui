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
import SContextMenuWrapper from './context-menu-wrapper.vue';
import type { ContextMenuCheckboxEmits, ContextMenuCheckboxProps } from './types';

defineOptions({
  name: 'SContextMenuCheckbox'
});

const props = withDefaults(defineProps<ContextMenuCheckboxProps<T, S>>(), {
  modal: true,
  modelValue: undefined,
  defaultValue: () => []
});

const emit = defineEmits<ContextMenuCheckboxEmits<T, S>>();

type Slots = {
  trigger: () => any;
  item: (props: S) => any;
  'item-leading': (props: S) => any;
  'item-trailing': (props: S) => any;
  'item-indicator-icon': (props: S) => any;
};

const slots = defineSlots<Slots>();

const propKeys = [
  'dir',
  'modal',
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
  <SContextMenuWrapper v-bind="forwardedWrapperProps" v-on="forwardedListeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <SMenuCheckboxOptions v-bind="forwardedOptionsProps" :portal-props="portalProps" v-on="forwardedListeners">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuCheckboxOptions>
  </SContextMenuWrapper>
</template>
