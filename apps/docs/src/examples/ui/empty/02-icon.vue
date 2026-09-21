<script setup lang="ts">
import { SButton, SEmpty } from '@vean/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="No inbox messages"
    description="When new messages arrive, they'll appear here."
    icon="lucide:inbox"
  >
    <SButton variant="outline">Refresh</SButton>
  </SEmpty>
</template>
