<script setup lang="ts">
import { SImage } from '@soybeanjs/ui';

const src =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20serene%20lake%20reflecting%20snowy%20peaks%2C%20photorealistic%2C%20high%20quality&image_size=landscape_16_9';
</script>

<template>
  <div class="w-80">
    <SImage :src="src" alt="Serene lake with snowy peaks" preview />
  </div>
</template>
