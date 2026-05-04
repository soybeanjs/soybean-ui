<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72 border-primary/30 bg-primary/3"
    title="No activity"
    description="Custom styles can adapt the empty state to different scenes."
    icon="lucide:activity"
    :ui="{
      media: 'bg-primary/10 text-primary',
      title: 'text-primary'
    }"
  >
    <SButton>Start activity</SButton>
  </SEmpty>
</template>
