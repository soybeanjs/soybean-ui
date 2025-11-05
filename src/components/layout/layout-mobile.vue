<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from '../../types';
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from '../dialog';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import type { LayoutMobileProps, LayoutThemeSlot } from './types';

defineOptions({
  name: 'LayoutMobile',
  inheritAttrs: false
});

defineProps<LayoutMobileProps>();

const attrs = useAttrs();

const { mobileOpen, mobileStyle, onMobileOpenChange } = useLayoutRootContext('LayoutMobile');

const themeContext = useLayoutThemeContext();

const ui = computed<Partial<Record<LayoutThemeSlot, ClassValue>>>(() => themeContext?.ui?.value ?? {});
</script>

<template>
  <DialogRoot :open="mobileOpen" @update:open="onMobileOpenChange">
    <DialogPortal>
      <DialogOverlay :class="ui.mobileOverlay" />
      <DialogContent :class="ui.mobileDrawer" :style="mobileStyle">
        <div v-bind="attrs" :class="ui.mobile" data-sidebar="sidebar" data-mobile>
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
