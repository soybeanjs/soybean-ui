<script setup lang="ts">
import { SImage } from '@soybeanjs/ui';

const src =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=close%20up%20of%20colorful%20flowers%20in%20a%20garden%2C%20soft%20light%2C%20high%20quality&image_size=square';
</script>

<template>
  <div class="w-40">
    <SImage :src="src" alt="Colorful flowers" rounded preview />
  </div>
</template>
