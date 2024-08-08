<script setup lang="ts">
import { SAvatar, SAvatarFallback, SAvatarImage, SAvatarRoot } from '@soybean-unify/ui';
import type { AvatarSize } from '@soybean-unify/ui';

defineOptions({
  name: 'AvatarDemo'
});

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <div class="flex gap-12px">
    <SAvatar
      :image-props="{ src: 'https://github.com/radix-vue.png', alt: '@radix-vue' }"
      :fallback-props="{ label: 'CN' }"
    />
    <SAvatarRoot>
      <SAvatarImage :src="soybeanSrc" alt="SoybeanAdmin" />
      <SAvatarFallback>Soy</SAvatarFallback>
    </SAvatarRoot>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex gap-12px">
    <div v-for="size in sizes" :key="size" class="flex-col-center">
      <SAvatar
        :size="size"
        :image-props="{ src: soybeanSrc, alt: 'SoybeanAdmin' }"
        :fallback-props="{ label: 'SOY' }"
      />
      <p>{{ size }}</p>
    </div>
  </div>
</template>
