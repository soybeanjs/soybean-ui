<script setup lang="ts">
import { computed } from 'vue';
import { DialogOverlay } from '../dialog';
import { injectDrawerRootContext } from './context';

defineOptions({
  name: 'DrawerOverlay'
});

const { overlayRef, snapPoints, isVisible, isOpen, shouldFade } = injectDrawerRootContext();

const hasSnapPoints = computed(() => snapPoints && (snapPoints.value?.length ?? 0) > 0);
</script>

<template>
  <DialogOverlay
    ref="overlayRef"
    :soybean-drawer-visible="isVisible ? 'true' : 'false'"
    soybean-drawer-overlay=""
    :soybean-drawer-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :soybean-drawer-snap-points-overlay="isOpen && shouldFade ? 'true' : 'false'"
  />
</template>
