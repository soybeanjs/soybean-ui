<script setup lang="ts">
import { SxFolder } from '@soybeanjs/ui-x';
</script>

<template>
  <SxFolder name="Projects" :count="3">
    <template #icon="{ open }">{{ open ? '📂' : '📁' }}</template>
    <div class="space-y-1">
      <div class="text-sm">soybean-ui</div>
      <div class="text-sm">soybean-admin</div>
      <div class="text-sm">soybean-chat</div>
    </div>
  </SxFolder>
</template>
