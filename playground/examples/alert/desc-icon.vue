<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">With description and icon</h3>
    <SAlert
      color="destructive"
      variant="ghost"
      title="Error"
      description="Your session has expired. Please log in again."
      icon="lucide:triangle-alert"
    />
  </div>
</template>
