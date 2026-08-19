<script setup lang="ts">
import { SImage } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex gap-4">
    <div class="w-40">
      <p class="mb-1 text-xs text-muted-foreground">fallback src</p>
      <SImage
        class="h-32"
        src="https://invalid.example.com/broken.png"
        fallback="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20placeholder%20image%20with%20soft%20gradient&image_size=square"
        alt="Broken image with fallback"
      />
    </div>
    <div class="w-40">
      <p class="mb-1 text-xs text-muted-foreground">error slot</p>
      <SImage class="h-32" src="https://invalid.example.com/broken.png" alt="Broken image">
        <template #error>
          <div class="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground">
            <span>Failed to load</span>
          </div>
        </template>
      </SImage>
    </div>
  </div>
</template>
