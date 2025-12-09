<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Delay</h3>
    <SAvatar
      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      fallback-label="DL"
      :delay-ms="1000"
    />
  </div>
</template>
