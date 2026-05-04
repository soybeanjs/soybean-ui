<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="No inbox messages"
    description="When new messages arrive, they'll appear here."
    icon="lucide:inbox"
    media-variant="icon"
  >
    <SButton variant="outline">Refresh</SButton>
  </SEmpty>
</template>
