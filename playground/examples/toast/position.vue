<script setup lang="ts">
import { SButton, toast } from '@soybeanjs/ui';
import type { ToastPosition } from '@soybeanjs/ui';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];

function openToastAt(position: ToastPosition) {
  toast(`Toast at ${position}`, {
    description: 'Position-specific rendering is active for this notification.',
    position,
    duration: 3000
  });
}
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Position</h3>

    <div class="flex flex-wrap gap-2">
      <SButton v-for="position in positions" :key="position" variant="outline" @click="openToastAt(position)">
        {{ position }}
      </SButton>
    </div>
  </div>
</template>
