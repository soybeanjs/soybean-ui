<script setup lang="ts">
import { SAvatar } from '@vean/ui';
import { themeSizeOptions } from '~/constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SAvatar
      v-for="size in themeSizeOptions"
      :key="size.value"
      :size="size.value"
      src="https://r2.veanui.com/imgs/logo-vean-ui.svg?v=202609141212"
      fallback-label="S"
    />
  </div>
</template>
