<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <SKbd v-for="size in themeSizeOptions" :key="size.value" :size="size.value" value="command" />
    </div>
  </div>
</template>
