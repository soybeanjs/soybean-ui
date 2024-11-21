<script setup lang="ts">
import { SAvatar } from 'soybean-ui';
import type { ThemeSize } from 'soybean-ui';

defineOptions({
  name: 'AvatarDemo'
});

const soybeanUiRsc = 'https://soybean-ui.com/logo.svg';

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <div class="flex gap-12px">
    <SAvatar :src="soybeanUiRsc" alt="RekaUI" fallback-label="CN" />
    <SAvatar :src="soybeanUiRsc" alt="RekaUI">
      <template #fallback>RekaUI</template>
    </SAvatar>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex gap-12px">
    <div v-for="size in sizes" :key="size" class="flex-col-center">
      <SAvatar :size="size" :src="soybeanSrc" alt="SoybeanAdmin" fallback-label="SOY" />
      <p>{{ size }}</p>
    </div>
  </div>
</template>
