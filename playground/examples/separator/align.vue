<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Align</h3>
    <div class="flex-c gap-4">
      <SSeparator align="start" label="Start" />
      <SSeparator align="center" label="Center" />
      <SSeparator align="end" label="End" />
    </div>
  </div>
</template>
