<script setup lang="ts">
import { SAvatar } from '@soybean-unify/ui';
import type { AvatarSize } from '@soybean-unify/ui';

defineOptions({
  name: 'AvatarDemo'
});

const radixVueRsc = 'https://github.com/radix-vue.png';

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <div class="flex gap-12px">
    <SAvatar :src="radixVueRsc" alt="RadixVue" fallback-label="CN" />
    <SAvatar :src="radixVueRsc" alt="RadixVue">
      <template #fallback>Radix</template>
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
