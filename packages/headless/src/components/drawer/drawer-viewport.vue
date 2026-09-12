<script setup lang="ts">
import { useDialogRootContext } from '../dialog/context';
import { useDrawerRootContext } from './context';
import type { DrawerViewportProps } from './types';

defineOptions({
  name: 'DrawerViewport'
});

defineProps<DrawerViewportProps>();

const { dataState } = useDialogRootContext('DrawerViewport');

const { hasSnapPoints, snapPointsOffset } = useDrawerRootContext('DrawerViewport');
</script>

<template>
  <div
    data-soybean-drawer-viewport
    :data-state="dataState"
    :data-soybean-snap-points="hasSnapPoints ? 'true' : 'false'"
    :data-soybean-snap-points-offset="snapPointsOffset.length ? snapPointsOffset.join(',') : undefined"
  >
    <slot />
  </div>
</template>
