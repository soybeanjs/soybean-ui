<script setup lang="ts">
import { ref } from 'vue';
import { SRating } from '@soybeanjs/ui';

const value = ref(3);
</script>

<template>
  <div class="flex gap-8">
    <div class="flex-c gap-3">
      <SRating v-model="value" />
      <span class="text-sm text-muted-foreground">horizontal</span>
    </div>
    <div class="flex-c-col gap-3">
      <SRating v-model="value" orientation="vertical" />
      <span class="text-sm text-muted-foreground">vertical</span>
    </div>
  </div>
</template>
