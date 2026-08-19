<script setup lang="ts">
import { SImage } from '@soybeanjs/ui';

const src =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20abstract%20geometric%20shapes%20on%20dark%20background%2C%20high%20quality&image_size=landscape_4_3';
</script>

<template>
  <div class="flex gap-4">
    <div class="w-40">
      <p class="mb-1 text-xs text-muted-foreground">cover</p>
      <SImage class="h-32" :src="src" alt="Abstract shapes" fit="cover" />
    </div>
    <div class="w-40">
      <p class="mb-1 text-xs text-muted-foreground">contain</p>
      <SImage class="h-32 bg-secondary" :src="src" alt="Abstract shapes" fit="contain" />
    </div>
    <div class="w-40">
      <p class="mb-1 text-xs text-muted-foreground">fill</p>
      <SImage class="h-32" :src="src" alt="Abstract shapes" fit="fill" />
    </div>
  </div>
</template>
