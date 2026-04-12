<script setup lang="ts">
import { SButton, toast } from '@soybeanjs/ui';

function openInfoToast() {
  toast.info('New release note', {
    description: 'Minor accessibility improvements are now available.',
    duration: 3200
  });
}

function openWarningToast() {
  toast.warning('Storage almost full', {
    description: 'Only 8% of the available quota remains.',
    duration: 4200,
    richColor: true
  });
}

function openLoadingToast() {
  toast.loading('Running migration', {
    description: 'The database schema is being updated.',
    duration: Infinity,
    dismissible: false
  });
}

function openMessageToast() {
  toast.message('Command copied', {
    description: 'The CLI snippet is now in your clipboard.',
    duration: 2600
  });
}
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Type Variants</h3>

    <div class="flex flex-wrap gap-2">
      <SButton color="info" variant="outline" @click="openInfoToast">Info</SButton>
      <SButton color="warning" variant="outline" @click="openWarningToast">Warning + Rich Colors</SButton>
      <SButton color="primary" variant="outline" @click="openLoadingToast">Loading + Non-dismissible</SButton>
      <SButton variant="pure" @click="openMessageToast">Message Alias</SButton>
    </div>
  </div>
</template>
