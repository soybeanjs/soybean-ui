<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
import { themeColorOptions, themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <SProgress
        v-for="(size, index) in themeSizeOptions"
        :key="size.value"
        :model-value="(index + 1) * 15"
        :size="size.value"
        :color="themeColorOptions[index].value"
      />
    </div>
  </div>
</template>
