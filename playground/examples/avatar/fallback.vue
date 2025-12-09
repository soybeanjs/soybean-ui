<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Fallback</h3>
    <SAvatar src="https://broken-image-url.jpg" fallback-label="BR" />
  </div>
</template>
