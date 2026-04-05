<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex-c gap-3">
      <SSkeleton class="h-4 w-56" />
      <SSkeleton class="h-4 w-40" />
      <SSkeleton class="h-4 w-72" />
    </div>
  </div>
</template>
