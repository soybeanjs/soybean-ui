<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex items-center gap-3">
      <SSpinner />
      <span class="text-sm text-muted-foreground">Loading...</span>
    </div>
  </div>
</template>
