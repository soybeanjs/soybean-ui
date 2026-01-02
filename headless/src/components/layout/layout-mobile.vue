<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from '../dialog';
import { useLayoutRootContext, useLayoutUi } from './context';
import { layoutCssVars } from './shared';
import type { LayoutMobileProps } from './types';

defineOptions({
  name: 'LayoutMobile',
  inheritAttrs: false
});

defineProps<LayoutMobileProps>();

const attrs = useAttrs();

const { mobileOpen, mobileSidebarWidth, onMobileOpenChange } = useLayoutRootContext('LayoutMobile');

const ui = useLayoutUi();

const style = computed<CSSProperties>(() => {
  return {
    [layoutCssVars.sidebarWidth]: `${mobileSidebarWidth.value}rem`
  };
});
</script>

<template>
  <DialogRoot :open="mobileOpen" @update:open="onMobileOpenChange">
    <DialogPortal>
      <DialogOverlay :class="ui.mobileOverlay" />
      <DialogContent :class="ui.mobileDrawer" :style="style">
        <div v-bind="attrs" :class="ui.mobile" data-sidebar="sidebar" data-mobile>
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
