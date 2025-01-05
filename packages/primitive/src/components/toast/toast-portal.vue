<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { ToastPortalProps } from './types';

defineOptions({
  name: 'ToastPortal'
});

const props = defineProps<ToastPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props" />
</template>
