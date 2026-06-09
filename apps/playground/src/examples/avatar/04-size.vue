<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SAvatar
      v-for="size in themeSizeOptions"
      :key="size.value"
      :size="size.value"
      src="https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png?v=202605281124"
      fallback-label="S"
    />
  </div>
</template>
