<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Orientation</h3>
    <SSeparator label="Horizontal" />
    <div class="flex items-center gap-2 h-6 mt-4">
      <div>Vue</div>
      <SSeparator orientation="vertical" />
      <div>SoybeanHeadless</div>
      <SSeparator orientation="vertical" />
      <div>SoybeanUI</div>
    </div>
  </div>
</template>
