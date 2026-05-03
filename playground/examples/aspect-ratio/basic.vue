<script setup lang="ts">
import { SAspectRatio } from '@soybeanjs/ui';
</script>

<template>
  <SAspectRatio :ratio="16 / 9" class="w-100 bg-muted lt-md:w-full">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      class="h-full w-full rounded-md object-cover m-0"
    />
  </SAspectRatio>
</template>
