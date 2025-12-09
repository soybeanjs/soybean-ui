<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <SAvatar
        v-for="size in themeSizeOptions"
        :key="size.value"
        :size="size.value"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        fallback-label="JD"
      />
    </div>
  </div>
</template>
