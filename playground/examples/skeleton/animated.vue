<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Animated</h3>
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="flex-c gap-2">
        <span class="text-sm text-muted-foreground">Animated</span>
        <SSkeleton class="w-full max-w-64" />
      </div>
      <div class="flex-c gap-2">
        <span class="text-sm text-muted-foreground">Static</span>
        <SSkeleton class="w-full max-w-64" :animated="false" />
      </div>
    </div>
  </div>
</template>
