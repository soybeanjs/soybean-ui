<script setup lang="ts">
import { SImage } from '@soybeanjs/ui';

const src =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20minimalist%20mountain%20landscape%20at%20sunset%2C%20clean%20design%2C%20high%20quality&image_size=landscape_16_9';
</script>

<template>
  <div class="w-80">
    <SImage :src="src" alt="Mountain landscape at sunset" />
  </div>
</template>
