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
import { SDialogCloseIcon, SDialogDescription, SDialogFooter, SDialogHeader, SDialogTitle } from '../dialog';
import SDrawerOverlay from './drawer-overlay.vue';
import SDrawerContent from './drawer-content.vue';
import SDrawerContentBody from './drawer-content-body.vue';
import SDrawerKnob from './drawer-knob.vue';
import type { DrawerEmits, DrawerProps } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = defineProps<DrawerProps>();

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
      SoybeanUI. */
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
