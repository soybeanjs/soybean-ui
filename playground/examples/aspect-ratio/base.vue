<script setup lang="ts">
import { SAspectRatio } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-100 lt-md:w-full">
    <SAspectRatio :ratio="16 / 9" class="bg-muted">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        class="h-full w-full rounded-md object-cover"
      />
    </SAspectRatio>
  </div>
</template>
