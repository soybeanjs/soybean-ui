<script setup lang="ts">
import { SxNotification } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="space-y-2 w-80">
    <SxNotification title="Information" description="A new update is available." type="info" />
    <SxNotification title="Success" description="Your changes have been saved." type="success" />
    <SxNotification title="Warning" description="Your subscription expires soon." type="warning" />
    <SxNotification title="Error" description="Failed to upload the file." type="error" />
  </div>
</template>
