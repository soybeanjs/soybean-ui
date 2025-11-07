<script
  setup
  lang="ts"
  generic="T extends DefinedValue = DefinedValue, S extends MenuOptionData<T> = MenuOptionData<T>"
>
import { computed } from 'vue';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import SMenuOptions from '../menu/menu-options.vue';
import type { MenuOptionData } from '../menu/types';
import SContextMenuWrapper from './context-menu-wrapper.vue';
import type { ContextMenuEmits, ContextMenuProps } from './types';

defineOptions({
  name: 'SContextMenu'
});

const props = withDefaults(defineProps<ContextMenuProps<T, S>>(), {
  modal: true
});

const emit = defineEmits<ContextMenuEmits<S>>();

type Slots = {
  trigger: () => any;
  item: (props: MenuOptionData<T>) => any;
  'item-leading': (props: MenuOptionData<T>) => any;
  'item-trailing': (props: MenuOptionData<T>) => any;
  'item-trigger': (props: MenuOptionData<T>) => any;
  'item-trigger-icon': (props: MenuOptionData<T>) => any;
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
] satisfies (keyof ContextMenuProps<T, S>)[];

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
    <SMenuOptions v-bind="forwardedOptionsProps" :portal-props="portalProps" v-on="forwardedListeners">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenuOptions>
  </SContextMenuWrapper>
</template>
