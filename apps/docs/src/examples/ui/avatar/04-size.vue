<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SAvatar
      v-for="size in themeSizeOptions"
      :key="size.value"
      :size="size.value"
      src="https://r2.soybeanjs.tech/soybeanjs/logo-soybean-ui.svg?v=202608192144"
      fallback-label="S"
    />
  </div>
</template>
