<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import { toast } from '@soybeanjs/ui';

function openDefaultToast() {
  toast('Release created', {
    icon: 'lucide:rocket',
    description: 'The changelog and version tag are ready.',
    duration: 3200
  });
}

function openSuccessToast() {
  toast.success('Project published', {
    description: 'The package has been pushed to the registry.',
    duration: 3200
  });
}

function openErrorToast() {
  toast.error('Deployment failed', {
    description: 'The edge function returned a 500 response.',
    duration: 4200
  });
}

function openLoadingToast() {
  const id = toast.loading('Syncing workspace', {
    description: 'Fetching the latest remote changes.',
    duration: Infinity
  });

  window.setTimeout(() => {
    toast.success('Sync complete', {
      id,
      description: 'All remote changes are now available locally.',
      duration: 3200
    });
  }, 1600);
}
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Base</h3>

    <div class="flex flex-wrap gap-2">
      <SButton variant="pure" @click="openDefaultToast">Default</SButton>
      <SButton color="success" variant="outline" @click="openSuccessToast">Success</SButton>
      <SButton color="destructive" variant="outline" @click="openErrorToast">Error</SButton>
      <SButton color="warning" variant="outline" @click="openLoadingToast">Loading</SButton>
    </div>
  </div>
</template>
