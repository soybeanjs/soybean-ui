<script setup lang="ts">
import { SxNotification } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="w-80 space-y-2">
    <SxNotification title="Deployment finished" description="v1.2.0 is now live." type="success">
      <template #icon>🚀</template>
    </SxNotification>
    <SxNotification title="Custom content" type="info">
      <template #title>
        <span class="font-bold text-primary">Custom title slot</span>
      </template>
      <template #description>
        Fully custom <code>description</code> slot content.
      </template>
      <template #close-icon>✕</template>
    </SxNotification>
  </div>
</template>
