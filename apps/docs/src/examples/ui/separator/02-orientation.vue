<script setup lang="ts">
import { SSeparator } from '@vean/ui';
</script>

<template>
  <SSeparator label="Horizontal" />
  <div class="flex items-center gap-2 h-6 mt-4">
    <div>Vue</div>
    <SSeparator orientation="vertical" />
    <div>Vean Aria</div>
    <SSeparator orientation="vertical" />
    <div>Vean</div>
  </div>
</template>
