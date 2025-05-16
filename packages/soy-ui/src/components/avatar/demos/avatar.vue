<script setup lang="ts">
import { SAvatar, SCard } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoAvatar'
});

const soybeanUiRsc = 'https://soybean-ui.com/logo.svg';

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <div class="flex gap-12px">
        <SAvatar :src="soybeanUiRsc" alt="SoybeanUI" fallback-label="CN" />
        <SAvatar :src="soybeanUiRsc" alt="SoybeanUI">
          <template #fallback>SoybeanUI</template>
        </SAvatar>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-12px">
        <div v-for="size in sizes" :key="size" class="flex-c-center">
          <SAvatar :size="size" :src="soybeanSrc" alt="SoybeanAdmin" fallback-label="SOY" />
          <p>{{ size }}</p>
        </div>
      </div>
    </SCard>
  </div>
</template>
