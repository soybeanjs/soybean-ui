<script setup lang="ts">
import { SAlert, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="With description and icon" split>
    <SAlert
      color="destructive"
      variant="ghost"
      title="Error"
      description="Your session has expired. Please log in again."
      icon="lucide:triangle-alert"
    />
  </SCard>
</template>
