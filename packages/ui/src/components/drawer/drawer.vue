<script setup lang="ts">
import { useForwardProps, useForwardPropsEmits } from '@soybean-ui/primitive';
import { DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue';
import { computedOmit, computedPick } from '../../shared';
import type { CardProps } from '../card/types';
import SDrawerOverlay from './drawer-overlay.vue';
import SDrawerContent from './drawer-content.vue';
import type { DrawerEmits, DrawerProps } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = defineProps<DrawerProps>();

const emit = defineEmits<DrawerEmits>();

type Slots = {
  trigger: () => any;
  default: () => any;
  header: () => any;
  'title-root': () => any;
  title: () => any;
  'title-leading': () => any;
  'title-trailing': () => any;
  extra: () => any;
  close: () => any;
  footer: () => any;
};

const slots = defineSlots<Slots>();

const cardPropKeys: (keyof CardProps)[] = [
  'class',
  'size',
  'title',
  'split',
  'headerClass',
  'titleRootClass',
  'titleClass',
  'contentClass',
  'footerClass'
];

const delegatedRootProps = computedOmit(props, [
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'showClose',
  'closeClass',
  'cardClass',
  ...cardPropKeys
]);

const forwardedRoot = useForwardPropsEmits(delegatedRootProps, emit);

const delegatedContentProps = computedPick(props, [...cardPropKeys, 'showClose', 'closeClass', 'cardClass']);

const forwardedContentProps = useForwardProps(delegatedContentProps);

const cardSlotKeys = Object.keys(slots).filter(slot => slot !== 'trigger') as (keyof Slots)[];
</script>

<template>
  <DrawerRoot v-bind="forwardedRoot">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerPortal>
      <SDrawerOverlay :class="overlayClass" />
      <SDrawerContent v-bind="forwardedContentProps">
        <template v-for="slotKey in cardSlotKeys" :key="slotKey" #[slotKey]>
          <slot :name="slotKey" />
        </template>
      </SDrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style scoped></style>
