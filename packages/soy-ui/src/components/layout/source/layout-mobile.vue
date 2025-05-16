<script setup lang="ts">
import { computed } from 'vue';
import { DialogPortal, DialogRoot } from '@soybean-ui/primitives';
import { cn, layoutVariants } from '@soybean-ui/variants';
import SDialogOverlay from '../../dialog/source/dialog-overlay.vue';
import SSheetContent from '../../sheet/source/sheet-content.vue';
import { useLayout } from '../context';
import type { LayoutMobileProps } from '../types';

defineOptions({
  name: 'SLayoutMobile',
  inheritAttrs: false
});

const props = defineProps<LayoutMobileProps>();

const { openMobile, onOpenMobileChange } = useLayout();

const { mobileRoot, mobile } = layoutVariants();

const mergedCls = computed(() => {
  return {
    root: cn(mobileRoot(), props.rootClass),
    cls: cn(mobile(), props.class)
  };
});
</script>

<template>
  <DialogRoot :open="openMobile" @update:open="onOpenMobileChange">
    <DialogPortal>
      <SDialogOverlay />
      <SSheetContent
        :class="mergedCls.root"
        :side="side"
        :style="{
          '--sidebar-width': '18rem'
        }"
      >
        <div v-bind="$attrs" :class="mergedCls.cls" data-sidebar="sidebar" data-mobile="true">
          <slot />
        </div>
      </SSheetContent>
    </DialogPortal>
  </DialogRoot>
</template>
