<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert
    color="destructive"
    variant="ghost"
    title="Error"
    description="Your session has expired. Please log in again."
    icon="lucide:triangle-alert"
  />
</template>
