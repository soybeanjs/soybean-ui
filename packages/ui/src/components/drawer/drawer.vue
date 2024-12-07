<script setup lang="ts">
import { useStyleTag } from '@vueuse/core';
import {
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  useForwardPropsEmits,
  useOmitForwardProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
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

const cardPropKeys = [
  'class',
  'size',
  'title',
  'split',
  'headerClass',
  'titleRootClass',
  'titleClass',
  'contentClass',
  'footerClass'
] satisfies (keyof CardProps)[];

const forwardedRootProps = useOmitForwardProps(props, [
  'to',
  'disabledPortal',
  'forceMountPortal',
  'overlayClass',
  'showClose',
  'closeClass',
  'cardClass',
  ...cardPropKeys
]);

const forwardedRoot = useForwardPropsEmits(forwardedRootProps, emit);

const forwardedContentProps = usePickForwardProps(props, [...cardPropKeys, 'showClose', 'closeClass', 'cardClass']);

const cardSlotKeys = Object.keys(slots).filter(slot => slot !== 'trigger') as (keyof Slots)[];

const css = `
[soybean-drawer] {
  touch-action: none;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
[soybean-drawer][soybean-drawer-direction='bottom'] {
  transform: translate3d(0, 100%, 0);
}
[soybean-drawer][soybean-drawer-direction='top'] {
  transform: translate3d(0, -100%, 0);
}
[soybean-drawer][soybean-drawer-direction='left'] {
  transform: translate3d(-100%, 0, 0);
}
[soybean-drawer][soybean-drawer-direction='right'] {
  transform: translate3d(100%, 0, 0);
}
.soybean-drawer-dragging [vault-drawer-direction='top'] {
  overflow-y: hidden !important;
}
.soybean-drawer-dragging [vault-drawer-direction='bottom'] {
  overflow-y: hidden !important;
}
.soybean-drawer-dragging [vault-drawer-direction='left'] {
  overflow-x: hidden !important;
}
.soybean-drawer-dragging [vault-drawer-direction='right'] {
  overflow-x: hidden !important;
}
[soybean-drawer][soybean-drawer-visible='true'][soybean-drawer-direction='top'] {
  transform: translate3d(0, var(--snap-point-height, 0), 0);
}
[soybean-drawer][soybean-drawer-visible='true'][soybean-drawer-direction='bottom'] {
  transform: translate3d(0, var(--snap-point-height, 0), 0);
}
[soybean-drawer][soybean-drawer-visible='true'][soybean-drawer-direction='left'] {
  transform: translate3d(var(--snap-point-height, 0), 0, 0);
}
[soybean-drawer][soybean-drawer-visible='true'][soybean-drawer-direction='right'] {
  transform: translate3d(var(--snap-point-height, 0), 0, 0);
}
[soybean-drawer-overlay] {
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
[soybean-drawer-overlay][soybean-drawer-visible='true'] {
  opacity: 1;
}
[soybean-drawer]::after {
  content: '';
  position: absolute;
  background: inherit;
  background-color: inherit;
}
[soybean-drawer][soybean-drawer-direction='top']::after {
  top: initial;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 200%;
}
[soybean-drawer][soybean-drawer-direction='bottom']::after {
  top: 100%;
  bottom: initial;
  left: 0;
  right: 0;
  height: 200%;
}
[soybean-drawer][soybean-drawer-direction='left']::after {
  left: initial;
  right: 100%;
  top: 0;
  bottom: 0;
  width: 200%;
}
[soybean-drawer][soybean-drawer-direction='right']::after {
  left: 100%;
  right: initial;
  top: 0;
  bottom: 0;
  width: 200%;
}
[soybean-drawer-overlay][soybean-drawer-snap-points='true']:not([soybean-drawer-snap-points-overlay='true']):not(
    [data-state='closed']
  ) {
  opacity: 0;
}
[soybean-drawer-overlay][soybean-drawer-snap-points-overlay='true']:not([soybean-drawer-visible='false']) {
  opacity: 1;
} /* This will allow us to not animate via animation, but still benefit from delaying unmount via
      Radix. */
@keyframes fake-animation {
  from {
  }
  to {
  }
}
@media (hover: hover) and (pointer: fine) {
  [soybean-drawer] {
    user-select: none;
  }
}
`;
useStyleTag(css, { id: 'soybean-drawer-style' });
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
