<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
  "
>
import { computed } from 'vue';
import type { AcceptableBooleanValue } from '@headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@headless/composables';
import SMenuRadioOptions from '../menu/menu-radio-options.vue';
import type { MenuRadioOptionData } from '../menu/types';
import SContextMenuWrapper from './context-menu-wrapper.vue';
import type { ContextMenuRadioEmits, ContextMenuRadioProps } from './types';

defineOptions({
  name: 'SContextMenuRadio'
});

const props = withDefaults(defineProps<ContextMenuRadioProps<T, S>>(), {
  modal: true,
  modelValue: undefined
});

const emit = defineEmits<ContextMenuRadioEmits<T, S>>();

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
  'arrowProps'
] satisfies (keyof ContextMenuRadioProps<T, S>)[];

const forwardedWrapperProps = usePickProps(props, propKeys);

const forwardedOptionsProps = useOmitProps(props, propKeys);

const forwardedListeners = useForwardListeners(emit);

const slotKeys = computed(() => Object.keys(slots).filter(key => key !== 'trigger') as (keyof Slots)[]);
</script>

<template>
  <SContextMenuWrapper v-bind="forwardedWrapperProps" v-on="forwardedListeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <!-- @vue-expect-error ignore items type error -->
    <SMenuRadioOptions v-bind="forwardedOptionsProps" :portal-props="portalProps" v-on="forwardedListeners">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuRadioOptions>
  </SContextMenuWrapper>
</template>
