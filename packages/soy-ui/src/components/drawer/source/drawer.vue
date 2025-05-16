<script setup lang="ts">
import { useStyleTag } from '@vueuse/core';
import {
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  Slot,
  useForwardPropsEmits,
  useOmitForwardProps
} from '@soybean-ui/primitives';
import { SDialogCloseIcon, SDialogDescription, SDialogFooter, SDialogHeader, SDialogTitle } from '../../dialog';
import type { DrawerEmits, DrawerProps } from '../types';
import SDrawerOverlay from './drawer-overlay.vue';
import SDrawerContent from './drawer-content.vue';
import SDrawerContentBody from './drawer-content-body.vue';
import SDrawerKnob from './drawer-knob.vue';

defineOptions({
  name: 'SDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {
  shouldScaleBackground: true
});

const emit = defineEmits<DrawerEmits>();

const forwardedRootProps = useOmitForwardProps(props, [
  'class',
  'size',
  'ui',
  'to',
  'defer',
  'disabledPortal',
  'forceMountPortal',
  'title',
  'description',
  'showClose'
]);

const forwardedRoot = useForwardPropsEmits(forwardedRootProps, emit);

const css = `
[data-soybean-drawer] {
  touch-action: none;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='bottom'][data-state='open'] {
  animation-name: slideFromBottom;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='bottom'][data-state='closed'] {
  animation-name: slideToBottom;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='top'][data-state='open'] {
  animation-name: slideFromTop;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='top'][data-state='closed'] {
  animation-name: slideToTop;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='left'][data-state='open'] {
  animation-name: slideFromLeft;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='left'][data-state='closed'] {
  animation-name: slideToLeft;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='right'][data-state='open'] {
  animation-name: slideFromRight;
}
[data-soybean-drawer][data-soybean-snap-points='false'][data-soybean-drawer-direction='right'][data-state='closed'] {
  animation-name: slideToRight;
}
[data-soybean-drawer][data-soybean-snap-points='true'][data-soybean-drawer-direction='bottom'] {
  transform: translate3d(0, var(--initial-transform, 100%), 0);
}
[data-soybean-drawer][data-soybean-snap-points='true'][data-soybean-drawer-direction='top'] {
  transform: translate3d(0, calc(var(--initial-transform, 100%) * -1), 0);
}
[data-soybean-drawer][data-soybean-snap-points='true'][data-soybean-drawer-direction='left'] {
  transform: translate3d(calc(var(--initial-transform, 100%) * -1), 0, 0);
}
[data-soybean-drawer][data-soybean-snap-points='true'][data-soybean-drawer-direction='right'] {
  transform: translate3d(var(--initial-transform, 100%), 0, 0);
}
[data-soybean-drawer][data-soybean-delayed-snap-points='true'][data-soybean-drawer-direction='top'] {
  transform: translate3d(0, var(--snap-point-height, 0), 0);
}
[data-soybean-drawer][data-soybean-delayed-snap-points='true'][data-soybean-drawer-direction='bottom'] {
  transform: translate3d(0, var(--snap-point-height, 0), 0);
}
[data-soybean-drawer][data-soybean-delayed-snap-points='true'][data-soybean-drawer-direction='left'] {
  transform: translate3d(var(--snap-point-height, 0), 0, 0);
}
[data-soybean-drawer][data-soybean-delayed-snap-points='true'][data-soybean-drawer-direction='right'] {
  transform: translate3d(var(--snap-point-height, 0), 0, 0);
}
[data-soybean-overlay][data-soybean-snap-points='false'] {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
}
[data-soybean-overlay][data-soybean-snap-points='false'][data-state='open'] {
  animation-name: fadeIn;
}
[data-soybean-overlay][data-state='closed'] {
  animation-name: fadeOut;
}
[data-soybean-animate='false'] {
  animation: none !important;
}
[data-soybean-overlay][data-soybean-snap-points='true'] {
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
[data-soybean-overlay][data-soybean-snap-points='true'] {
  opacity: 1;
}
[data-soybean-drawer]:not([data-soybean-custom-container='true'])::after {
  content: '';
  position: absolute;
  background: inherit;
  background-color: inherit;
}
[data-soybean-drawer][data-soybean-drawer-direction='top']::after {
  top: initial;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 200%;
}
[data-soybean-drawer][data-soybean-drawer-direction='bottom']::after {
  top: 100%;
  bottom: initial;
  left: 0;
  right: 0;
  height: 200%;
}
[data-soybean-drawer][data-soybean-drawer-direction='left']::after {
  left: initial;
  right: 100%;
  top: 0;
  bottom: 0;
  width: 200%;
}
[data-soybean-drawer][data-soybean-drawer-direction='right']::after {
  left: 100%;
  right: initial;
  top: 0;
  bottom: 0;
  width: 200%;
}
[data-soybean-overlay][data-soybean-snap-points='true']:not([data-soybean-snap-points-overlay='true']):not(
    [data-state='closed']
  ) {
  opacity: 0;
}
[data-soybean-overlay][data-soybean-snap-points-overlay='true'] {
  opacity: 1;
}
[data-soybean-handle] {
  display: block;
  position: relative;
  opacity: 0.7;
  background: #e2e2e4;
  margin-left: auto;
  margin-right: auto;
  height: 5px;
  width: 32px;
  border-radius: 1rem;
  touch-action: pan-y;
}
[data-soybean-handle]:hover,
[data-soybean-handle]:active {
  opacity: 1;
}
[data-soybean-handle-hitarea] {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: max(100%, 2.75rem); /* 44px */
  height: max(100%, 2.75rem); /* 44px */
  touch-action: inherit;
}
@media (hover: hover) and (pointer: fine) {
  [data-soybean-drawer] {
    user-select: none;
  }
}
@media (pointer: fine) {
  [data-soybean-handle-hitarea]: {
    width: 100%;
    height: 100%;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
@keyframes slideFromBottom {
  from {
    transform: translate3d(0, var(--initial-transform, 100%), 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideToBottom {
  to {
    transform: translate3d(0, var(--initial-transform, 100%), 0);
  }
}
@keyframes slideFromTop {
  from {
    transform: translate3d(0, calc(var(--initial-transform, 100%) * -1), 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideToTop {
  to {
    transform: translate3d(0, calc(var(--initial-transform, 100%) * -1), 0);
  }
}
@keyframes slideFromLeft {
  from {
    transform: translate3d(calc(var(--initial-transform, 100%) * -1), 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideToLeft {
  to {
    transform: translate3d(calc(var(--initial-transform, 100%) * -1), 0, 0);
  }
}
@keyframes slideFromRight {
  from {
    transform: translate3d(var(--initial-transform, 100%), 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideToRight {
  to {
    transform: translate3d(var(--initial-transform, 100%), 0, 0);
  }
}

`;
useStyleTag(css, { id: 'soybean-drawer-style' });
</script>

<template>
  <DrawerRoot v-bind="forwardedRoot">
    <DrawerTrigger as-child>
      <Slot :size="size">
        <slot name="trigger" />
      </Slot>
    </DrawerTrigger>
    <DrawerPortal :to="to" :defer="defer">
      <SDrawerOverlay :class="ui?.overlay" />
      <SDrawerContent :class="props.class || ui?.content" :size="size">
        <SDrawerKnob :class="ui?.knob" :size="size" />
        <SDrawerContentBody :class="ui?.contentBody" :size="size">
          <SDialogHeader :class="ui?.header" :size="size">
            <SDialogTitle :class="ui?.title" :size="size">
              <slot name="title">{{ title }}</slot>
            </SDialogTitle>
            <SDialogDescription v-if="$slots.description || description" :class="ui?.description" :size="size">
              <slot name="description">{{ description }}</slot>
            </SDialogDescription>
          </SDialogHeader>
          <SDialogCloseIcon :class="ui?.closeIcon" :size="size" />
          <slot />
          <SDialogFooter v-if="$slots.footer" :class="ui?.footer" :size="size">
            <slot name="footer" />
          </SDialogFooter>
        </SDrawerContentBody>
      </SDrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
