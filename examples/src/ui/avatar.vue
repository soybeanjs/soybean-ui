<script setup lang="ts">
import { SAvatar, SCard } from 'soy-ui';

defineOptions({
  name: 'DemoAvatar'
});

const soybeanUiRsc = 'https://soybean-ui.com/logo.svg';

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <div class="flex gap-12px">
        <SAvatar :src="soybeanUiRsc" alt="SoybeanUI" fallback-label="CN" />
        <SAvatar :src="soybeanSrc" alt="SoybeanUI">
          <template #fallback>SoybeanUI</template>
        </SAvatar>
      </div>
    </SCard>
  </div>
</template>
