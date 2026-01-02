<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import type { ClassValue } from '../../types';
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from '../dialog';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import { layoutCssVars } from './shared';
import type { LayoutMobileProps, LayoutThemeSlot } from './types';

defineOptions({
  name: 'LayoutMobile',
  inheritAttrs: false
});

defineProps<LayoutMobileProps>();

const attrs = useAttrs();

const { mobileOpen, mobileSidebarWidth, onMobileOpenChange } = useLayoutRootContext('LayoutMobile');

const themeContext = useLayoutThemeContext();

const ui = computed<Partial<Record<LayoutThemeSlot, ClassValue>>>(() => themeContext?.ui?.value ?? {});

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
