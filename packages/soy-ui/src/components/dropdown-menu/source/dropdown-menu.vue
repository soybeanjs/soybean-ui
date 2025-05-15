<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Slot,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ThemeSize } from '../../../types';
import SMenu from '../../menu/source/menu.vue';
import type { MenuOptionData } from '../../menu/types';
import type { DropdownMenuEmits, DropdownMenuProps } from '../types';

defineOptions({
  name: 'SDropdownMenu'
});

const props = defineProps<DropdownMenuProps<T>>();

const emit = defineEmits<DropdownMenuEmits<T>>();

type Slots = {
  trigger?: (props?: { size?: ThemeSize }) => any;
  item?: (props: MenuOptionData<T>) => any;
  itemLeading?: (props: MenuOptionData<T>) => any;
  itemTrailing?: (props: MenuOptionData<T>) => any;
  itemTrigger?: (props: MenuOptionData<T>) => any;
  subTriggerIcon?: (props: MenuOptionData<T>) => any;
  children?: (props: MenuOptionData<T>) => any;
};

const slots = defineSlots<Slots>();

const slotKeys = computed(() => Object.keys(slots) as (keyof Slots)[]);

const propKeys = ['open', 'defaultOpen', 'dir', 'modal'] satisfies (keyof DropdownMenuProps<T>)[];

const forwardedRootProps = usePickForwardProps(props, propKeys);
const forwardedMenuProps = useOmitForwardProps(props, [...propKeys, 'size', 'disabledTrigger']);

const emitKeys = ['update:open'] satisfies (keyof DropdownMenuEmits<T>)[];

const forwardedRootEmits = usePickEmitAsProps(emit, emitKeys);
const forwardedMenuEmits = useOmitEmitAsProps(emit, emitKeys);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);
const forwardedMenu = useCombinedPropsEmits(forwardedMenuProps, forwardedMenuEmits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRoot">
    <DropdownMenuTrigger as-child :disabled="disabledTrigger">
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DropdownMenuTrigger>
    <SMenu v-bind="forwardedMenu" :size="size">
      <template v-for="slotKey in slotKeys" :key="slotKey" #[slotKey]="slotProps">
        <slot :name="slotKey" v-bind="slotProps" />
      </template>
    </SMenu>
  </DropdownMenuRoot>
</template>
