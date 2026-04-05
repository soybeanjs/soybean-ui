<script setup lang="ts">
import { SToggle } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap items-center gap-3">
      <SToggle v-for="item in themeSizeOptions" :key="item.value" :size="item.value">{{ item.label }}</SToggle>
    </div>
  </div>
</template>
