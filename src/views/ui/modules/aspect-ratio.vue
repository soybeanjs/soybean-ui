<script setup lang="ts">
import { AspectRatio } from '@soybean-unify/shadcn-ui';

defineOptions({
  name: 'UiAspectRatio'
});
</script>

<template>
  <div class="w-600px">
    <AspectRatio :ratio="16 / 9" class="bg-muted">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        class="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  </div>
</template>
