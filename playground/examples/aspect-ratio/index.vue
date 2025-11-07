<script setup lang="ts">
import { SAspectRatio, SCard } from '@ui';
</script>

<template>
  <SCard title="Aspect Ratio">
    <div class="w-100 lt-sm:w-full">
      <SAspectRatio :ratio="16 / 9" class="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          class="h-full w-full rounded-md object-cover"
        />
      </SAspectRatio>
    </div>
  </SCard>
</template>
